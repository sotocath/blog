import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api";
import { UserCtx } from "../context/UserContext";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const {user} = useContext(UserCtx);
    const handler = (e) => {
        e.preventDefault();
        if (id) {
            api.editPost(id, {
                title: title,
                text: content,
                image: img,
                tags: []
            }).then(ans => {
                navigate(`/posts/${ans._id}`);
            })
        } else {
            api.addPost({
                title: title,
                text: content,
                image: img,
                tags: []
            }).then(ans => {
                navigate(`/posts/${ans._id}`);
            })
        }
    }
    const handleDelete = () => {
        api.deletePost(id)
            .then(ans => {
                navigate(`/`);
            })
    }

    useEffect(() => {
        if (id) {
            api.getPost(id).then(data => {
                if(data.author._id!==user){
                    navigate(`/posts/${id}`);
                    return;
                }
                setTitle(data.title || "");
                setImg(data.image || "");
                setContent(data.text || "")
            });
        }
    }, [])


    return (
        <>
            {id ? <h1>Редактирование поста</h1> : <h1>Добавление нового поста</h1>}
            <form className="add__post" onSubmit={handler}>
                <label>Добавить название поста</label>
                <input type="text" placeholder="название поста" name="text" value={title} required onInput={e => setTitle(e.target.value)} />
                <label>Добавить ссылку на картинку</label>
                <input type="text" placeholder="ссылка на картинку" name="image" value={img} required onInput={e => setImg(e.target.value)} />
                <label>Добавить текст поста</label>
                <textarea name="content" placeholder="текст поста" value={content} required onInput={e => setContent(e.target.value)}></textarea>
                <div className="buttons">
                    <div className="buttons__edit">
                    <button className="button" type="submit">Сохранить</button>
                    <button className="button" type="button" onClick={() => navigate(id ? `/posts/${id}` : "/")}>Отменить</button>
                    </div>
                    
                    {id ? <button className="button danger" type="button" onClick={handleDelete}>Удалить</button> : ""}
                </div>

            </form>
        </>
    )
}
export default AddPost;