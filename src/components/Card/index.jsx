import React from "react";
import "./index.css";

const Card =(props) =>{
    let st ={
        backgroundImage:`url(${props.pic})`,
        backgroundSize: "contain",
        backgroundPosition:"center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff"
    };
    return(
        <div className="card">
        <div className="card__img" style={st}></div>
        <div className="name__avtor">{props.author}</div>
        <div className="card__text">{props.text}</div>
        </div>
    )
}
export default Card;