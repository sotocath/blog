import { createContext } from "react";

export const UserCtx = createContext({
    token: "",
    user: "",
    setToken: () => {},
    setUser: () => {}
});

export const UserValues={
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user") || "",
    setUser: (id) => {
        localStorage.setItem("user",id);
    }
}