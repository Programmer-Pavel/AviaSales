import axios from "axios";
import {
    setAviaSales,
    setFetchError,
    setIsFetching,
    setSearchId
} from "../reducers/aviaSalesReducer";


export const getAviaSales = (searchId) => {
    return async (dispatch) => {
        if (searchId) {
            async function name() {
                try {
                    dispatch(setIsFetching(true))
                    const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
                    dispatch(setAviaSales(response.data.tickets))
                } catch (e) {
                    dispatch(setFetchError(true))
                    dispatch(setIsFetching(false))
                    setTimeout(() => {
                        dispatch(setFetchError(false))
                    }, 2000)
                }
            }
            name()
        }
    }
}

export const getSearchId = () => {
    return async (dispatch) => {
        const response = await axios.get('https://front-test.beta.aviasales.ru/search')
        dispatch(setSearchId(response.data))
    }
}
