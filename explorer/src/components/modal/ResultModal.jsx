//React Imports
import React from 'react';

//Mui Elements Imports
import { experimentalStyled as styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';


const ResultModal = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid item xs={6} sm={4} md={4} >
            <Item>
                xs=2
                xs=2
            </Item>
        </Grid>
    );
}

export default ResultModal;


