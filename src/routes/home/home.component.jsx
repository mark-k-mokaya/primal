import Categories from "../../components/categories/categories.component";
import { Outlet } from "react-router-dom";


function Home(){
    const categories = [
        {id: 1, title: "Men", imgUrl:"/men.webp"},
        {id: 2, title: "Women", imgUrl:"/women.webp"},
        {id: 3, title: "Equipment", imgUrl:"/equipment.jpg"},
    ];
    return(
        <div>
            <Outlet />
            <Categories categories={categories}/>
        </div>
        
    );
}

export default Home;