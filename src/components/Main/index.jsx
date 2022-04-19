import React from "react";
import "./index.css";
import { Routes, Route, Switch} from "react-router-dom";
import Home from "../../pages/Home";
import Catalog from "../../pages/Catalog";
import Cart from "../../pages/Cart";
import Post from "../../pages/Post"


const Main =({search, setCnt}) =>{
    
    return (
        <main>
            
            <Routes>
            <Route path="/catalog" element={<Home/>}/>
            <Route path="/" element={<Catalog searchText={search} setCnt={setCnt}  />}
            />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/posts/:id" element={<Post/>}></Route>
        </Routes>
        </main>
    )
}

export default Main;