import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:
        case ADD_CARD:
            return {
                ...state,
                ...action.deck
            }
        
        default:
            return state
    }
}

export default decks