import React from "react";
import styles from "../tab-list/TabList.module.css";
import { Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TabList = (props) => {
  return (
    <Grid container spacing={2}>
      {props.list.map((item) => {
        return (
          <Grid item key={item.id}>
            <Link to={`/${item.id}/${item.title}`}>
              <Paper
                className={styles.paper}
                style={{
                  background: `url(
                    "${item.image}"
                  )`,
                  backgroundSize: "cover",
                }}
                onClick={() => {
                  console.log("test");
                }}
              >
                {props.isModele === true && (
                  <Button className={styles.button}>Modèle</Button>
                )}
                <p>{item.title}</p>
              </Paper>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TabList;
