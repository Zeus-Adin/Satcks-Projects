import { AppConfig, UserSession, showConnect, openContractDeploy } from "@stacks/connect-react";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "My App",
      icon: window.location.origin + "/my-app-logo.svg",
    },
    redirectTo: "/",
    onFinish: () => {
      let userData = userSession.loadUserData();
      // Save or otherwise utilize userData post-authentication
    },
    userSession: userSession,
  });
}

export function logout(){
  userSession.signUserOut();
  window.location.reload();
}

export async function deployContract(){

  const testnet = new StacksTestnet();
  const mainnet = new StacksMainnet();
  const codeBody = '(begin (print "Hello from Stackerspool"))';

  openContractDeploy({
    contractName: "from-stackerspool",
    codeBody,
    network: testnet,
    appDetails: {
      name: "Stacks Auth",
      icon: window.location.origin + "/my-app-logo.svg",
    },
    onFinish: (data) => {
      console.log("Stacks Transaction:", data.stacksTransaction);
      console.log("Transaction ID:", data.txId);
      console.log("Raw transaction:", data.txRaw);
    },
  });
}
