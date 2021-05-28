const SET_AVIA_SALES = 'SET_AVIA_SALES'
const SET_SEARCH_ID = 'SET_SEARCH_ID'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_FETCH_ERROR = 'SET_FETCH_ERROR'


const defaultState = {
    tickets: [],
    searchId: '',
    isFetching: true,
    isFetchError: false
}

export const aviaSalesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_AVIA_SALES:
            return {
                ...state,
                tickets: action.tickets,
                isFetching: false
            }
        case SET_SEARCH_ID:
            return {
                ...state,
                searchId: action.payload.searchId
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
        default:
            return state
    }
}

export const setAviaSales = (tickets) => ({type: SET_AVIA_SALES, tickets})
export const setSearchId = (searchId) => ({type: SET_SEARCH_ID, payload: searchId})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setFetchError = (bool) => ({type: SET_FETCH_ERROR, payload: bool})