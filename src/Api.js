class Api {
    constructor({path, token}){
        this.path = path;
        this.token = token;
    }
    getArticleList(){
      fetch(`${this.path}/products`, {
          headers: {
              "authorization": `Bearer ${this.token}`
          }
      })
    }
    getArticle(){

    }
}