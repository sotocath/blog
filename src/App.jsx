import React, { useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { UserCtx, UserValues } from "./context/UserContext";
import { FavCtx } from "./context/FavoritesContext";

// import Home from "./pages/Home";
// import Catalog from "./pages/Catalog";
// import Cart from "./pages/Cart";

const App = () => {
    const [searchText, changeText] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [favorites, updFav] = useState([]);

    const userHandler = (id) =>{
        setUser(id);
        localStorage.setItem("user",id);
    }
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const tokenHandler = (data) =>{
        setToken(data);
        localStorage.setItem("token", data);
    }
    const setFavorites = (obj) =>{
         if(obj.likes.includes(user)){
             if(!favorites.includes(el => el._id === obj._id)){
                 updFav([...favorites,obj]);
             }
         }else{
             updFav(favorites.filter(el => el._id !== obj._id));
         }
    }

    return (
        <FavCtx.Provider value={{favorites: favorites, setFavorites: setFavorites}}>
        <UserCtx.Provider value={{token: token, user: user, setToken: tokenHandler, setUser: userHandler}}>
            <div className='container'>
                <Header searchText={searchText} changeText={changeText} likes={favorites.length}/>

                <Main search={searchText} updFav={updFav}/>
                <Footer />
            </div>
        </UserCtx.Provider>
        </FavCtx.Provider>

    )
}

export default App;
