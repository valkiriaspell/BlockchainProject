import { GET_FAV_WALLETS, GET_WALLET, GET_WALLET_TIME, USER_TOKEN, LOGIN, ERROR } from './actions.js'


const initialState = {
    favWallets: [],
    wallet: {},
    walletTime: {},
    userToken: {},
    user: {},
    manyWallets: [],
    error: ""
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:

            return {
                ...state,
                error: action.payload,
            }
        case GET_FAV_WALLETS:

            return {
                ...state,
                favWallets: action.payload,
            }
        case GET_WALLET:

            return {
                ...state,
                wallet: action.payload,
            }
        case GET_WALLET_TIME:
            let times = []
            for (let i = 0; i < action.payload.result.length ; i++){
                if (action.payload.result[i].hasOwnProperty("timeStamp")){
                    times.push(action.payload.result[i].timeStamp)
                    
                }
            }

            let result = ""

            if (times) {
                let dates = times.map(e => new Date(e * 1000))
                let today = new Date()            
                today.setFullYear(today.getFullYear() - 1);
                                
                for (let i = 0; i < action.payload.result.length ; i++){
                    if(dates[i].getTime() < today.getTime()){
                        result = "old"
                    } else {
                        result = "new"
                    }                
            }
        }
            return {
                ...state,
                walletTime: result,
                manyWallets: [...state.manyWallets,{address: action.address, time: result}]
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