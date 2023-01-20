import { AppConfig, UserSession, showConnect } from "@stacks/connect-react";
import {Storage} from "@stacks/storage"
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

export async function pushtogaia(){
  let data = "Hello world";
  const options = {
    decrypt: false,
  };
  const storage = new Storage({ userSession });
  let puting = await storage.putFile('test.json', JSON.stringify(data), options);
  console.log(puting);
}