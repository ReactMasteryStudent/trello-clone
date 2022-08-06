import React from "react";
import { rest } from "msw";

import { SERVER_DELAY, BASE_URL } from "../utils/test-utils/constants";

const DUMMY_WORKSPACE = {
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

const handlers = [
  rest.get(BASE_URL + "/workspace", (req, res, ctx) => {
    return res(
      ctx.delay(SERVER_DELAY),
      ctx.status(200),
      ctx.json(DUMMY_WORKSPACE)
    );
  }),
  rest.patch(BASE_URL + "/workspace", async (req, res, ctx) => {
    const body = await req.json();
    const id = body.id;
    const name = body.name;
    const newWorkspace = { ...DUMMY_WORKSPACE, name: name };
    return res(
      ctx.delay(SERVER_DELAY),
      ctx.status(200),
      ctx.json(newWorkspace)
    );
  }),
  rest.post(BASE_URL + "/board", async (req, res, ctx) => {
    const body = await req.json();
    const name = body.name;
    const image = body.image;
    const newBoard = {
      id: 53,
      name,
      image,
    };
    const newBoards = [...DUMMY_WORKSPACE.boards, newBoard];
    const newWorkspace = { ...DUMMY_WORKSPACE, boards: newBoard };
    return res(ctx.delay(SERVER_DELAY), ctx.status(200), ctx.json(newBoard));
  }),
  rest.patch(BASE_URL + "/board", async (req, res, ctx) => {
    const body = await req.json();
    const id = body.id;
    const name = body.name;
    const image = body.image;
    for (const i = 0; i < DUMMY_WORKSPACE.boards.length; i++) {
      if (DUMMY_WORKSPACE.boards[i].id === id) {
        //Ce test car le param image n'est pas obligatoire dans la request
        const updatedImage =
          image != null && image.length > 1
            ? image
            : DUMMY_WORKSPACE.boards[i].image;

        const newBoard = { ...DUMMY_WORKSPACE.boards[i], name, image };
        DUMMY_WORKSPACE.boards[i] = newBoard;
        return res(
          ctx.json(newBoard),
          ctx.status(200),
          ctx.delay(SERVER_DELAY)
        );
      }
    }
  }),
  rest.delete(BASE_URL + "/board/:id", (req, res, ctx) => {
    const id = +req.params.id;
    const newBoards = DUMMY_WORKSPACE.boards.filter((board) => {
      return board.id !== id;
    });
    if (newBoards !== undefined && id !== null && id !== undefined) {
      //ligne comment on to avoid modifying the dummy data for other test
      // DUMMY_WORKSPACE.boards = newBoards;
      return res(ctx.status(200), ctx.delay(SERVER_DELAY), ctx.json(newBoards));
    } else {
      //code erreur id non reconnu
      return res(ctx.status(400), ctx.delay(SERVER_DELAY));
    }
  }),
  rest.post(BASE_URL + "/section/:id", async (req, res, ctx) => {
    const id = +req.params.id;
    const sectionToAdd = await req.json();
    const completeSectionToAdd = { id: 32, cards: [], ...sectionToAdd };

    for (const i = 0; i < DUMMY_WORKSPACE.boards.length; i++) {
      if (DUMMY_WORKSPACE.boards[i].id === id) {
        DUMMY_WORKSPACE.boards[i].sections.push(completeSectionToAdd);
        //si ajout ok alors return code 200
        return res(
          ctx.status(200),
          ctx.delay(SERVER_DELAY),
          ctx.json(completeSectionToAdd)
        );
      }
    }

    //si ajout non ok return code 400
    return res(ctx.status(400), ctx.delay(SERVER_DELAY), ctx.json());
  }),
];

export default handlers;
