import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getWallet, getWalletEvents } from '../redux/actions';
import s from './home.modules.css'



function Home() {
const dispatch = useDispatch()

//---> Functions
const searchWallet = (e) => {
    e.preventDefault()    
    console.log(address)        
    dispatch(getWallet(address))
    dispatch(getWalletEvents(address))
    setWallets([...manyWallets,{Address: address, Balance: wallet.result, time:"we'll see"}])
}
//---> Store States

const {wallet} = useSelector((state) => state)
const {walletTime} = useSelector((state) => state)

//---> Local states
let [manyWallets, setWallets] = useState([])
let [address, setAddress] = useState("")



    return (        
                <div className={s.homeContainer}>                    
            <h5> Get information about an ethereum wallet directly from etherscan! </h5>            
            <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" value={address} placeholder="Write the address" aria-label="Search" onChange={(e) => setAddress(e.target.value)}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => searchWallet(e) } >Search</button>
                    </form>
                {manyWallets? <span> "hay"</span>: null}
            </div>
        
        );
    }
    
    export default Home;