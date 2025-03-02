import { db } from "../data/db"
import type { CartItem, Guitars } from "../types"

export type CartActions = 
  { type: "add-to-cart", payload: {item: Guitars} } |
  { type: "remove-from-cart", payload: {id: Guitars["id"]} } |
  { type: "decrease-quantity", payload: {id: Guitars["id"]} } |
  { type: "increment-quantity", payload: {id: Guitars["id"]} } |
  { type: "clear-cart" }

export type CartState = {
  data: Guitars[]
  cart: CartItem[]
}


const initialCart = () : CartItem[] => {
  const localStorageCart = localStorage.getItem("cart")
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
  data: db,
  cart: initialCart()
}

const MAX_ELEMENTS = 5
const MIN_ELEMENTS = 1

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if(action.type === "add-to-cart") {

    const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
    console.log(itemExists)
    let updateCart : CartItem[] = []
    if(itemExists) {
      updateCart = state.cart.map(item => {
        if(item.id === action.payload.item.id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })

    } else {
      const newItem : CartItem = {...action.payload.item, quantity : 1}
      updateCart = [...state.cart, newItem]
    }
    return {
      ...state,
      cart: updateCart
    }
  }
  if(action.type === "remove-from-cart") {

    const updateCart = state.cart.filter(item => item.id !== action.payload.id)

    return {
      ...state,
      cart: updateCart
    }
  }
  if(action.type === "decrease-quantity") {

    const updateCart = state.cart.map(item => 
          item.id === action.payload.id && item.quantity>MIN_ELEMENTS
          ? {...item, quantity: item.quantity - 1}
          : item
        )

    return {
      ...state,
      cart: updateCart
    }
  }
  if(action.type === "increment-quantity") {

    const updateCart = state.cart.map(item => 
      item.id === action.payload.id && item.quantity<MAX_ELEMENTS
      ? {...item, quantity: item.quantity + 1}
      : item
    )

    return {
      ...state,
      cart: updateCart
    }
  }
  if(action.type === "clear-cart") {
    return {
      ...state,
      cart: []
    }
  }

  return state
}