import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../Api";
import likeTrue from "../accets/like_fill.svg";
import likeFalse from "../accets/like_stroke.svg";
import "./index.css";
import { FavCtx } from "../context/FavoritesContext";
import { UserCtx } from "../context/UserContext";
import authorImg from "../components/Logo/img/earth-asia-solid.svg";
import editImg from "../accets/pencil-solid.svg";

const Post = (props) => {
    let { id } = useParams();
    const { setFavorites } = useContext(FavCtx)
    const { user } = useContext(UserCtx);
    const [like, setLike] = useState(false);
    const [post, setPost] = useState({});

    const [comments, setComments] = useState([]);
    const [newComm, setNewComm] = useState("");
    useEffect(() => {
        api.getPost(id).then(data => {
            console.log(data)
            setLike(data.likes.includes(user));
            setPost(data);
        });
        api.getPostComments(id).then(data => {
            setComments(data);
        });
    }, [])

    const likeHandler = (e) => {
        console.log(props);
        e.stopPropagation();
        setLike(!like);
        api.setPostLike(id, like)
            .then(ans => {
                console.log(ans);
                setFavorites(ans);
            });
    }
    const formatDate = (dateString) => {
        if (!dateString) {
            return "";
        }

        return (new Date(dateString)).toLocaleDateString();
    }
    const formatNewLine = (str) => {
        if (!str) {
            return "";
        }

        return str.split("\n").map((s, i) => <p key={i}>{s || <br />}</p>);
    }
    const addCommentHandler = (e) => {
        e.preventDefault();
        api.addPostComment(id, { "text": newComm })
            .then(ans => {
                api.getPostComments(id).then(data => {
                    setComments(data);
                    setNewComm("");
                });
            })
    }


    let st = {
        backgroundImage: `url(${post.image})`
    };

    return (

        <div className="singlPost-container">
            <div className="post__edit">
                <Link to={`/posts/${id}/edit`}>
                    <img src={editImg} width="20px" height="20px" />
                </Link>
            </div>
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
                <div className="text_post">{formatNewLine(post.text)}</div>
                {<img className="post__like" src={like ? likeTrue : likeFalse} onClick={likeHandler} />}
                <span className="post__likes">{(post.likes || []).length}</span>
            </div>

            <div className="comms">
                <h4>Комментарии</h4>
                {comments.map(el => <div className="single__comms" key={el._id}><div className="comms__author">
                    <div className="comms__avatar"><img src={el.author.avatar || authorImg} /></div>{el.author.name}
                </div>
                    {formatNewLine(el.text)}</div>)}
            </div>
            <div >
                <form className="comms__form" onSubmit={addCommentHandler}>
                    <textarea value={newComm} required onInput={e => setNewComm(e.target.value)}>

                    </textarea>
                    <button className="button comms__submit" type="submit">Добавить комментарий</button>
                </form>
            </div>
        </div>





    )
};
export default Post;