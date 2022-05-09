import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../Api";
import likeTrue from "../accets/like_fill.svg";
import likeFalse from "../accets/like_stroke.svg";
import "./index.css";
import { FavCtx } from "../context/FavoritesContext";
import { UserCtx } from "../context/UserContext";
import authorImg from "../components/Logo/img/earth-asia-solid.svg";

const Post = (props) => {
    let { id } = useParams();
    const { setFavorites } = useContext(FavCtx)
    const { user } = useContext(UserCtx);
    const [like, setLike] = useState(false);

    const [name, setName] = useState("Пост");
    const [post, setPost] = useState({});

    const [comments, setComments] = useState([])
    useEffect(() => {
        api.getPost(id).then(data => {
            console.log(data)
            setLike(data.likes.includes(user));
            setPost(data);
        });
        api.getPostComments(id).then(data => {
            setComments(data);
            console.log(data);
            //             author: {name: 'Анна Cуфьянова new', about: 'happy developer', avatar: 'https://cdn1.ozone.ru/s3/multimedia-v/c1200/6220156051.jpg', _id: '6255a5f5947c7292d8c204fa', email: 'anna.sufi@mail.ru', …}
            // created_at: "2022-04-28T05:12:24.401Z"
            // post: "622bdaa406c7d323b8ae4626"
            // text: "Good morning!"
            // updated_at: "2022-04-28T05:12:24.401Z"
            // __v: 0
            // _id: "626a223826c0b7290658e601"

        });
    }, [])
    const likeHandler = (e) => {
        e.stopPropagation();
        setLike(!like);
        api.setPostLike(props.id, like)
            .then(ans => {
                console.log(ans);
                setFavorites(ans);
            });
    }
    const formatDate = (dateString) =>{
        if (!dateString) {
            return "";
        }

        return (new Date (dateString)).toLocaleDateString();
    }


    let st = {
        backgroundImage: `url(${post.image})`
    };

    return (

        <div className="singlPost-container">
            {post.image && <div className="pict" style={st}>
            </div>}

            <div className="postTitle">
                <div className="postTitle__author">
                    <div className="avatar">
                    <div className="post__avatar">< img src={post.author && post.author.avatar ? post.author.avatar : authorImg} />
                    </div>
                    <h2>{(post.author || {}).name || ""}</h2>
                    </div>
                    <p>{post.created_at === post.updated_at ? formatDate(post.created_at) : `отредактирован ${formatDate(post.updated_at)}`}</p>
                </div>
                <h1 className="postTitle__title">{post.title || "Название поста)"}</h1>
               
            </div>
            <div className="textBlock">
                <p className="text_post">{post.text}</p>
                {<img className="post__like" src={like ? likeTrue : likeFalse} onClick={likeHandler} />}
                <span className="post__likes">{(post.likes || []).length}</span>
            </div>

            <div className="comms">
                <h4>Комментарии</h4>
                {comments.map(el => <div className="single__comms" key={el._id}><div className="comms__author">
                    <div className="comms__avatar"><img src={el.author.avatar || authorImg} /></div>{el.author.name}
                    </div>
                     <p>{el.text}</p></div>)}
                </div>
                <div >
                    <form className="comms__form">
                        <textarea >

                        </textarea>
                        <button className="button comms__submit" type="submit">Добавить комментарий</button>
                    </form>
                </div>
            </div>





            )
};
            export default Post;