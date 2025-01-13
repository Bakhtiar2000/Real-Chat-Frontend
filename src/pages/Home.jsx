

// import Sidebar from "../components/Sidebar";
// import ChatContainer from "../components/ChatContainer";
// import NoChatSelected from "../components/NoChatSelected";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
    // const { selectedUser } = useChatStore();
    const user = useAppSelector(useCurrentUser);
    console.log(user)

    return (
        <h2 className="text-center text-4xl mt-40">Hello</h2>
        // <div className="h-screen bg-base-200">
        //     <div className="flex items-center justify-center pt-20 px-4">
        //         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        //             <div className="flex h-full rounded-lg overflow-hidden">
        //                 <Sidebar />

        //                 {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
export default Home;
