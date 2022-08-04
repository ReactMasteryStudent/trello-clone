import React from "react";
import { rest } from "msw";

const BASE_URL = "http://localhost:5001/api";
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
const delay = 100;

const handlers = [
  rest.get(BASE_URL + "/workspace", (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200), ctx.json(DUMMY_RESPONSE));
  }),
  rest.patch(BASE_URL + "/workspace", async (req, res, ctx) => {
    const body = await req.arrayBuffer();
    const id = body.id;
    const name = body.name;
    console.log({ id, name });
    const newWorkspace = { ...DUMMY_RESPONSE, name: name };
    return res(ctx.delay(delay), ctx.status(200), ctx.json(newWorkspace));
  }),
  rest.post(BASE_URL + "/board", async (req, res, ctx) => {
    const body = await req.arrayBuffer();
    const name = body.name;
    const image = body.image;
    const newBoard = {
      id: 53,
      name,
      image,
    };
    const newBoards = [...DUMMY_RESPONSE.boards, newBoard];
    const newWorkspace = { ...DUMMY_RESPONSE, boards: newBoard };
    return res(ctx.delay(delay), ctx.status(200), ctx.json(newBoard));
  }),
  rest.patch(BASE_URL + "/board", async (req, res, ctx) => {
    const body = await req.arrayBuffer();
    const id = body.id;
    const name = body.name;
    const image = body.image;
    for (const i = 0; i < DUMMY_RESPONSE.boards.length; i++) {
      if (DUMMY_RESPONSE.boards[i].id === id) {
        //Ce test car le param image n'est pas obligatoire dans la request
        const updatedImage =
          image != null && image.length > 1
            ? image
            : DUMMY_RESPONSE.boards[i].image;

        const newBoard = { ...DUMMY_RESPONSE.boards[i], name, image };
        DUMMY_RESPONSE.boards[i] = newBoard;
        return res(ctx.json(newBoard), ctx.status(200), ctx.delay(delay));
      }
    }
  }),
  rest.delete(BASE_URL + "/board/:id", (req, res, ctx) => {
    const id = req.url.searchParams.get("id");
    const newBoards = DUMMY_RESPONSE.boards.filter((board) => {
      return board.id !== id;
    });
    if (newBoards && newBoards.length > 0) {
      DUMMY_RESPONSE.boards = newBoards;
      res(ctx.status(200), ctx.delay(delay));
    } else {
      //code erreur id non reconnu
      return res(ctx.status(400), ctx.delay(delay));
    }
  }),
];

export default handlers;
