
//React Imports
import { useState } from 'react';

//Users Components Imports
import SearchBar from './components/search-bar/SearchBar';
import ResultModal from './components/modal/ResultModal';

//Stylers import
import './App.css';

//Logo Imports
import logo from './logo.png';

//Mui Imports
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  const [state, setState] = useState(


  );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 1 }}>
      <SearchBar />
    </Grid>
  );
}

export default App;
