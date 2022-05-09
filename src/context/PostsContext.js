import { createContext } from "react";

export const PostsCtx = createContext({
    posts: [],
    text: "",
    setText: () => {},
    setPosts: () => {},
    search: ()=>{}
});
