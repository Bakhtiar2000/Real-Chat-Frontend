import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Navbar from "../components/Navbar";

const MainLayout = () => {

    return (
        <div>
            {/* <Navbar /> */}
            <Outlet />
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
