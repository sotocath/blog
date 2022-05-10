import React, { useState, useContext } from "react";
import "./index.css";
import close from "./img/close.svg";
import icon from "./img/search.svg";
import { PostsCtx } from "../../context/PostsContext";
import { Link, useLocation } from "react-router-dom";



const Search = (props) => {
    
    const { text, setText, search } = useContext(PostsCtx)
    const [val, updateVal] = useState(text);
    const location = useLocation();
    const changeText = (e) => {
        updateVal(e.target.value);
        setText(e.target.value);
    };
    const clearText = function () {
        updateVal("");
        setText("");
    };
    const searchResults = search();

    return (
        <div className="search__form">
            <form>
                <input type="text" value={val} placeholder="Поиск" onInput={changeText} />
                <button className="search-btn" type="button">
                    {val ? <img className="close" src={close} onClick={clearText} /> : <img className="icon" src={icon} />}
                </button>
            </form>
            {text && searchResults.length && location.pathname!=="/" ?
            <div className="search__results">
                {searchResults.slice(0,5).map((el, i) => <Link key={i} onClick={clearText} to={"/posts/" + el._id} >{el.title}</Link>)}
                {searchResults.length>5 ? <Link to="/">Показать больше результатов...</Link> : ""}

            </div> : ""}
        </div>
    )
}

export default Search;