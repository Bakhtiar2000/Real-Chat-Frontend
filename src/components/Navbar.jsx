import { Link } from "react-router-dom";
import { LogOut, MessageSquare } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrentUser, useSocket } from "../redux/features/auth/authSlice";
import { disconnectSocket } from "../socket/socket.api";
import toast from "react-hot-toast";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(useCurrentUser);
  const socket = useAppSelector(useSocket);

  const logoutUser = () => {
    try {
      dispatch(logout())
      toast.success("Logged out successfully");
      disconnectSocket(socket)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chat App</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {
              authUser &&
              <button className="flex gap-2 items-center" onClick={logoutUser}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            }
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
