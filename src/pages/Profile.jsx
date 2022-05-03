import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserCtx } from "../context/UserContext";


export default () =>{
    const nav = useNavigate();
    const {setToken, setUser}= useContext(UserCtx);
    const st = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
    const logout = (e) =>{
        setToken("");
        setUser("");
        nav("/")

    }

    return(
    <div style={st}>
        <h1>Личный кабинет</h1>
        <button className="logout" onClick={logout}>Выйти</button>
    </div>
    )
}
