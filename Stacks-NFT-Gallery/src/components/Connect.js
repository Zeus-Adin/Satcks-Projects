import { AppConfig, UserSession, showConnect } from "@stacks/connect-react";

const appConfig = new AppConfig(["storage_write", "publish_data"]);
export const userSession = new UserSession({appConfig});

function connectStacks(){
    showConnect({
        appDetails:{
            name: "Stacks NFT Gallery",
            icon: "logo",
        },
        redirectTo: "/",
        onFinish: () => {
            let userData = userSession.loadUserData();
            window.location.reload();
        },
        onCancel: () => {
            console.log("Connection to Stacks canceled");
        },
        userSession: userSession,
    });
}
//=========================================================
function disConnectStacks(){
    userSession.signUserOut();
    window.location.reload();
}

function Auth(){
    if(!userSession.isUserSignedIn()){
        return(
            <div>
                <button onClick={()=>connectStacks()}>Connect Stacks</button>      
            </div>
        );
    }
    return(
        <div>
            <button onClick={()=>disConnectStacks()}>Disconnect Stacks</button>
            <br/><br/>
            <p><small>Mainnet STX Address: {userSession.loadUserData().profile.stxAddress.mainnet}</small></p>
        </div>
    );
}

export default Auth;