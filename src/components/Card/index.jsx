import React, { useState } from "react";
import "./index.css";
import pic from "./img/earth-asia-solid.svg";
import img from "./img/pngwing.png";
import likeTrue from "../../accets/like_fill.svg";
import likeFalse from "../../accets/like_stroke.svg";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    let st = {
        backgroundImage: `url(${props.pic || pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff",
        marginBottom: "15px",
        marginTop: "15px"
    };

    const [like, setLike] = useState(false);
    const navigate = useNavigate();
    const likeHandler = (e) => {
        e.stopPropagation();
        setLike(!like)
    }
    const replaceHandler = (e) => {
        navigate(`/posts/${props.id}`);
    }
    return (
        <div className="card" onClick={replaceHandler}>
            <img className="img__wing" src={img} />
            <div className="card__img" style={st}></div>
            <div className="name__avtor card__title">{props.text}</div>
            <div className="card__text card__title">{props.author}</div>
            <img className="card__like" src={like ? likeTrue : likeFalse} onClick={likeHandler} />
        </div>
    )
}
export default Card;