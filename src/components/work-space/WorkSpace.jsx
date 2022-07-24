import React from "react";
import styles from "../work-space/WorkSpace.module.css";
import TabList from "../tab-list/TabList";

const DUMMY_TEMPLATES = [
  {
    id: 1,
    title: "Conduite de projet",
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
    title: "Modèle Kanban",
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
    title: "Tableau de bord d'équipe",
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

const WorkSpace = () => {
  return (
    <div>
      <div className={styles.title}>
        <h6>VOS ESPACE DE TRAVAIL</h6>
      </div>
      <TabList list={DUMMY_TEMPLATES} />
    </div>
  );
};

export default WorkSpace;
