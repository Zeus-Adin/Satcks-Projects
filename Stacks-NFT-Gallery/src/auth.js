import { AppConfig, UserSession, showConnect } from "@stacks/connect-react";

export var image_url;

const axios = require('axios');
const { fetch } = require("cross-fetch");
const {makeRandomPrivKey, privateKeyToString, getAddressFromPrivateKey, TransactionVersion,} = require("@stacks/transactions");
const {AccountsApi, FaucetsApi, Configuration} = require("@stacks/blockchain-api-client");

//API Configurations
const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: "https://stacks-node-api.mainnet.stacks.co"
});
//

const privateKey = makeRandomPrivKey();
const accounts = new AccountsApi(apiConfig);
const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
//END


//This block retrieves all NFT Image Url from specified in API url via Axios
export async function loadNFTs(wallet_address){

  let take = [];
  let result = [];
  const get_NFT_Balance = await accounts.getAccountBalance({principal: wallet_address,});
  const get_Derupter_NFT_Count = parseInt(get_NFT_Balance.non_fungible_tokens['SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.deruptars::deruptars']['count']);
  const get_Available_Derupters_via_axios = await axios.get("https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=" + wallet_address + "&asset_identifiers=SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.deruptars::deruptars&limit=" + get_Derupter_NFT_Count + "&offset=" + 0);
  const deruptars_local_ipfs = await axios("deruptars-ipfs.json");
  for(let i = 0; i < get_Derupter_NFT_Count; i++){
    let u_terminate = get_Available_Derupters_via_axios.data.results[i]['value']['repr'].split('u');
    let clean_take = u_terminate[1];
    take[i] = clean_take;
  }  
  for(let x in deruptars_local_ipfs.data){
    for(let y in take){
      if(take[y] === deruptars_local_ipfs.data[x]['id']){
        result[y] = deruptars_local_ipfs.data[x]['image'];
      }
    }    
  }
  image_url = result;
}
//END