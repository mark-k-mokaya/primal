import "./category-item.styles.scss"

function CategoryItem({category}){
    const {title, imgUrl} = category;
    return(
        <div className='category-item' style={{backgroundImage: `url(${imgUrl})`}}>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </div>
    );
}

export default CategoryItem;