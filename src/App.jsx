import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { UserCtx, UserValues } from "./context/UserContext";
import { FavCtx } from "./context/FavoritesContext";
import { PostsCtx } from "./context/PostsContext";
import api from "./Api";


const App = () => {
    const [searchText, changeText] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [favorites, updFav] = useState([]);
    const [posts, setPosts] = useState([]);


    
    useEffect(()=>{
        api.getPostsList().then(posts => {
            updFav(posts.filter(el => el.likes.includes(user)))
            setPosts(posts);
    
        });
    }, [])

    const userHandler = (id) => {
        setUser(id);
        localStorage.setItem("user", id);
    }
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const tokenHandler = (data) => {
        setToken(data);
        localStorage.setItem("token", data);
    }
    const setFavorites = (obj) => {
        if (obj.likes.includes(user)) {
            if (!favorites.includes(el => el._id === obj._id)) {
                updFav([...favorites, obj]);
            }
        } else {
            updFav(favorites.filter(el => el._id !== obj._id));
        }
    }

    const searchHandler = () =>{
       return posts.filter( el => el.title.toLowerCase().includes(searchText.toLowerCase()));
        
    }

    return (
        <FavCtx.Provider value={{ favorites: favorites, setFavorites: setFavorites }}>
            <UserCtx.Provider value={{ token: token, user: user, setToken: tokenHandler, setUser: userHandler }}>
                <PostsCtx.Provider value={{
                     posts: posts,
                     text: searchText,
                     setText: changeText,
                     setPosts: setPosts,
                     search: searchHandler
                }}>
                <div className='container'>
                    <Header  likes={favorites.length} />

                    <Main />
                    <Footer />
                </div>
                </PostsCtx.Provider>
            </UserCtx.Provider>
        </FavCtx.Provider>

    )
}

export default App;
