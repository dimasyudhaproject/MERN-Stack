import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category.name} key={category.name}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="What are you looking for..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <select value={'sort=-sold'} onChange={e => setSort(e.target.value)} >
                    <option value='sort=-sold'>Popular</option>
                    <option value=''>Newest</option>
                    <option value='sort=-price'>Price: Hightest</option>
                    <option value='sort=price'>Price: Lowest</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
