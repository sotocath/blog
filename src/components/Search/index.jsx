import React, { useState, useContext } from "react";
import "./index.css";
import close from "./img/close.svg";
import icon from "./img/search.svg";
import { PostsCtx } from "../../context/PostsContext";
import { Link } from "react-router-dom";



const Search = (props) => {
    
    const { text, setText, search } = useContext(PostsCtx)
    const [val, updateVal] = useState(text);
    const changeText = (e) => {
        updateVal(e.target.value);
        setText(e.target.value);
    };
    const clearText = function () {
        updateVal("");
        setText("");
    };
    return (
        <div className="search__form">
            <form>
                <input type="text" value={val} placeholder="Поиск" onInput={changeText} />
                <button className="search-btn" type="button">
                    {val ? <img className="close" src={close} onClick={clearText} /> : <img className="icon" src={icon} />}
                </button>
            </form>
            {text && search().length ?
            <div className="search__results">
                {search().map((el, i) => <Link key={i} to={"/posts/" + el._id}>{el.title}</Link>)}

            </div> : ""}
        </div>
    )
}

export default Search;