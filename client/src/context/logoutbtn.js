import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const logoutbutton = () =>{
    const {logout} = useContext(AuthContext);
    return <button onClick={logout}>logout</button>
};