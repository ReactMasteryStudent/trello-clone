import Requests from "./useMethodApi";
import { setupServer } from "msw/node";
import { renderHook, waitFor } from "@testing-library/react";
import handlers from "../../handlers/handlers";
import {
  SERVER_DELAY,
  DUMMY_WORKSPACE,
  DUMMY_SECTION_ID,
  DUMMY_CARD_ID,
} from "../../utils/test-utils/constants";

let DUMMY_RESPONSE = DUMMY_WORKSPACE;
const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
const delay = SERVER_DELAY;

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  //Avoir les mêmes données pour chaque test
  DUMMY_RESPONSE = DUMMY_WORKSPACE;
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
test("patch board", async () => {
  const idBoardToPatch = 1;
  const newNameBoardPatch = "patched Board Name ^.^";
  const imageBoardPatch = "https://image-patched.com";
  const response = renderHook(() =>
    Requests.usePatchBoard(idBoardToPatch, newNameBoardPatch, imageBoardPatch)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  const patchedBoardExpected = {
    name: newNameBoardPatch,
    image: imageBoardPatch,
  };

  const receivedBoard = response.result.current.data;
  expect(receivedBoard).toMatchSnapshot(patchedBoardExpected);
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
});
test("delete board", async () => {
  const idBoardToDelete = 1;
  const response = renderHook(() => Requests.useDeleteBoard(idBoardToDelete));
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
});
test("post section", async () => {
  const idBoard = 1;
  const sectionToAdd = {
    name: "Implement test API",
  };
  const response = renderHook(() =>
    Requests.usePostSection(idBoard, sectionToAdd)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 2));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  expect(response.result.current.data).toMatchSnapshot(sectionToAdd);
});
test("patch section", async () => {
  const sectionId = DUMMY_SECTION_ID;
  const newSectionName = "Implement Backend";
  const newSectionPart = { id: sectionId, name: newSectionName };
  const response = renderHook(() =>
    Requests.usePatchSection(sectionId, newSectionName)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 3));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  expect(response.result.current.data).toMatchObject(newSectionPart);
});
test("delete section", async () => {
  const sectionId = 1;
  const response = renderHook(() => Requests.useDeleteSection(sectionId));
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 3));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  //TODO : test response status to be equal to 200
});
test("post card", async () => {
  const sectionId = 1;
  const cardTitle = "card title yolo";
  const cardDescription = "card description yolo";
  const response = renderHook(() =>
    Requests.usePostCard(sectionId, cardTitle, cardDescription)
  );
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 3));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  expect(response.result.current.data).toMatchObject({
    title: cardTitle,
    description: cardDescription,
  });
});
test.todo("patch card");
test("delete card", async () => {
  const idCardToDelete = 1;
  const response = renderHook(() => Requests.useDeleteCard(idCardToDelete));
  expect(response.result.current.data).toEqual({});
  expect(response.result.current.isLoading).toBe(true);
  expect(response.result.current.error).toBe(null);
  await waitFor(() => sleep(delay * 3));
  expect(response.result.current.isLoading).toBe(false);
  expect(response.result.current.error).toBe(null);
  //TODO : check response status = 200
});
