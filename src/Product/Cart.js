import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { addCart, delCart, remCart, removeItemAction } from '../redux';



const Cart = () => {


    const state = useSelector(state => state); 
    // const state = useSelector((state)=> state)
    console.log(state);
    const dispatch = useDispatch()

    const handleAdd = (item) => {
        dispatch(addCart(item))
    }
    const handleDel = (item) => {
        dispatch(delCart(item))
    }
   
    // const handleRemove = (item) => {
    //     dispatch(remCart(item))
    // }


    const handleRemove = (product) => {
        dispatch(removeItemAction(product)); // Pass the product object or its id as payload
    };

    const emptyCart = () => {
      
        return(
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        )
    }
    const cartItems = (product) => {
        
        console.log(product);
        return(
            
            <>
            <div>
            <div class="d-flex py-3"><h3>Total Price: $ {product.qty} X ${product.price} = ${product.qty * product.price}</h3> <a class="mx-3 btn btn-primary" href="cart-check-out">Check Out</a></div>
            </div>
                {/* <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={product.image} alt={product.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{product.title}</h3>
                            <p className="lead fw-bold">
                                {product.qty} X ${product.price} = ${product.qty * product.price}
                            </p>
                            <button className="btn btn-outline-dark me-4" onClick={()=>handleDel(product)}>-
                                <i className="fa fa-minus"></i>
                            </button>
                            <button className="btn btn-outline-dark" onClick={()=> handleAdd(product)}>+
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            
<div class="container my-3">
		<table class="table table-light">
			<thead>
				<tr>
                    <th scope="col">Image</th>
					<th scope="col">Title</th>
					<th scope="col">Category</th>
					<th scope="col">Price</th>
					<th scope="col">Buy Now</th>
					<th scope="col">Cancel</th>
				</tr>
			</thead>
			<tbody>
			
				<tr>
					<td> <img src={product.image} alt={product.title} height="70px" width="70px" /></td>
					<td>{product.title}</td>
					<td>{product.category}</td>
                    <td>{product.price}</td>
					<td>
						<form>
						
							<div class="form-group d-flex justify-content-between">
								<a class="btn bnt-sm btn-incre" onClick={()=>handleDel(product)}><i class="fas fa-plus-square"></i>-</a> 
                                 <input type="text" name="quantity" class="form-control " style={{height:"40px" ,width:"100px"}}  value={product.qty} readonly /> 
								<a class="btn btn-sm btn-decre"  onClick={()=> handleAdd(product)}><i class="fas fa-minus-square"></i>+</a>
                                </div>  
                                <button type="submit" class="btn btn-primary btn-sm" style={{marginLeft:"90px",marginTop:"-13px"}}>Buy</button>
						</form>
					</td>
					<td><a class="btn btn-sm btn-danger" onClick={()=>handleRemove(product)} >Remove</a></td>
				</tr>

			
			</tbody>
		</table>
	</div>

            </>
        )

    }
    const buttons = () => {
        return(
            <>
                <div className="container">
                    <div className="row">
                        {/* <NavLink to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">
                            Proceed to Checkout
                        </NavLink> */}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            { state && state.length === 0 && emptyCart()}
            {state && state.length !== 0 && state.map(cartItems)}
            {state && state.length !== 0 && buttons()}
        </div>
    );
}

export default Cart;