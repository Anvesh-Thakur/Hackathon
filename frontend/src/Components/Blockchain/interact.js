// This file will be the interace for the contract. Add all contract functions here
import { ethers } from 'ethers';
import contractAbi from '../abi/Funder.json';

const contractAddr = "0x566894afCb12057929FCE46246D7e5cE5e0D8bdb"


function get_provider(){
    return new ethers.providers.Web3Provider(window.ethereum);
}

async function get_signer(){
    let provider = get_provider();
    return (await provider.getSigner());
}

// address of the signer
async function get_signer_addr(){
    let signer = await get_signer();
    return (await signer.getAddress());
}

// create a contract instance
export async function contract_instance(){
    let signer = await get_signer();
    const contract = new ethers.Contract(
            contractAddr,
            contractAbi,
            signer
    )
    return contract;
}

export async function contract_getCreator(contract, address){
    if(address == ""){
        address = await get_signer_addr();
    }
    return await contract.getCreator(address) 
}

export async function contract_getUser(contract){
    let signer = await get_signer_addr();
    return await contract.getUser(signer) 
}

export async function contract_getAllUser(contract){
    return await contract.getAllUser();
}

export async function contract_getAllContentCreator(contract){
    return await contract.getAllContentCreator();
}

export async function contract_getTransaction(contract, payee, payer){
    return await contract.getTransaction(payee, payer);
}

export async function contract_addContentCreator(contract, params){
    try{
        const response = await contract.addContentCreator(params);
        return response;
    }catch(e){
        alert("Already Registered?")
    }
}

export async function contract_addUser(contract, params){
    try{
        const response = await contract.addUser(params);
        return response;
    }catch(e){
        if(e.code !== 4001){
            alert(e.message)
        }
    }
}

export async function contract_donate(contract, value, address){
    try{
        let valueformint = ethers.utils.parseEther(value)
        const response = await contract.donate(address, {
            value: valueformint
        });
        return response;
    }catch(e){
        if(e.code !== 4001){
            alert("Not Enough funds")
        }
    }
} 

export async function extractEvent(contract){
    let signer = get_provider().getSigner(0)
    const contractEvent = new ethers.Contract(
        contractAddr,
        contractAbi,
        signer
    )
    let eventFilter = contractEvent.filters.Deposit();
    let events = await contractEvent.queryFilter(eventFilter);
    console.log(events)
}