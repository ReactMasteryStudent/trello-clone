export const BASE_URL = "http://localhost:5001/api";
export const SERVER_DELAY = 100;
export const DUMMY_WORKSPACE = {
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