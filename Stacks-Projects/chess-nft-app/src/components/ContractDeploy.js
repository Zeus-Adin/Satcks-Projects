import { useConnect, openContractDeploy } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ContractDeploy = () => {
  function ContractDeploy() {
    let codeBody = "Contract goes here";
    openContractDeploy({
      contractName: "Name of contract goes here",
      codeBody,
      network: new StacksTestnet(),
      appDetails: {
        name: "Chess On Chain",
        icon: window.location.origin +"Logo goes here",
      },
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <p>Deploy Smart Contract</p>
      <button className="Vote" onClick={() => ContractDeploy()}>
        Deploy Contract
      </button>
    </div>
  );
};

export default ContractDeploy;
