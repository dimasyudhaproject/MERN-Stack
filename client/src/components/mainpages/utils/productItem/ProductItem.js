import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images} alt="" />

            <div className="product_box">
                <h2 style={{fontSize: "15px"}}>{product.title}</h2>
                <span>Price: ${product.price}</span> <br />
                <p><span>Category: {product.category}</span></p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem
