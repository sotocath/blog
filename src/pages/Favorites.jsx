import React, {useContext} from "react";
import { FavCtx } from "../context/FavoritesContext";
import Card from "../components/Card";


export default () =>{
    const {favorites}= useContext(FavCtx)
    return(
    <div>
        <h1>Избранное</h1>
        <div className="cards-container">
            {favorites.map(el => <Card key={el._id} pic={el.image} author={(el.author || {}).name || ""} id={el._id} likes={el.likes}/>)}
        </div>
    </div>
    )
}