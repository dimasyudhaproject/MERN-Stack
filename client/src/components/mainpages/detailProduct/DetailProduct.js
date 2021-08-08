import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images} alt="" />
                <div className="box-detail">
                <h3 style={{fontSize: "25px"}}>{detailProduct.title}</h3> <br />
                <div className="row">
                    <h5 style={{fontSize: "14px"}}>Product ID: {detailProduct.product_id}</h5>
                    <h5 style={{fontSize: "14px"}}>Price: ${detailProduct.price}</h5>
                    <h5 style={{fontSize: "14px"}}>Already Sold: {detailProduct.sold}</h5>
                    <h5 style={{fontSize: "14px"}}>Category: {detailProduct.category}</h5>
                </div>
                    <p style={{textAlign: "justify", fontSize: "15px"}}>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        CHECKOUT
                    </Link>
                </div>
            </div>

            <div>
                <h2>RELATED PRODUCTS</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
