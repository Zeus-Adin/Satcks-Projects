import logo from './logo.svg';
import './App.css';
import {authenticate, userSession, logout, deployContract} from './auth'
function App() {
  
  function displayAddress(){    
    let address;
    if(userSession.isUserSignedIn()){
      address = userSession.loadUserData().profile.stxAddress.testnet;
    }else{
      address = 'User not Logged in';
    }
    return address;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click to connect to Stacks Blockchain
        </p>
        <h4>{displayAddress()}</h4>
        <button onClick={()=>authenticate()}>Connect</button><br/>
        <button onClick={()=>deployContract()}>Deploy Contract</button>
        <br/><button onClick={()=>logout()}>Logout</button>
      </header>
    </div>
  );
}

export default App;
