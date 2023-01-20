import axios from 'axios';

const apiRequestAccountTX_HistoryUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/address/{principal}/transactions_with_transfers'
const apiRequestMempooTransactionsUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/address/{address}/mempool';
const apiRequestTransactionsToSpecificTX_idUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/{tx_id}';
const apiRequestAccountTX_EventsUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/events';
const apiGetAddressByNameUrl = 'https://stacks-node-api.mainnet.stacks.co/v1/names/';


const requestApiReturns = async (apiUrl, tx_sender, tx_id) => {
    return await axios.get(apiUrl + tx_sender);
}

//This Handles all Search methods
export const Search = async (bns, extension, network) => {
    const checkIfBns = bns.split('.') ? await requestApiReturns(apiGetAddressByNameUrl, bns, null) : null;
    return checkIfBns;
}
