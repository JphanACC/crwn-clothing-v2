import React, { useContext, useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'
const Category = () => {
    //we know 'category' from shop.component where path is defined
    const { category } = useParams();

    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]) //always and ONLY trigger useEffect whenever the states of category and categoriesMap change.
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&
                    products.map(product => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
    )
}

export default Category;