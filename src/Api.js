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
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(resHandler);
    }
    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
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
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac"
}
const api = new Api(config);

export default api;