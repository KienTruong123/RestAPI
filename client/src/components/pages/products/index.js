import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem'
import Loading from '../utils/loading'

function Products(){
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products

//  return <div><Loading /></div>
    return (
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}/>
                })
            }
        </div>
    )
}

export default  Products