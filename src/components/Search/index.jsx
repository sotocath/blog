import React,{useState} from "react";
import "./index.css";




const Search = (props) => {
    const[val, updateVal] = useState(props.text);
    const changeText=(e) =>{
        updateVal(e.target.value);
        props.foo(e.target.value);
    }
    return (
        <form>
            <input type="text" value={val} onInput={changeText}/>
            <div>{val}</div>
        </form>
    )
}

export default Search;