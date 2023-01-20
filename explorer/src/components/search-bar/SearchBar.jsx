import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Search } from '../../services/Search';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import Loading from '../backdrop/Backdrop';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function SearchBar() {
    const [network, setNetwork] = useState('mainnet');

    const handleEvents = async (event) => {

    }

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 300 }}
            >
                <InputBase
                    id='searching'
                    onChange={handleEvents}
                    sx={{ ml: 1, flex: 3 }}
                    placeholder="Search Stacks Blockchain"
                    inputProps={{ 'aria-label': 'search by bns, txid, stacks address, btc address...' }}
                />
                <IconButton onClick={handleEvents} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon id='search' />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <QrCodeScannerIcon />
                </IconButton>
            </Paper>
        </Grid>
    );
}