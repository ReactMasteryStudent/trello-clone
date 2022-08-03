import useCallApi from "./useCallApi";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act, waitFor } from "@testing-library/react";

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
const delay = 100;

const GET_WORKSPACE_URL = "http://localhost:5001/api/workspace";
const DUMMY_RESPONSE = {
  id: 1,
  name: "Default workspace",
  boards: [
    {
      id: 1,
      name: "Trello clone",
      image: "",
      sections: [
        {
          id: 1,
          name: "Backlog",
          position: 1,
          cards: [
            {
              id: 1,
              title: "API Call",
              position: 1,
              description: "",
            },
            {
              id: 2,
              title: "Header",
              position: 2,
              description: "",
            },
          ],
        },
      ],
    },
  ],
};

const server = setupServer(
  rest.get(GET_WORKSPACE_URL, (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200), ctx.json(DUMMY_RESPONSE));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test("get workspaces", async () => {
  const response = renderHook(() => useCallApi());
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  act(() => {
    response.result.current.sendRequest(GET_WORKSPACE_URL, {
      methode: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
      },
    });
  });
  expect(response.result.current.isLoading).toBe(true);
  await waitFor(() => sleep(delay * 2));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  expect(response.result.current.data).toEqual(DUMMY_RESPONSE);
});
