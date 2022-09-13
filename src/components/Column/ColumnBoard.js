import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import { InputColumn } from "./InputColumn";
import "./ColumnBoard.scss"

const Column = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="input-container">
            <Collapse in={open}>
                <InputColumn setOpen={setOpen} />
            </Collapse>
            <Collapse in={!open}>
                <div className="input-content">
                    <button onClick={() => setOpen(!open)}>
                        + Add List
                    </button>
                </div>
            </Collapse>
        </div>
    )
}

export {Column}