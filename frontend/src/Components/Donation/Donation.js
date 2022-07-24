import "./Donation.css";
import {useState} from 'react';
import * as contractInterface from "../Blockchain/interact"

const Donation = () => {

  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");

  const makeDonation = async() => {
    let instance = await contractInterface.contract_instance();
    let response = await contractInterface.contract_donate(instance, value, address);
  }

  return (
    <>
    <div className = "donate">
        <div className="amount">
        <label>Amount</label>
        <br />
        <input type="text" onChange = {(e) => setValue(e.target.value)} /> 
        <br />
        </div>
        <div className="addres">
        <label>Address</label>
        <br />
        <input type="text" onChange = {(e) => setAddress(e.target.value)} /> 
        <br />
        </div>
    </div>
    <button className="btn-donate" onClick={makeDonation}>Donate!</button>
    </>
  )
}

export default Donation