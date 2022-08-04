import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import { InputColumn } from "./InputColumn";
import "./ColumnBoard.scss"

const Column = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="board-lists">
            <div className="board-list">
                Backlog
            </div>
            <div className="board-list">
                To do
            </div>
            <div className="board-list">
                <Collapse in={open}>
                    <InputColumn setOpen={setOpen} />
                </Collapse>
                <Collapse in={!open}>
                    <div>
                        <button onClick={() => setOpen(!open)} style={{border: 'none'}}>
                            + Add List
                        </button>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export {Column}