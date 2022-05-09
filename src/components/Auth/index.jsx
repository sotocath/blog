import React, {useState, useContext} from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api";
import { UserCtx } from "../../context/UserContext";


export default ({login}) =>{
    const [val, changeVal]= useState("");
    const [pwd, changePwd]= useState("");
    const {setUser, setToken} = useContext(UserCtx);
    const nav = useNavigate()
    const handler = (e) =>{
        e.preventDefault();
        if(login){
            api.login({email: val, password: pwd}).then(ans=>{
                console.log(ans);
                if(ans.data){
                    setUser(ans.data._id);
                    setToken(ans.token)
                }
                nav("/");  
            })
        }else{
            api.signup({email: val, password: pwd}).then(ans=>{
                // if(ans._id || ans.err.statusCode === 409){

                //     console.log(ans);
                    nav("/signin");
                // }
               
        })
    }
}
       
    return(
    <div>
        
        <form  className="auth" onSubmit={handler}>
        <h1>{login ? "Вход" : "Регистрация"}</h1>
            <input type="email" placeholder="@mail" name="email" value={val} required onInput={e => changeVal(e.target.value)}/>
            <input type="password" placeholder="password" name="password" value={pwd} required onInput={e => changePwd(e.target.value)}/>
            <button className="button" type="submit">{login ? "Войти" : "Зарегистрироваться"}</button>
            <Link to={login ? "/signup" : "/signin"}><button className="button" type="button">{login ? "Регистрация" : "Войти"}</button></Link>
        </form>
    </div>
    )
}