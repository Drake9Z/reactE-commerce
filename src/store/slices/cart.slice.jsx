import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {setIsLoading} from './isLoading.slice'
import getConfig from '../../uitls/getConfig'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart" , getConfig())
        .then(resp => {
            console.log(resp.data)
            dispatch(setCart(resp.data))
        })
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
}

export const addItemCartThunk = data => dispatch => {
    dispatch( setIsLoading(true))

    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => alert("algo salió mal"))
        .finally(() => dispatch(setIsLoading(false)))
}

export const updateCartThunk = (id, quantity) => dispatch => {
    dispatch(setIsLoading(true))

    const body = {
        quantity
    }

    axios 
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const purchaseCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch (getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))

}