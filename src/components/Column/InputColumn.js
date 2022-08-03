import React, { useState } from "react";
import { Clear } from "@material-ui/icons";
import "./InputColumn.scss";

const InputColumn = ({ setOpen }) => {
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = () => {
    setOpen(false);
    setTitle("");
  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChange}
          value={title}
          className="input-text"
          placeholder=
            "Enter list title"
          autoFocus
        />
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          Add List
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle("");
            setOpen(false);
          }}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}

export {InputColumn}
