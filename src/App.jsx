import React,{useState} from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";


// import Home from "./pages/Home";
// import Catalog from "./pages/Catalog";
// import Cart from "./pages/Cart";

const App = () => {
    const [searchText, changeText] = useState("");
    const [searchCnt] = useState(0)
    return (
        <div className='container'>
        <Header searchText={searchText} changeText={changeText}/>
        
        <Main search={searchText} />
        <Footer/>
        </div>

    )
}

export default App;
