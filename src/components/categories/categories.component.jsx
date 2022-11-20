import CategoryItem from "../category-item/category-item.component";
import "./categories.style.scss"


function Categories({categories}){ 
      return (
        <div className='categories-section'>
          {categories.map((category)=>{
            return(
              <CategoryItem key={category.id} category={category}/>
            );
          })}
        </div>
      );
}

export default Categories;
