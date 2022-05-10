import { GET_FAV_WALLETS, GET_WALLET, GET_WALLET_TIME, USER_TOKEN, LOGIN, ERROR, COINS, GET_MULTIPLE_WALLETS } from './actions.js'


const initialState = {    
    wallet: {},
    walletTime: {},
    userToken: {},
    user: {},
    error: "",
    ethPrices: [],
    multipleWallets: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case COINS:
            return {
                ...state,
                ethPrices: action.payload.market_data.current_price,
            }
        case GET_FAV_WALLETS:

            return {
                ...state,
                favWallets: action.payload,
            }
        case GET_MULTIPLE_WALLETS:
        let arr = []
        
            if (typeof action.payload.result === "string"){
                arr = []
            } else if (action.payload.result.length > 0) {
                arr = action.payload.result
            }
            
            return {
                ...state,
                multipleWallets: arr,
            }
        case GET_WALLET:
            let obj = { ...action.payload, address: action.address }
            return {
                ...state,
                wallet: obj,
                error: action.error,
            }
        case GET_WALLET_TIME:
            let times = []
            for (let i = 0; i < action.payload.result.length; i++) {
                if (action.payload.result[i].hasOwnProperty("timeStamp")) {
                    times.push(action.payload.result[i].timeStamp)

                }
            }

            let result = ""

            if (times) {
                let dates = times.map(e => new Date(e * 1000))
                let today = new Date()
                today.setFullYear(today.getFullYear() - 1);

                for (let i = 0; i < action.payload.result.length; i++) {
                    if (dates[i].getTime() < today.getTime()) {
                        result = "old"
                    } else {
                        result = "new"
                    }
                }
            }
            return {
                ...state,
                walletTime: result,
                error: action.error
            }

        case USER_TOKEN:
            return {
                ...state,
                userToken: { token: action.payload },
            };
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state
    }
};

export default rootReducer