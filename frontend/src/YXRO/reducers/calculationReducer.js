import {
    SET_CALCULATION
} from '../actions';

import calculationInitialState from './calculationInitialState';

export default function calculationReducer(state = calculationInitialState, action) {
    switch (action.type) {
        case SET_CALCULATION:
            return action.payload;
            
        default:
            return state;
    }
}
