import React,{useState, useEffect, useContext} from "react";

import api from "../Api";
import Card from "../components/Card";
import { FavCtx } from "../context/FavoritesContext";


const Catalog =({searchText, updFav}) => {
    // const cards = data.filter( el => el.name.toLowerCase().includes(searchText.toLowerCase()));
    const [cards, updCards] = useState([]);
    const[post, updPosts] = useState(cards);
    const {setFavorites} = useContext(FavCtx);
    useEffect(() =>{
        let token = localStorage.getItem("token");
        if (token){
            api.token = token;
        }
        let user = localStorage.getItem("user");
        // if(!cards.length){
            api.getPostsList().then(posts =>{
                console.log(posts);
                updCards(posts);
                updFav(posts.filter(el=> el.likes.includes(user)))
                updPosts(posts);
                
            });
        // }
        if(cards){
            console.log(searchText);
            updPosts(cards.filter( el => el.title.toLowerCase().includes(searchText.toLowerCase())));

        }
    },[]);
    
    return(
        <>
        <h1>Каталог</h1>
        {searchText && <div className="searchItem">По запросу <strong>{searchText}</strong> найдено {post.length} статей</div>}
        
        <div className="cards-container">
                {post.map(el => 
                // <Link to={"/posts/"+el._id} key={el._id}> 
                <Card text={el.title} key={el._id} pic={el.image} author={(el.author || {}).name || ""} id={el._id} likes={el.likes}/>
               
                // </Link>
                )}
            </div>
        </>
    )
}
export default Catalog;