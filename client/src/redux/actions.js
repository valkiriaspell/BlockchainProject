import axios from 'axios'
export const GET_FAV_WALLETS = 'GET_FAV_WALLETS'
export const GET_WALLET = 'GET_WALLET'
export const NEW_USER = 'NEW_USER'
export const GET_WALLET_TIME = 'GET_WALLET_TIME'
export const USER_TOKEN = 'USER_TOKEN';
export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';
export const COINS = 'COINS';



export function getWallet(address) {
    return async function (dispatch) {        
        console.log(address, "addres pedida")
        try {
            const { data } = await axios.get(`http://localhost:3001/wallet/${address}`)
            dispatch({ type: GET_WALLET, payload: data, address: address, error: "" })
        } catch (e) {
            console.log(e)
            dispatch({ type: ERROR, payload: "Not found" })
        }
    }
}

export function getEthereumData() {
return async function (dispatch) {    
    try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum?market_data=true&community_data=false&developer_data=false&sparkline=false`)
        dispatch({ type: COINS, payload: data})
    
    } catch(e) {
        console.log(e)
    }

}
}


export function getWalletEvents(address) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/wallet/events/${address}`)
            dispatch({ type: GET_WALLET_TIME, payload: data, address: address, error: "" })
        } catch (e) {
            console.log(e)
            dispatch({ type: ERROR, payload: "Not found" })
        }
    }
}

export function getFavWallets(email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/wallet/favs/${email}`)
            dispatch({ type: GET_FAV_WALLETS, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function saveUser(user) {
    return async function (dispatch) {
        console.log(user, "AQUI USER")
        try {
            const { data } = await axios.post('http://localhost:3001/wallet/user', user)
            dispatch({ type: NEW_USER , payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function userToken(token) {
    return {
        type: USER_TOKEN,
        payload: token
    }
}

export function loginUser(email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/wallet/user/${email}`)
            dispatch({ type: 'LOGIN', payload: data })
            console.log(data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}