import React, { useEffect, useState } from 'react'
import * as contractInterface from '../Blockchain/interact';
import Card from '../Card/Card';

const Content = () => {

    const [contentCreators, setContentCreaters] = useState([]);
    
    useEffect(() => {
        async function fetchContentCreators(){
            let instance = await contractInterface.contract_instance();
            let users = await contractInterface.contract_getAllUser(instance);
            users.map(async user => {
                let userData =  await contractInterface.contract_getCreator(instance, user);
                const userObj = {
                    email: userData[0],
                    photo: userData[1],
                    website: userData[2],
                    social: userData[3],
                    user: user
                }
                setContentCreaters(prev => [...prev, userObj]);
            });
        }
        fetchContentCreators();
    }, [])
    return (

    <div className='main'>
        {contentCreators.length !== 0 
        ? (
            contentCreators.map(creator => {
                console.log(creator)
                return <Card creator={creator} /> 
            })
        ) 
        : (<h2>No</h2>)}
    </div>
  )
}

export default Content