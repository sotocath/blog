import React from "react";
import "./index.css";
import { Routes, Route} from "react-router-dom";
import Catalog from "../../pages/Catalog";
import AddPost from "../../pages/AddPost";
import Post from "../../pages/Post";
import Favorites from "../../pages/Favorites";
import Profile from "../../pages/Profile";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";



const Main =({ setCnt, updFav}) =>{
    
    return (
        <main>
            
            <Routes>
            {/* <Route path="/catalog" element={<Home/>}/> */}
            <Route path="/" element={<Catalog updFav={updFav}  setCnt={setCnt}  />}
            />
            <Route path="/posts/add" element={<AddPost/>}/>
            <Route path="/posts/:id" element={<Post />}></Route>
            <Route path="/posts/:id/edit" element={<AddPost/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </main>
    )
}

export default Main;