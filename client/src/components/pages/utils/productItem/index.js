import React from 'react'
import ButtonActions from './ButtonActions'
function ProductItem({product}) {

    return (
        <div className="product-card">
           <img src={product.images.url} alt='' />
           <div className="product-content">
                <h3 title={product.title}> {product.title}</h3>
                <span> ${product.price}</span>
                <p> {product.description}</p>
           </div>
           <ButtonActions product={product}/>
        </div>
    )
}

export default ProductItem