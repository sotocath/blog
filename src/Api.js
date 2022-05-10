const resHandler = res => {
    return res.ok ? res.json() : res.statusText;
    
}

class Api {
    constructor({ path, token }) {
        this.path = path;
        this.token = token;
    }
    getPostsList() {
        return fetch(`${this.path}/posts`, {
            method:"GET",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            method:"GET",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    addPost(body){
        return fetch(`${this.path}/posts`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    editPost(id, body){
        return fetch(`${this.path}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    deletePost(id){
        return fetch(`${this.path}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    

    getPostComments(id) {
        return fetch(`${this.path}/posts/comments/${id}`, {
            method:"GET",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    addPostComment(id, body){
        return fetch(`${this.path}/posts/comments/${id}`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    deletePostComment(postId,commentId){
        return fetch(`${this.path}/posts/comments/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    setPostLike(id,isLike){
        return fetch(`${this.path}/posts/likes/${id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    signup(body){
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    getAboutMe(){
        return fetch(`${this.path}/users/me`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    editAboutMe( body){
        return fetch(`${this.path}/users/me`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    editMyAvatar( body){
        return fetch(`${this.path}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    login(body){
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
}
const config = {
    path: "https://api.react-learning.ru",
    token: localStorage.getItem("token")
}
const api = new Api(config);

export default api;