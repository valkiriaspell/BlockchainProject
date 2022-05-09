import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWallet, getWalletEvents } from '../redux/actions';
import s from './home.modules.css'
import WalletCard from './walletCard';



function Home() {
    const dispatch = useDispatch()

    //---> Local states
    let [currentWallet, setWallet] = useState({})
    let [address, setAddress] = useState("")

    //---> Store States

    const { wallet } = useSelector((state) => state)
    const { walletTime } = useSelector((state) => state)
    const { error } = useSelector((state) => state)

    //---> Functions
    async function searchWallet(e) {
        e.preventDefault()
        console.log(address)
        await dispatch(getWallet(address))
        await dispatch(getWalletEvents(address))        
        holdWallet()
    }

    useEffect(() => {
        console.log("updated")
    }, [address])


    function holdWallet() {
        setWallet({ address: address, balance: wallet.result, time: walletTime })

    }




    return (
        <div className={s.homeContainer}>
            <h5> Get information about an ethereum wallet directly from etherscan! </h5>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" value={address} placeholder="Write the address" aria-label="Search" onChange={(e) => setAddress(e.target.value)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => searchWallet(e)} >Search</button>
            </form>
            {wallet.result && !error?
                <div>
                    {wallet.result && typeof walletTime === 'string' ?
                        <div className="card text-white bg-success mb-3" style={{maxWidth: 18 + "rem", marginTop: 15 + "px"}}>
                            <div class="card-header">This Wallet is {walletTime}</div>
                            <div class="card-body">
                                <p class="card-title">Address: {address}</p>
                                <p class="card-text">Balance: {wallet.result}</p>                                
                                <br></br>
                                <button>Add to favorites</button>
                            </div>                            
                            </div>
                    : "Loading..."}
                        </div> :
                        <span>{error}</span>}
                    {/* {manyWallets? manyWallets.map( w => 
                <WalletCard
                key= {w.Address}
                ></WalletCard>                               
                ) : null} */}
                </div>
        
        );
    }

            export default Home;