import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
  items: [],
  wishlist: []
}

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('schun-cart')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load cart from storage:', e)
  }
  return initialState
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      )
      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity
        }
        return { ...state, items: newItems }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.productId !== productId)
        }
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) {
        return state
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadFromStorage)

  useEffect(() => {
    localStorage.setItem('schun-cart', JSON.stringify(state))
  }, [state])

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        quantity
      }
    })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const addToWishlist = (productId) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId })
  }

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
  }

  const isInWishlist = (productId) => state.wishlist.includes(productId)

  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0)

  const value = {
    items: state.items,
    wishlist: state.wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartTotal,
    cartCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext