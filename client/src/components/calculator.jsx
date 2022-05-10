import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEthereumData, getWallet, getWalletEvents } from '../redux/actions';
import './home.modules.css'
import { Form, Button, Container } from 'react-bootstrap'

function Calculator() {

    //---> Store States
    const { user } = useSelector((state) => state)
    const etherData = useSelector((state) => state.ethPrices)

    //---> Local States
    const [input, setInput] = useState({
        valueEth: '',
        valueResult: '',
        coinSelected: 'aed'
    });


    //---> functions
    useEffect(() => {
    }, [])

    const handleOnChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input.coinSelected)
    }

    const handleNone = (e) => {        
        console.log(input.valueResult)
    }

    const calculate = (e) => {
        e.preventDefault()
        let ethValueExchange = etherData[input.coinSelected]
        let result = input.valueEth*ethValueExchange.toFixed(2)
        let resultCoin = (result).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
        setInput({ ...input, valueResult: resultCoin }) 
    }
    return (
        <div>
            <h4>Ethereum Converter Calculator</h4>
            <Form onSubmit={(e) => calculate(e)}>
                <Container >
                    <Form.Group >
                        <Form.Label>Ethereum amount: </Form.Label>
                        <Form.Control 
                            name='valueEth'
                            type='number'
                            placeholder='00000.00000'
                            value={input.valueEth}
                            onChange={(e) => handleOnChange(e)}
                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Convert to: </Form.Label>
                        <select className='btn btn-primary' style={{margin: 1 + "em"}} onChange={(e) =>setInput({...input, coinSelected: e.target.value})}>
                        {Object.keys(etherData).map(k =>
                    <option key={k} value={k}>{k.toUpperCase()}</option>
                )}                           
                        </select>
                        <Button type='submit'>
                            Calculate
                        </Button>
                        <Form.Group>
                        <Form.Label>Result: </Form.Label>
                        <Form.Control
                            name='result'
                            type='text'                            
                            value={input.valueResult}
                            onChange={(e) => handleNone(e)}
                            />
                            </Form.Group>

                    </Form.Group>                        
                </Container>
            </Form>

        </div>
    )
}

export default Calculator