import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

const MainLayout = () => {

    console.log("Inside Main Layout")
    return (
        <div>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
