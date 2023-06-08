import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoutes = () => {
    

    //Se sabe que se ha iniciado sesión porque tenemos un token guardado en localStorage

    const token = localStorage.getItem("token");

    if( token ){
        return <Outlet/>
    }else{
        return <Navigate to="/login"/>
    }

};

export default ProtectedRoutes;