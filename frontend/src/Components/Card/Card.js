import "./Card.css";
import React from 'react'
import * as contractInterface from '../Blockchain/interact';
import {AiOutlineInstagram, AiOutlineChrome} from 'react-icons/ai'

const Card = ({creator}) => {
  
  const donateOne = async(address) => {
    try{
      let instance = await contractInterface.contract_instance();
      let response = await contractInterface.contract_donate(instance, "1", address);
      console.log(response)
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <div className='main-card'>
      <div className="image">
        <img src={creator.photo} alt="" />
      </div>
      <div className="card-details">
        <div className="details">
          <h2>Email: {creator.email}</h2>
          <a href={creator.website}><AiOutlineChrome size={"40px"} /></a>
          <hr />
          <a href={creator.social}><AiOutlineInstagram size={"40px"} /></a>
        </div>
      <div className="card-btn">
        <div onClick={() => donateOne(creator.user)}>Donate 1 eth</div>
      </div>
      </div>
    </div>
  )
}

export default Card