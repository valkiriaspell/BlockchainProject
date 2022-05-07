import { GET_FAV_WALLETS, GET_WALLET, GET_WALLET_TIME, USER_TOKEN, LOGIN } from './actions.js'


const initialState = {
    favWallets: [],
    wallet: {},
    walletTime: {},
    userToken: {},
    user: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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

            return {
                ...state,
                walletTime: action.payload,
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