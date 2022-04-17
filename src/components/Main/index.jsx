import React from "react";
import "./index.css";
import Card from "../Card";
import data from "../../data.json"

const Main =({search, setCnt}) =>{
    const cards = data.filter( el => el.name.toLowerCase().includes(search.toLowerCase()));
    setCnt(cards.length);
    return (
        <main>
            <div className="cards-container">
                {cards.map(el => <Card text={el.name} key={el.id} pic={el.picture} author={el.author}/>)}
            </div>
        </main>
    )
}

export default Main;