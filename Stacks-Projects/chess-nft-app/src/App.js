import logo from "./logo.svg";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import ContractDeploy from "./components/ContractDeploy.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h2>React + Stacks.js 👋</h2>
        <ConnectWallet />
        <ContractDeploy />        
      </header>
    </div>
  );
}

export default App;
