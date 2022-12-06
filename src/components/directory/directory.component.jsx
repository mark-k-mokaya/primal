import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.style.scss"

const categories = [
  {id: 1, title: "Men", imageUrl:"/men.webp", route: "shop/mens"},
  {id: 2, title: "Women", imageUrl:"/women.webp", route: "shop/womens"},
  {id: 3, title: "Equipment", imageUrl:"/equipment.jpg", route: "shop/equipment"},
];

function Directory(){ 
      return (
        <div className='categories-section'>
          {categories.map((category)=>{
            return(
              <DirectoryItem key={category.id} category={category}/>
            );
          })}
        </div>
      );
}

export default Directory;
