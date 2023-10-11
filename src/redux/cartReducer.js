import {ADDITEM,DELITEM, REMOVE} from '../redux/Type.js'

 const cartReducer = (state = [], action) => {
   
    switch (action.type) {
        case  ADDITEM:
            const productToAdd = action.payload;
            console.log("Hello",productToAdd);
            const existingProduct = state.find((x) => x.id === productToAdd.id);
            
            if (existingProduct) {
                return state.map((x) =>
                    x.id === productToAdd.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                return [
                    ...state,
                    {
                        ...productToAdd,
                        qty: 1,
                    }
                ];
                
            }
        
        case DELITEM:
            const productToDec = action.payload;
            const productToDecIndex = state.findIndex((x) => x.id === productToDec.id);
            
            if (productToDecIndex !== -1) {
                const updatedState = [...state];
                const product = updatedState[productToDecIndex];
                
                if (product.qty === 1) {
                    updatedState.splice(productToDecIndex, 1);
                } else {
                    updatedState[productToDecIndex] = { ...product, qty: product.qty - 1 };
                }
                
                return updatedState;
            }
            
            return state;
        
            case REMOVE:
                const productToRemove = action.payload;
                const updatedItemsAfterRemove = state.items.filter(item => item.id !== productToRemove.id);
    
                return {
                    ...state,
                    items: updatedItemsAfterRemove
                };

        default:
            return state;
    }
};

export default cartReducer;
