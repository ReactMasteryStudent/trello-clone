import React from "react";
import styles from "../popular-template/PopularTemplate.module.css";
import { Grid, Paper } from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

const DUMMY_TEMPLATES = [
  {
    id: 1,
    title: "title1",
    image:
      "https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2021/11/wallpaper-windows-11-se.png",
    content: [
      {
        title: "Project Ressources",
        columns: [
          {
            task: "backend production",
            members: ["member1", "member2"],
          },
        ],
      },
      {
        title: "Sujets de la prochaine réunion",
        columns: [
          {
            task: "donner accès aux documents",
            members: ["member1", "member2"],
          },
          {
            task: "Créer bannière du site",
            members: ["member1", "member2"],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "title1",
    image:
      "https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2021/11/wallpaper-windows-11-se.png",
    content: [
      {
        title: "Project Ressources",
        columns: [
          {
            task: "backend production",
            members: ["member1", "member2"],
          },
        ],
      },
      {
        title: "Sujets de la prochaine réunion",
        columns: [
          {
            task: "donner accès aux documents",
            members: ["member1", "member2"],
          },
          {
            task: "Créer bannière du site",
            members: ["member1", "member2"],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "title2",
    image:
      "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg",
    content: [
      {
        title: "En cours",
        columns: [
          {
            task: "Header",
            members: ["member1", "member2"],
          },
        ],
      },
      {
        title: "Terminé",
        columns: [
          {
            task: "Work Space",
            members: ["member1", "member2"],
          },
          {
            task: "Data Base",
            members: ["member1", "member2"],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "title2",
    image:
      "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg",
    content: [
      {
        title: "En cours",
        columns: [
          {
            task: "Header",
            members: ["member1", "member2"],
          },
        ],
      },
      {
        title: "Terminé",
        columns: [
          {
            task: "Work Space",
            members: ["member1", "member2"],
          },
          {
            task: "Data Base",
            members: ["member1", "member2"],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "title2",
    image:
      "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg",
    content: [
      {
        title: "En cours",
        columns: [
          {
            task: "Header",
            members: ["member1", "member2"],
          },
        ],
      },
      {
        title: "Terminé",
        columns: [
          {
            task: "Work Space",
            members: ["member1", "member2"],
          },
          {
            task: "Data Base",
            members: ["member1", "member2"],
          },
        ],
      },
    ],
  },
];

const PopularTemplate = (props) => {
  return (
    <div>
      <div className={styles.title}>
        <AutoAwesomeMosaicIcon />
        <h5>Modèles les plus populaires</h5>
      </div>
      <Grid container spacing={2}>
        {DUMMY_TEMPLATES.map((template) => {
          return (
            <Grid item key={template.id} lg={3}>
              <Paper className={styles.paper}>
                <img src={template.image} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PopularTemplate;
