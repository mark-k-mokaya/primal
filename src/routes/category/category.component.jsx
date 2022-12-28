import './category.styles.scss';
import {useParams} from 'react-router-dom';
import {Fragment, useEffect, useState} from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from "../../components/spinner/spinner.component";

import { useSelector } from 'react-redux';
import {selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

function Category(){
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
            
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? 
                <Spinner/> :
                <div className='category-container'>
                    {products && products.map((product)=><ProductCard key={product.id} product={product}/>)}
                </div>
            } 
        </Fragment>  
    ); 
}

export default Category;