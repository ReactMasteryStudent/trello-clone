import React from "react";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Avatar from '@mui/material/Avatar';

const HeaderBoard = () => {

  return (
    <Stack direction="row" spacing={2} sx={{ marginLeft: '21px', marginTop: '17px' }}>
        <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            sx={{ textTransform: 'capitalize' }}
        >
            Board
        </Button>
        <h3 style={{ marginTop: '10px'}}>Workspace Title</h3>
        <Button 
            variant="outlined" 
            size="small"
        >
            <StarOutlineIcon />
        </Button>
        <Divider 
            orientation="vertical" 
            flexItem
        />
        <Button 
            variant="outlined" 
            size="small"
            sx={{ textTransform: 'capitalize' }}
        >
          Clone Trello
        </Button>
        <Divider 
            orientation="vertical" 
            flexItem
        />
        <Button 
            variant="outlined" 
            size="small" 
            startIcon={<PeopleIcon />}
            sx={{ textTransform: 'capitalize' }}
        >
            Workspace visible
        </Button>
        <Divider 
            orientation="vertical" 
            flexItem
        />
        <Avatar />
        <Button 
            variant="outlined" 
            size="small" 
            startIcon={<PersonAddAltIcon />}
            sx={{ textTransform: 'capitalize' }}
        >
            Share
        </Button>
    </Stack>
  );

}

export {HeaderBoard}