import React from "react";
import styles from "../popular-template/PopularTemplate.module.css";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import TabList from "../tab-list/TabList";


const PopularTemplate = (props) => {
  return (
    <div>
      <div className={styles.title}>
        <AutoAwesomeMosaicIcon />
        <h6>Modèles les plus populaires</h6>
      </div>
      <TabList list={props.modeles.boards} isModele={true} />
    </div>
  );
};

export default PopularTemplate;
