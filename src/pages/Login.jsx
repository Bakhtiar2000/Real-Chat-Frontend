/* eslint-disable @typescript-eslint/no-explicit-any */
// import Spline from '@splinetool/react-spline';
import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import UniForm from "../components/form/UniForm";
import FormInput from "../components/form/FormInput";
import { connectSocket } from "../socket/socket.api";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const defaultValues = {
        email: "rakib@gmail.com",
        password: "12345"
    }

    const [login] = useLoginMutation();
    const onSubmit = async (data) => {
        console.log(data);
        const loginToastId = toast.loading("Logging In");

        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.accessToken);
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            connectSocket()
            toast.success("logged In", { id: loginToastId, duration: 2000 });
            navigate(`/`);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong", { id: loginToastId, duration: 2000 });
        }
    };
    return (
        <div className="relative w-full h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('https://img.freepik.com/premium-vector/people-addicted-cellphones_140689-5297.jpg?w=1380')",
                }}
            ></div>

            <div className="absolute inset-0 bg-black opacity-10"></div>

            <div className="relative flex justify-center items-center pt-10">

                <Row className="flex flex-col items-center" justify="center" align="middle">
                    <UniForm className="bg-transparent/5 px-12 md py-8 rounded-lg shadow-2xl" onSubmit={onSubmit} defaultValues={defaultValues}>
                        <h2 className="text-center text-2xl text-black mb-5 font-semibold">Login to Chat App</h2>
                        <FormInput type="text" name="email" label="Email" />
                        <FormInput type="password" name="password" label="Password" />
                        <p className="-mt-5 text-xs text-right mb-5">Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer"><Link to="/register">Sign up</Link></span></p>
                        <Button className="bg-[#375963] text-white" htmlType="submit">Login</Button>
                    </UniForm>
                </Row>
            </div>
        </div>

    );
};

export default Login;
