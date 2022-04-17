import React,{useState} from "react";
import "./index.css";
import close from "./img/close.svg";
import icon from "./img/search.svg"



const Search = (props) => {
    const[val, updateVal] = useState(props.text);
    const changeText=(e) =>{
        updateVal(e.target.value);
        props.foo(e.target.value);
    };
    const clearText = function(){
        updateVal("");
        props.foo("");
    };
    return (
        <form>
            <input type="text" value={val}  placeholder="Поиск" onInput={changeText}/>
           <button className="search-btn" type="button">
               {val ? <img className="close" src={close} onClick={clearText}/> : <img className="icon" src={icon}/>}
           </button>
        </form>
    )
}

export default Search;