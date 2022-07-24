import "./Dashboard.css";
import React, { useEffect, useState } from 'react'
import * as contractInterface from '../Blockchain/interact'
import {connectWallet, getCurrentWalletConnected} from '../Wallet/connect'

const Dashboard = () => {
    const [users, setUsers] = useState();
    const [wallet, setWallet] = useState();
    const [transaction, setTransaction] = useState([]);
  
    useEffect(() => {
        async function getWalletConnected(){
        const { address, status } = await getCurrentWalletConnected();
        setWallet(address);
        
        console.log("Connection status: ", status);
        if(status === "Success!"){
            let instance = await contractInterface.contract_instance();
            let responseUser  = await contractInterface.contract_getAllContentCreator(instance);
            setUsers(responseUser);
      }
    }
        getWalletConnected();
    }, [transaction])

    const viewTransactions = async() => {
        let instance = await contractInterface.contract_instance();
        users.map(async user => {
            console.log(wallet + " " + user)
            let response = await contractInterface.contract_getTransaction(instance, wallet, user);
            let transaction = {
                address: user,
                balance: response.toString()
            }
            setTransaction(prev => [...prev, transaction]);
        })
    }

    return (
     
    <div className='Dashboard-main'>
        <div className="button" onClick={viewTransactions}>Show Transactions</div>
        {transaction.length !== 0 
        ? 
        transaction.map((trans, id)  => {
            return (
                <>
                <h2 key={id + 1}>{trans.address}</h2>
                <h2 key={id}>{trans.balance} Wei</h2>
                </>
            )
        })
        : (<h1> No Transaction! </h1>)
        }
    </div>
  )
}

export default Dashboard;