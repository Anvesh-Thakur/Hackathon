import { useEffect, useState } from "react";
import * as contractInstance from "../Blockchain/interact"; 
import "./Login.css";
import { create, CID } from "ipfs-http-client";

const client = create('https://ipfs.infura.io:5001/api/v0')

const Login = () => {
    const [type, setType] = useState("creator");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState('');

    useEffect(() => {
    }, [transaction])

    const submitContent = async(e) => {
        e.preventDefault();
        
        console.log(url)

        const instance =  await contractInstance.contract_instance();
        const params = [];
        params.push(email);
        params.push(url);
        params.push(website);
        params.push(instagram);
        console.log(params)
        console.log(instance);
        await contractInstance.contract_addContentCreator(instance, params)
    }

    const retreiveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        setFile(data)
        e.preventDefault();
    }

    const uploadImage = async(e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const created = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`
            console.log(url)
            setUrl(url);
            setLoading(false);
        }catch(error){
            console.log(error)
        }
    }

    const submitUser = async(e) => {
        e.preventDefault();
        const instance =  await contractInstance.contract_instance();
        const params = [];
        params.push(email);
        console.log(params);
        let transaction = await contractInstance.contract_addUser(instance, params)
        setTransaction(transaction);
    }
  
    return (
    <>
        <form className="LoginForm">
            <select onChange={(e) => setType(e.target.value)}>
                <option value="creator">Creator</option>
                <option value="user">User</option>
            </select>
        {
        type === "creator" 
        ? 
        (<>
            
            <br />
                <label>Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <label>Photo</label>
                <div className="choose">
                <input type="file" name="data" onChange={retreiveFile} className="chooseFile" />
                </div>
                <button type="submit" className="btn" onClick={uploadImage}>Upload file</button>
                <label>Website</label>
                <input type="text" onChange={(e) => setWebsite(e.target.value)}/>
                <label>Instagram</label>
                <input type="text" onChange={(e) => setInstagram(e.target.value)} />
                <button onClick={submitContent}>submit</button>
        </>)
        : (<>
            <br />
            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={submitUser}>submit</button>
        </>)
    }
    </form>
    {loading ? (<h1>Loading..</h1>) : (<></>)}
    </>
  )
}

export default Login