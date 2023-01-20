import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ toggleload, setToggleload }) {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={toggleload}
                onClick={()=>setToggleload(!toggleload)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}