import React from "react";
import Main from "../components/Main";

const Catalog =({searchText, setCnt, searchCnt}) => {
    return(
        <>
        <h1>Каталог</h1>
        {searchText && <div className="searchItem">По запросу <strong>{searchText}</strong> найдено {searchCnt} статей</div>}
        <Main search={searchText} setCnt={setCnt}/>
        </>
    )
}
export default Catalog;