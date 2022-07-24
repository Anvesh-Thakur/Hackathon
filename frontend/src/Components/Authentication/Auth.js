import { useEffect, useState } from "react";
import "./Auth.css";
import {connectWallet, getCurrentWalletConnected} from "../Wallet/connect"
import * as contractInterface from '../Blockchain/interact';
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {Link} from 'react-router-dom';

const Auth = () => {
  
  const [wallet, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [registered, setRegistered] = useState(false);
  const [donate, setDonate] = useState(false);

  useEffect(() => {
    async function getWalletConnected(){
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      console.log("Connection status: ", status);
      if(status === "Success!"){
        let instance = await contractInterface.contract_instance();
        let responseUser  = await contractInterface.contract_getUser(instance);
        let responseContent = await contractInterface.contract_getCreator(instance, "");
        if(responseUser[0] !== '' || responseContent[0] !== ''){
            setRegistered(true);
        }
      }
    }
    addWalletListener();
    getWalletConnected();
  }, [wallet])

  function addWalletListener() {

    if (window.ethereum) {
      // here we basically look for "accountsChanged" event.
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Success!");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }

  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    console.log("Connection Status:", walletResponse.status);
  };

  return (
    <div className="main-connect">
      <h1 className="heading">
        CreatorFund
      </h1>
      <Link to="/donation" style={{color: "#ffffff"}}>
        <h2>
          Donate Now!
        </h2>
      </Link>
    {status !== "Success!" 
    ?
    (<div className = "connect" onClick={connectWalletPressed}>
      <h1>
        Connect  
      </h1>
    </div>) 
    :
    (
      registered ? 
        <Profile wallet = {wallet} />
      : <Login />
    )
    } 
    </div>
  )
}

export default Auth 