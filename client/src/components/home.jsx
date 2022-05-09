import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEthereumData, getWallet, getWalletEvents } from '../redux/actions';
import s from './home.modules.css'




function Home() {
    const dispatch = useDispatch()

    //---> Local states
    let [currentWallet, setWallet] = useState({})
    let [address, setAddress] = useState("")
    let [balanceConverted, setExchange] = useState()
  

    //---> Store States

    const { wallet } = useSelector((state) => state)
    const { walletTime } = useSelector((state) => state)
    const { error } = useSelector((state) => state)
    const etherData = useSelector((state) => state.ethPrices)

    //---> Functions
    async function searchWallet(e) {
        e.preventDefault()
        console.log(address)
        await dispatch(getWallet(address))
        await dispatch(getWalletEvents(address))        
        holdWallet()
        setExchange("")
    }

    useEffect(() => {        
        dispatch(getEthereumData())
    }, [])


    function holdWallet() {
        setWallet({ address: address, balance: wallet.result, time: walletTime })

    }

    async function convertCoin(e) {
        e.preventDefault()
        let etherBalance = wallet.result/(1000000000*1000000000)
        let selection = e.target.value
        let coinSelected = etherData[selection]
        let result = etherBalance*coinSelected
        console.log(result, "total")
        setExchange(result)      

    }




    return (
        <div className={s.homeContainer}>
            <h5> Get information about an ethereum wallet directly from etherscan! </h5>
            <form className="form-inline my-2 my-lg-0" style={{marginLeft: 30 + "px"}}>
                <input className="form-control mr-sm-2" type="search" value={address} placeholder="Write the address" aria-label="Search" onChange={(e) => setAddress(e.target.value)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => searchWallet(e)} >Search</button>
            </form>
            {wallet.result && !error?
                <div>
                    {wallet.result && typeof walletTime === 'string' ?
                        <div className="card text-white bg-success mb-3" style={{maxWidth: 18 + "rem", marginTop: 15 + "px"}}>
                            <div className="card-header">This Wallet is {walletTime}</div>
                            <div className="card-body">
                                <p className="card-title">Address: {wallet.address}</p>
                                <p>Balance:</p>
                                <p className="card-text">wei {wallet.result}</p>                                
                                <p className="card-text">ether {(wallet.result/(1000000000*1000000000)).toFixed(2)}</p>                                
                                <br></br>
                                <button type="button" className="btn btn-light" style={{marginTop: 15 + "px"}}>Add to favorites</button>
                                <br></br>
                                <select className="btn btn-light" style={{marginTop: 15 + "px"}} onChange={(e)=> convertCoin(e)}>
                                {Object.keys(etherData).map(k => 
                                    <option key={k} value={k}>{k.toUpperCase()}</option>
                                    )}                                    
                                </select>
                                   <div>
                                {balanceConverted? <span className="badge bg-secondary bg-secondary">{balanceConverted.toFixed(2)}</span> : null}
                                </div>                              
                            </div>                            
                            </div>
                    : <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>}
                        </div> :
                        <span>{error}</span>}
                  
                </div>
        
        );
    }

            export default Home;