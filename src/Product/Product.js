import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { addCart } from '../redux/Action/action';
import { useDispatch,useSelector } from 'react-redux';
import  Navbar  from '../components/Navbar';
import Footer from '../components/Footer';




const Product = () => {
    const state=useSelector(state=>console.log(state))
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProduct();
    }, []);


    const addProduct = (product) => {
       const a= dispatch(addCart(product));
       console.log("check",a);
    }

    const Loading = () => {
        return(
            <> 
               
               <div className="col-md-6">
                    <Skeleton height={400}/>
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{marginLeft:6}} />
                </div>
            </>
        )
    };

    const ShowProduct = () => {
       
        return(
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} style={{height:"350px",width:"350px"}} />
                </div>
                <div className="col-md-6">
                    <div>
                    <h4>{product.category} </h4>
                    </div>
                    <div>
                    <h3 className="display-8">{product.title}</h3>
                    </div>
                    <div>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate} 
                        <i className="fa fa-star"></i>
                    </p>
                    </div>
                    <div>
                    <h3 className="display-7 fw-bold my-6">
                        $ {product.price}
                    </h3>
                    </div>
                    <div>
                    <p className="lead">{product.description}</p>
                    </div>
                    <div>
                
                    <button className="add" onClick={()=>addProduct(product)}>Add to Cart</button>
                    <NavLink to="/cart"><button className="buy">Go to Cart</button>
                    </NavLink>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div>
            <Navbar/> 
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Product;