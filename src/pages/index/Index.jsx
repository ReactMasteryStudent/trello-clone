import React from "react";
import PopularTemplate from "../../components/popular-template/PopularTemplate";
import WorkSpace from "../../components/work-space/WorkSpace";

//Pb : pour l'instant pas d'appel API mise en place pour récupérer TOUS les workspaces.
//l'appel API Get Workspaces (voir postman) ne donne que un workspace
const DUMMY_DATA_FROM_DB = {
  "id": 1,
  "name": "Default workspace",
  "boards": [
      {
          "id": 1,
          "name": "Trello clone",
          "image": "https://i.ytimg.com/vi/tArC9-RHmU4/maxresdefault.jpg",
          "sections": [
              {
                  "id": 1,
                  "name": "Backlog",
                  "position": 1,
                  "cards": [
                      {
                          "id": 1,
                          "title": "API Call",
                          "position": 1,
                          "description": ""
                      },
                      {
                          "id": 2,
                          "title": "Header",
                          "position": 2,
                          "description": ""
                      }
                  ]
              }
          ]
      },
      {
          "id": 2,
          "name": "Netflix clone",
          "image": "https://static.posters.cz/image/750/posters/cars-characters-i33475.jpg",
          "sections": [
              {
                  "id": 1,
                  "name": "Backlog",
                  "position": 1,
                  "cards": [
                      {
                          "id": 1,
                          "title": "API Call",
                          "position": 1,
                          "description": ""
                      },
                      {
                          "id": 2,
                          "title": "Header",
                          "position": 2,
                          "description": ""
                      }
                  ]
              }
          ]
      }
  ]
}

const Index = () => {
  return (
    <>
      <PopularTemplate modeles={DUMMY_DATA_FROM_DB}/>
      {/* On est sensé pouvoir avoir plusieurs workspace et donc il s'agirait d'un array de workspace */}
      <WorkSpace workSpaces={[DUMMY_DATA_FROM_DB]}/>
    </>
  );
};

export default Index;
