import React, { useState, useEffect, useContext } from "react";

import api from "../Api";
import Card from "../components/Card";
import { usePagination } from "../Hooks/hooks";
import { PostsCtx } from "../context/PostsContext";


const Catalog = () => {
    const{ text,search }=useContext(PostsCtx);
    const dataPag = usePagination(search(), 9);
    const [page, setPage] = useState(1);
    function changePage(e){
        setPage(e);
        dataPag.jump(e);
    }


    function setPagination(n, curPage) {
        const visiblePages = 3;
        let arr = [];
        if (n === 0) {
            return [];
        }

        arr.push(<div className="page-numbers" key="first" onClick={() => changePage(1)}>&laquo;</div>);
        arr.push(<div className="page-numbers" key="previous" onClick={() => changePage((curPage - 1) < 1 ? 1 : (curPage - 1))}>&lt;</div>);

         
        let startPage = curPage - visiblePages - 1;
        if (startPage < 0) {
            startPage = 0;
            
        }
        
        let endPage = curPage + visiblePages;
        if (endPage >= n) {
            endPage = n;
        }
        
        let diff = endPage - startPage;
        if (diff < visiblePages * 2 + 1) {
            if (startPage === 0) {
                endPage = Math.min(n, endPage + visiblePages * 2 + 1 - diff);
            }

            if (endPage === n) {
                startPage = Math.max(0, startPage - visiblePages * 2 + 1 - diff);
            }
        }

        for (let i = startPage; i < endPage; i++) {
            arr.push(<div key={i} className={i===curPage-1 ? "page-numbers current" : "page-numbers"} onClick={() => changePage(i + 1)}>{i + 1}</div>);
        }

        arr.push(<div className="page-numbers" key="next" onClick={() => changePage((curPage + 1) > n ? n : (curPage + 1))}>&gt;</div>);
        arr.push(<div className="page-numbers" key="last" onClick={() => changePage(n)}>&raquo;</div>);
       

        return arr;
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            api.token = token;
        }
        let user = localStorage.getItem("user");
     
    }, []);
    const getWord = (n, w1, w2, w0) => {
        if (n % 100 < 11 || n % 100 > 14) {
            if (n % 10 === 1) {
                return w1;
            } else if (n % 10 >= 2 && n % 10 <= 4) {
                return w2;
            } else {
                return w0;
            }
        } else {
            return w0;
        }
    }

    return (
        <>
            <h1>Все посты</h1>
            {text && <div className="searchItem">По запросу <strong>{text}</strong> найдено {search().length} {getWord(search().length, "статья","статьи","статей")} </div>}
            <div className="page-container">
                {setPagination(dataPag.maxPage, page)}
            </div>
           
            <div className="cards-container">
                {dataPag.current().map(el =>
                    <Card text={el.title} key={el._id} pic={el.image} author={(el.author || {}).name || ""} id={el._id} likes={el.likes} />
                )}
            </div>
        </>
    )
}
export default Catalog;