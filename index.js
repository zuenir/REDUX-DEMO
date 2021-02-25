const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers; 
const applyMidleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//type of the action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//action => object
//action creator => function that return an action
function buycake(){
    return {
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyicecream(){
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}

//redux function
// (previousState, action) =< newState

const InitialState_Cake = {
    numOfCakes: 10
}

const InitialState_IceCream = {
    numOfIceCreams: 20
}

const reducer_cake = (state = InitialState_Cake, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state;
    }
}


const reducer_icecream = (state = InitialState_IceCream, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: reducer_cake,
    icecream: reducer_icecream
});

const store = createStore(rootReducer, applyMidleware(logger))
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buycake());
store.dispatch(buyicecream());
unsubscribe();

