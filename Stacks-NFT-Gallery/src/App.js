import './App.css';
import React, { useState } from 'react';
import Auth from './components/Connect';
import { load_NFT_Gallery } from './components/Nft_Gallery';
import { load_Chimes_List } from './components/Chimes_History';

function App(){

  let [view, setView] = useState("");
  function stateSetter(pass){
    setView(pass);
    console.log(view);
  }   

  return(
    <div className="App">
      <h3>
        NFT Gallery
      </h3>
      <small>After load, wait some seconds before clicking</small>
      <br/><br/>
      <Auth />
      <br/>  
      <button onClick={()=>load_NFT_Gallery()}>NFT Gallery</button ><button onClick={()=>load_Chimes_List()}>Chimes List</button>
      <br/><br/>
      <div>

        <div id='div-container'></div>

      </div>
    </div>
  );

  
}

export default App;