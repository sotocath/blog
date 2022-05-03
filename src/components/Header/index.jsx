import React,{useState , useContext} from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./index.css";
import Search from "../Search";
import { UserCtx } from "../../context/UserContext";



const Header = ({searchText, changeText}) => {
   const {user} = useContext(UserCtx);
    return(
        <header className="header">
            <Logo/>
            <Search text={searchText} foo={changeText}/>
            <nav>
             <Link to="/">Главная</Link>
             <Link to="/catalog">Каталог</Link>
             <Link to="/cart">Корзина</Link> 
             <Link to="/favorites" className="favorites" ></Link> 
             <Link to={user ? "/profile" : "/signin"}>Войти/Регистрация</Link>
            </nav>
        </header>
    )
}
export default Header;

