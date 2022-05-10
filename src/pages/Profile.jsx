import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCtx } from "../context/UserContext";
import api from "../Api";


export default () => {
    const nav = useNavigate();
    const { setToken, setUser } = useContext(UserCtx);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [currentProfile, setCurrentProfile] = useState({});

    const st = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
    const logout = (e) => {
        setToken("");
        setUser("");
        nav("/")

    }
    useEffect(() => {
        api.getAboutMe().then(data => {
            setName(data.name);
            setAbout(data.about);
            setAvatar(data.avatar);
            setEmail(data.email);
            setCurrentProfile({
                name: data.name,
                about: data.about,
                avatar: data.avatar
            });
        });
    }, [])
    const handler = (e) => {
        e.preventDefault();
        Promise.all([
            api.editAboutMe({ name: name, about: about }),
            api.editMyAvatar({ avatar: avatar })
        ])
            .then(() => {
                setCurrentProfile({
                    name: name,
                    about: about,
                    avatar: avatar
                });
            });
    }

    const cancelEdit = () => {
        setName(currentProfile.name);
        setAbout(currentProfile.about);
        setAvatar(currentProfile.avatar);
    }



    return (
        <>
            <h1>Личный кабинет</h1>
            <div style={st}>

                <form className="profile__form" onSubmit={handler}>
                    <label>Электронная почта</label>
                    <input type="text" value={email} readOnly />
                    <label>Ваше имя</label>
                    <input type="text" placeholder="имя" value={name} required onInput={e => setName(e.target.value)} />
                    <label>О себе</label>
                    <input type="text" placeholder="расскажите о себе в 2-х словах" value={about} required onInput={e => setAbout(e.target.value)} />
                    <label>Добавьте ссылку на аватар</label>
                    <input type="text" placeholder="ссылка на ваш аватар" value={avatar} required onInput={e => setAvatar(e.target.value)} />

                    <div className="buttons">
                        <div className="buttons__edit">
                            <button className="button" type="submit">Сохранить</button>
                            <button className="button" type="button" onClick={cancelEdit}>Отменить</button>
                        </div>
                        <button className="logout" onClick={logout}>Выйти</button>
                    </div>

                </form>

            </div>
        </>
    )
}
