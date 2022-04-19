import React,{useState, useEffect} from "react";

import api from "../Api";
import Card from "../components/Card";
import {Link} from "react-router-dom";

const Catalog =({searchText}) => {
    // const cards = data.filter( el => el.name.toLowerCase().includes(searchText.toLowerCase()));
    const [cards, updCards] = useState([]);
    const[post, updPosts] = useState(cards);
    useEffect(() =>{
        if(!cards.length){
            api.getPostsList().then(posts =>{
                console.log(posts);
                updCards(posts);
                updPosts(posts);
            });
        }
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
                {post.map(el => <Link to={"/posts/"+el._id} key={el._id}> <Card text={el.title} key={el._id} pic={el.image} author={(el.author || {}).name || ""}/></Link>)}
            </div>
        </>
    )
}
export default Catalog;