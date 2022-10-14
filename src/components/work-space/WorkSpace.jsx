import React from "react";
import styles from "../work-space/WorkSpace.module.css";
import TabList from "../tab-list/TabList";

const WorkSpace = (props) => {
  return (
    <>
      {props.workSpaces.map((workSpace, index)=>{
        // Pour chaque workSpace j'affiche son name et ses boards
        return <React.Fragment key={index}>
          <div className={styles.title}>
            <h6>{workSpace.name}</h6>
          </div>
          <TabList list={workSpace.boards} />
          </React.Fragment>
      })}
    </>
  );
};

export default WorkSpace;
