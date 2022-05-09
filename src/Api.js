const resHandler = res => {
    // console.log(res);
    return res.ok ? res.json() : res.statusText;
    
}

class Api {
    constructor({ path, token }) {
        this.path = path;
        this.token = token;
    }
    getPostsList() {
        return fetch(`${this.path}/posts`, {
            method:"get",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            method:"get",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    addPost(body){
        return fetch(`${this.path}/posts`, {
            method: "post",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    editPost(id, body){
        return fetch(`${this.path}/posts/${id}`, {
            method: "patch",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    deletePost(id){
        return fetch(`${this.path}/posts/${id}`, {
            method: "delete",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    

    getPostComments(id) {
        return fetch(`${this.path}/posts/comments/${id}`, {
            method:"get",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    addPostComment(id, body){
        return fetch(`${this.path}/posts/comments/${id}`, {
            method: "post",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    setPostLike(id,isLike){
        return fetch(`${this.path}/posts/likes/${id}`, {
            method: isLike ? "delete" : "put",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    signup(body){
        return fetch(`${this.path}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resHandler);
    }
    login(body){
        return fetch(`${this.path}/signin`, {
            method: "post",
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
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac"
}
const api = new Api(config);

export default api;