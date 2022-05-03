import React, { useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { UserCtx, UserValues } from "./context/UserContext";


// import Home from "./pages/Home";
// import Catalog from "./pages/Catalog";
// import Cart from "./pages/Cart";

const App = () => {
    const [searchText, changeText] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user") || "");

    const userHandler = (id) =>{
        setUser(id);
        localStorage.setItem("user",id);
    }
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const tokenHandler = (data) =>{
        setToken(data);
        localStorage.setItem("token", data);
    }
    
    return (
        <UserCtx.Provider value={{token: token, user: user, setToken: tokenHandler, setUser: userHandler}}>
            <div className='container'>
                <Header searchText={searchText} changeText={changeText} />

                <Main search={searchText} />
                <Footer />
            </div>
        </UserCtx.Provider>

    )
}

export default App;
