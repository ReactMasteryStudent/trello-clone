import useCallApi from "./useCallApi";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act, waitFor } from "@testing-library/react";
import {
  SERVER_DELAY,
  DUMMY_WORKSPACE,
  BASE_URL,
} from "../../utils/test-utils/constants";

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
const delay = SERVER_DELAY;

const GET_WORKSPACE_URL = BASE_URL + "/workspace";
const DUMMY_RESPONSE = DUMMY_WORKSPACE;

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
beforeEach(() => {
  server.resetHandlers();
});

test("fonctionnal request", async () => {
  const response = renderHook(() => useCallApi());
  expect(response.result.current.data).toEqual({});
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

test.todo("error request");
