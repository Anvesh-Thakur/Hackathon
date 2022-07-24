import {useEffect, useState} from 'react';
import { getCurrentWalletConnected } from '../Wallet/connect'
import * as contractInterface from '../Blockchain/interact';
import './Profile.css';

const Profile = ({wallet}) => {

    const [Details, setDetails] = useState({
        email: "",
        photo: "",
        website: "",
        social: ""
    })

    useEffect(() => {
        async function getWalletConnected(){
            const { address, status } = await getCurrentWalletConnected();
            console.log("Connection Status:", status);
            if (status === "Success!"){
              await getDetailsOfUser();
            }
        };
        getWalletConnected();
    }, [])

    async function getDetailsOfUser(){
        if(window.ethereum){
            let instance = await contractInterface.contract_instance();
            let response  = await contractInterface.contract_getUser(instance);
            if(response[0] === ''){
                let response = await contractInterface.contract_getCreator(instance, "");
                console.log()
                setDetails({
                    email: response[0],
                    photo: response[1],
                    website: response[2],
                    social: response[3]
                })
            }else{
                setDetails({
                    email: response[0] 
                })
            }
        }
        console.log(Details)
    }

    return (
      Details.email !=="" ? (
      <div className='profile'>
        <div className="details">
            <div className="profile-image">
                <img src={`${Details.photo}`} alt="Profile Photo" />
            </div>
            <div className="profile-details">
                <h1>{Details.email}</h1>
                <h3><a href={Details.social}>Instagram</a></h3>
                <h4><a href={Details.website}>Website</a></h4>
            </div>
        </div>
      </div>) : <h1>Loading</h1>
    )
}

export default Profile