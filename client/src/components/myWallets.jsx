import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEthereumData, getMultipleWallets, getWallet, getWalletEvents } from '../redux/actions';
import './home.modules.css'

function MyWallets() {

    const dispatch = useDispatch()

    //---> Local States
    let [coinName, setCoin] = useState("eth")
    

    //---> Store States
    const { user } = useSelector((state) => state)
    let { multipleWallets } = useSelector((state) => state)
    const etherData = useSelector((state) => state.ethPrices)      

    //---> functions
    

    useEffect(() => {
        console.log( "adress que vienen de back",user.wallets,)
           if(user.wallets){
               dispatch(getMultipleWallets(user.wallets.map(e => e.address)))
            }       

    }, [])

    let finalWallets = []
    if (user.wallets.length > 0 && multipleWallets.result.length > 0) {
        if (typeof multipleWallets.result !== "string"){

            multipleWallets.result.map(e =>
                finalWallets.push({ account: e.account, balance: e.balance / (1000000000 * 1000000000) }))
            }
    }

   function convertCoin(e) {
        e.preventDefault()        
        setCoin(e.target.value)        
    }

    function removeFromFavs(e) {
    console.log(e.target.value, "boton")
    }

    let coinSelected = etherData[coinName]    
    let newbalances = []
    finalWallets.map(e =>
        newbalances.push({ account: e.account, balance: e.balance * coinSelected }))
        finalWallets = newbalances
        

// {
//     "status":"1",
//     "message":"OK",
//     "result":[
//        {
//           "account":"0xa65760c16a47bb1c7d5373d9d18736084e2d3f66",
//           "balance":"5200000000000000000"
//        },
//        {
//           "account":"0xa65760c16a47bb1c7d5373d9d18736084e2d3f66",
//           "balance":"5200000000000000000"
//        },
//        {
//           "account":"0x39fe7a6512c0b70d734515ddbdea9410ae7c26d0",
//           "balance":"500000000000000000"
//        }
//     ]
//  }



return (
    <div >
        {user.wallets?
        <div>        
        <div>
            <select className="btn btn-light" style={{ marginTop: 15 + "px" }} onChange={(e) => convertCoin(e)}>
                {Object.keys(etherData).map(k =>
                    <option key={k} value={k}>{k.toUpperCase()}</option>
                )}
            </select>
        </div>
        <div className='containerWallets'>
            {finalWallets ?
                finalWallets.map(w =>
                    <div key={w.account} className="card text-white bg-success mb-3" style={{ maxWidth: 18 + "rem", margin: 30 + "px" }}>
                        <div className="card-body">
                            <p className="card-title">Address: {w.account}</p>
                            <p>Balance:</p>
                            <p className="card-text">{coinName} {(w.balance).toFixed(10)}</p>
                            <br></br>
                            <button type="button" value={w.account} className="btn btn-light" style={{marginTop: 15 + "px"}} onClick={(e) => removeFromFavs(e)}>Remove from favorites</button>
                        </div>
                    </div>
                )

                :
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>}
        </div>
        </div>
        : <h4></h4> }
    </div>
);
}

export default MyWallets;