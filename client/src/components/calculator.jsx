import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEthereumData, getWallet, getWalletEvents } from '../redux/actions';
import './home.modules.css'

function Calculator() {

//---> Store States
const { user } = useSelector((state) => state)
const etherData = useSelector((state) => state.ethPrices)


    //---> functions
    useEffect(() => {        
    }, [])

    return (
        <div>
            <h2>Ethereum Converter Calculator</h2>
        </div>
    )
}

export default Calculator