import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import api from "../Api";
import like from "../accets/like_fill.svg";

const Post =() => {
    let {id} = useParams();

    const [name, setName] = useState("Пост");
    const [post, setPost] = useState([]);
    useEffect(() => {
        api.getPost(id).then(data =>{
            console.log(data);
            setPost(data);
        })
    },[])
    

    let st ={
        backgroundImage:`url(${post.image})`
    };

    return(
        <>
        <div className="postTitle">
        <h1>{post.title || "Здесь должен быть пост)"}</h1>
        <h2>{(post.author || {}).name || ""}</h2>
        <img alt="Like" src={like} className="like" />
        <span className="likes">{(post.likes || []).length}</span>
        </div>
        <div className="postText">
        {/* <p>{id}</p> */}
        {post.image && <div className="pict" style={st}>
        </div>}
        
        <div className="textBlock">
        <p className="text_post">{post.text}</p>
       
        <h4>Комментарии</h4>
        <p className="comms">{(post.comments || []).map(el => <span key={el._id}>{el.author}: {el.text}<br /></span>)}</p>
        </div>
        </div>
       
        
        </>
    )
}
export default Post;