import { useContext, Fragment } from 'react'

import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component';

//import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
            {/* <div className='categories-container'>
                THIS IS NO LONGER AN ARRAY
                {categories.map((product) => (
                <ProductCard
                    key={product.id} 
                    product={product}
                />
                ))}
            </div> */}
        </Fragment>

    )
}

export default CategoriesPreview;
