import axios from "axios";
import { userSession } from "./Connect";

export async function load_NFT_Gallery(){
  let image_url = await loadNFTs();
  for(let x in image_url){    
    const newImg = document.createElement('img');
    const divContainer = document.getElementById('div-container');
    newImg.classList.add('div-shadow');    
    newImg.setAttribute('src', image_url[x]);
    divContainer.appendChild(newImg);  
  }    
}

async function loadNFTs(){
    let principal = userSession.loadUserData().profile.stxAddress.mainnet;
    let take = [];
    let result = [];
    let apiCallBallance = await axios.get("https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + principal + "/balances");
    let get_Derupter_NFT_Count = parseInt(apiCallBallance.data.non_fungible_tokens['SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.deruptars::deruptars']['count']);
    let get_Available_Derupters_via_axios = await axios.get("https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=" + principal + "&asset_identifiers=SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.deruptars::deruptars&limit=" + get_Derupter_NFT_Count + "&offset=" + 0);
    let deruptars_local_ipfs = await axios("deruptars-ipfs.json");
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
    return result;
  }