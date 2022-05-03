import React from "react";
import "./index.css";
import { Routes, Route} from "react-router-dom";
import Home from "../../pages/Home";
import Catalog from "../../pages/Catalog";
import Cart from "../../pages/Cart";
import Post from "../../pages/Post";
import Favorites from "../../pages/Favorites";
import Profile from "../../pages/Profile";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";



const Main =({search, setCnt}) =>{
    
    return (
        <main>
            
            <Routes>
            <Route path="/catalog" element={<Home/>}/>
            <Route path="/" element={<Catalog searchText={search} setCnt={setCnt}  />}
            />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/posts/:id" element={<Post/>}></Route>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </main>
    )
}

export default Main;