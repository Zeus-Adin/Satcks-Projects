import { RosettaConstructionPayloadResponseToJSON } from "@stacks/blockchain-api-client";
import axios from "axios";
import { userSession } from "./Connect";

export async function load_Chimes_List(){
    let principal = "SP1TA84JTP4YRFWBK7PYKBA33H3YB60XP654RAR7M";
    let btcname = (await axios.get("https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/" + principal)).data.names[0];
    let chimesdata = await loadChimesList(principal);
    console.log(chimesdata);

    const divContainer = document.getElementById('div-container');
    for(let x = 0; x<chimesdata.total;x++){
        const chime_card_style = "background-color: rgba(131, 123, 199, 0.555);width: 100%;height: 20em;box-shadow: 0px 0px 10px var(--clr-gray-med);margin: 0 1em 1em 0;transition: all 100ms ease-in-out;";
        const chime_card = document.createElement('div');
        chime_card.classList.add('chime_card_container');
        chime_card.setAttribute("id", "chime_card_container-"+x);
        chime_card.setAttribute("style", chime_card_style);
        divContainer.appendChild(chime_card);
    }
    
    for(let x = 0; x<chimesdata.total;x++){
        const chime_card_container = document.getElementById('chime_card_container-'+x);
        const chime_content = document.createElement('h4');
        const chime_attachment = document.createElement('img');
         //================================================
        chime_content.classList.add('chime_content');  
        chime_attachment.classList.add('chime_attachment');
        chime_content.innerHTML = chimesdata.content[x][0];
        let image_url = await getSourceUrl(btcname, chimesdata.content[x][1], true);
        chime_attachment.setAttribute('src', image_url);    
        chime_attachment.setAttribute('style', 'width:80%;height:200px;');     
        chime_card_container.appendChild(chime_content);
        chime_card_container.appendChild(chime_attachment);
    }
}

async function checkLink(url) { return (await fetch(url)).ok };
export const getSourceUrl = async (btcName, filename, findUrl = false) => {
    try {
      const { zonefile } = (await axios.get(`https://stacks-node-api.mainnet.stacks.co/v1/names/${btcName}/zonefile`)).data;
      const profileUrl = new RegExp(/https:\/\/(.*)json/).exec(zonefile)[0];
      const profileJson = (await axios.get(profileUrl)).data;
      const hubUrls = profileJson[0].decodedToken.payload.claim.apps;
      if (!findUrl) {
        return `${hubUrls[window.location.origin]}${filename}`;
      } else {
        if (hubUrls[window.location.origin] && await checkLink(`${hubUrls[window.location.origin]}${filename}`)) {
          return `${hubUrls[window.location.origin]}${filename}`;
        }
        for (const hubUrl of Object.values(hubUrls)) {
          console.log(`${hubUrl}${filename}`)
          if (await checkLink(`${hubUrl}${filename}`)) {
            return `${hubUrl}${filename}`;
          }
        }
        return filename;
      }
    } catch (e) {
      console.log('Error in get source url', e);
      return filename;
    }
}

async function loadChimesList(principal){
  let offset = 0;
  let request = async()=>{
    let result = (await axios.get('https://stacks-node-api.mainnet.stacks.co/extended/v1/address/' + principal + '/transactions?offset=' + offset + '&limit=50')).data;
    result = [result, result.total];
    return result;
  }
  let limiter = await request();
  let recount=0;let content=[];
  while(offset < limiter[1]){
    let newRequest = await request();
    for(let x=0; x<limiter[1];x++){      
      try {      
        let contract = [newRequest[0].results[x].tx_status, newRequest[0].results[x].contract_call['function_name'], newRequest[0].results[x].contract_call.function_args[0].repr, newRequest[0].results[x].contract_call.function_args[1].repr];        
        if(contract[1] === "send-message" && contract[0] === "success"){
          console.log();
          if(((contract[3].split('"'))[1].split("-"))[0] === "gaia"){
            content.push([(contract[2].split('"'))[1], (contract[3].split('"'))[1]]);
          }
          recount = recount + 1;
        }  
      } catch (error) {}
    }
    offset = offset + 50;
  }
  return {content: content, total:  content.length};
}