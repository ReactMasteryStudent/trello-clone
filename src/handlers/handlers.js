import React from "react";
import { rest } from "msw";

import {
  SERVER_DELAY,
  DUMMY_WORKSPACE,
  BASE_URL,
  DUMMY_SECTION_ID,
  DUMMY_CARD_ID,
  DUMMY_CARD_POSITION,
} from "../utils/test-utils/constants";

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
    const completeSectionToAdd = {
      id: DUMMY_SECTION_ID,
      cards: [],
      ...sectionToAdd,
    };

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
  rest.patch(BASE_URL + "/section", async (req, res, ctx) => {
    const body = await req.json();
    const sectionId = body.id;
    const newSectionName = body.name;
    for (
      let boardIndex = 0;
      boardIndex < DUMMY_WORKSPACE.boards.length;
      boardIndex++
    ) {
      for (
        let sectionIndex = 0;
        sectionIndex < DUMMY_WORKSPACE.boards[boardIndex].sections.length;
        sectionIndex++
      ) {
        if (
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].id ===
          sectionId
        ) {
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].name =
            newSectionName;
          const returning =
            DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex];
          //code 200 ok
          return res(
            ctx.status(200),
            ctx.delay(SERVER_DELAY / 2),
            ctx.json(DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex])
          );
        }
      }
    }
    //code 400 non ok
    return res(
      ctx.status(400),
      ctx.delay(SERVER_DELAY),
      ctx.json({ errorMessage: "requete non résolu" })
    );
  }),
  rest.delete(BASE_URL + "/section/:id", async (req, res, ctx) => {
    const idSectionToDelete = +req.params.id;
    console.log({ idSectionToDelete });
    for (
      let boardIndex = 0;
      boardIndex < DUMMY_WORKSPACE.boards.length;
      boardIndex++
    ) {
      for (
        let sectionIndex = 0;
        sectionIndex < DUMMY_WORKSPACE.boards[boardIndex].sections.length;
        sectionIndex++
      ) {
        if (
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].id ===
          idSectionToDelete
        ) {
          // je delete pas pour garder l'intégrité des data de test
          // DUMMY_WORKSPACE.boards[boardIndex].sections.splice(sectionIndex, 1);
          return res(ctx.delay(SERVER_DELAY), ctx.status(200), ctx.json({}));
        }
      }
    }
    return res(ctx.delay(SERVER_DELAY), ctx.status(400), ctx.json({}));
  }),
  rest.post(BASE_URL + "/card/:id", async (req, res, ctx) => {
    const sectionId = +req.params.id;
    const cardToAdd = await req.json();
    //Positionnement dans la bonne section
    for (
      let boardIndex = 0;
      boardIndex < DUMMY_WORKSPACE.boards.length;
      boardIndex++
    ) {
      for (
        let sectionIndex = 0;
        sectionIndex < DUMMY_WORKSPACE.boards[boardIndex].sections.length;
        sectionIndex++
      ) {
        if (
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].id ===
          sectionId
        ) {
          //insérer card
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].cards.push({
            id: DUMMY_CARD_ID,
            position: DUMMY_CARD_POSITION,
            ...cardToAdd,
          });
          //return status ok
          return res(
            ctx.delay(SERVER_DELAY),
            ctx.status(200),
            ctx.json(cardToAdd)
          );
        }
      }
    }
    //return non ok
    return res(
      ctx.status(400),
      ctx.delay(SERVER_DELAY),
      ctx.json({ errorMessage: "id section may be unknown" })
    );
  }),
  rest.delete(BASE_URL + "/card/:id", async (req, res, ctx) => {
    const idCardToDelete = req.params.id;
    //find the card
    for (
      let boardIndex = 0;
      boardIndex < DUMMY_WORKSPACE.boards.length;
      boardIndex++
    ) {
      for (
        let sectionIndex = 0;
        sectionIndex < DUMMY_WORKSPACE.boards[boardIndex].sections.length;
        sectionIndex++
      ) {
        for (
          let cardIndex = 0;
          cardIndex <
          DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].cards
            .length;
          cardIndex++
        ) {
          if (
            DUMMY_WORKSPACE.boards[boardIndex].sections[sectionIndex].cards[
              cardIndex
            ].id === idCardToDelete
          ) {
            //delete the card
            DUMMY_WORKSPACE.boards[boardIndex].sections[
              sectionIndex
            ].cards.splice(cardIndex, 1);
            //return status ok
            return res(ctx.status(200), ctx.delay(SERVER_DELAY), ctx.json({}));
          }
        }
      }
    }
    //default : return error
    return res(ctx.status(400), ctx.delay(SERVER_DELAY), ctx.json({}));
  }),
];

export default handlers;
