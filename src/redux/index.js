import {ADDITEM,DELITEM,REMOVE} from './Type'

export const addCart = (product) => {
    console.log(product);

    return {
        type: ADDITEM,
        payload: product
    };
};

// For Delete Item From Cart
export const delCart = (product) => {
    return {
        type: DELITEM,
        payload: product
    };
};
export const removeItemAction = (product) => {
    return {
        type:REMOVE,
        payload: product
    };
};