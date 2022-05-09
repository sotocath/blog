import React, { useState, useEffect, useContext } from "react";

import api from "../Api";
import Card from "../components/Card";
import { FavCtx } from "../context/FavoritesContext";
import { usePagination } from "../Hooks/hooks";
import { PostsCtx } from "../context/PostsContext";


const Catalog = ({ updFav }) => {
    // const cards = 
    // const [cards, updCards] = useState([]);
    const{posts,text,search}=useContext(PostsCtx)
    // const [post, updPosts] = useState(cards);
    const { setFavorites } = useContext(FavCtx);
    const dataPag = usePagination(search(), 9);
    const [page, setPage] = useState(1);
    function changePage(e){
        setPage(e);
        dataPag.jump(e);
    }


    function setPagination(n, curPage) {
        const visiblePages = 3;
        let arr = [];

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
                endPage += visiblePages * 2 + 1 - diff;
            }

            if (endPage === n) {
                startPage -= visiblePages * 2 + 1 - diff;
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
        // if(!cards.length){
        // api.getPostsList().then(posts => {
        //     console.log(posts);
        //     updCards(posts);
        //     updFav(posts.filter(el => el.likes.includes(user)))
        //     updPosts(posts);

        // });
        // }
        // if (cards) {
            
        //     updPosts(cards.filter(el => el.title.toLowerCase().includes(searchText.toLowerCase())));

        // }
    }, []);

    return (
        <>
            <h1>Все посты</h1>
            {text && <div className="searchItem">По запросу <strong>{text}</strong> найдено {search().length} статей</div>}
            <div className="page-container">
                {setPagination(dataPag.maxPage, page)}
            </div>
           
            <div className="cards-container">
                {dataPag.current().map(el =>
                    // <Link to={"/posts/"+el._id} key={el._id}> 
                    <Card text={el.title} key={el._id} pic={el.image} author={(el.author || {}).name || ""} id={el._id} likes={el.likes} />

                    // </Link>
                )}
            </div>
        </>
    )
}
export default Catalog;