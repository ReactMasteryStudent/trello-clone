import React from "react";
import { Column } from "./ColumnBoard";
import "./ColumnList.scss";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

const ITEM_HEIGHT = 48;

const ColumnList = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="list-cards">
                <div className="title-list">
                    Backlog
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{position: 'relative', left: '73%'}}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                        }}
                    >
                        <MenuItem style={{display: 'block', textAlign: 'center', color: '#5e6c84'}}>
                            List actions
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Add card...
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Move all cards in this list...
                        </MenuItem>
                        <MenuItem>
                            Archive all cards in this list...
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Archive this list
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="list-cards">
                <div className="title-list">
                    To do
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{position: 'relative', left: '77%'}}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                        }}
                    >
                        <MenuItem style={{display: 'block', textAlign: 'center', color: '#5e6c84'}}>
                            List actions
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Add card...
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Move all cards in this list...
                        </MenuItem>
                        <MenuItem>
                            Archive all cards in this list...
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            Archive this list
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <Column />
        </>
    )
}

export { ColumnList }