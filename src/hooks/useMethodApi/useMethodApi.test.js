import Requests from "./useMethodApi";
import { setupServer } from "msw/node";
import { renderHook, waitFor } from "@testing-library/react";
import handlers from "../../handlers/handlers";

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
const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
const delay = 100;

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test("get workspace", async () => {
  const response = renderHook(() => Requests.useGetWorkspace());
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  expect(response.result.current.data).toEqual(DUMMY_RESPONSE);
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
});
test("patch workspace", async () => {
  const idWorkspaceToChange = 1;
  const newWorkspaceName = "new Workspace Name";
  const response = renderHook(() =>
    Requests.usePatchWorkspace(idWorkspaceToChange, newWorkspaceName)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  const PATCHED_DUMMY_RESPONSE = { ...DUMMY_RESPONSE, name: newWorkspaceName };
  expect(response.result.current.data).toEqual(PATCHED_DUMMY_RESPONSE);
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
});
test("post board", async () => {
  const nameNewBoard = "new board =)";
  const imageNewBoard =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHRMgFFFer5qdS8fDQ72NzTiC4qt4yKAR3kg&usqp=CAU";
  const response = renderHook(() =>
    Requests.usePostBoard(nameNewBoard, imageNewBoard)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  const newBoard = {
    name: nameNewBoard,
    image: imageNewBoard,
  };

  const receivedNewBoard = response.result.current.data;
  expect(receivedNewBoard).toMatchSnapshot(newBoard);
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
});
test.todo("patch board");
test.todo("delete board");
test.todo("post section");
test.todo("patch section");
test.todo("delete section");
test.todo("post card");
test.todo("patch card");
test.todo("delete card");
