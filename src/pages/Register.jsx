/* eslint-disable @typescript-eslint/no-explicit-any */
// import Spline from '@splinetool/react-spline';
import { Button, Row } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import UniForm from "../components/form/UniForm";
import FormInput from "../components/form/FormInput";
import { useRegisterUserMutation } from "../redux/features/user/user.api";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [registerUser] = useRegisterUserMutation();
    const onSubmit = async (data) => {
        console.log(data);
        const toastId = toast.loading("Registering Account");
        try {
            const res = await registerUser(data);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("User registered successfully!", { id: toastId });
                navigate(`/login`);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong", { id: toastId, duration: 2000 });
        }
    };
    return (
        <div className="md:h-[100vh] px-5 w-full max-h-screen flex flex-col-reverse md:flex-row justify-center items-center lg:gap-10 gap-6 duration-300">
            <div className="hidden sm:block w-40 sm:w-60 md:w-1/2 max-w-xl duration-300">
                <img src="https://img.freepik.com/free-vector/messages-concept-illustration_114360-583.jpg?t=st=1736643681~exp=1736647281~hmac=381771c159fb710a1b1e27de087c6b1b1ee803f34d6e88d7f8dced2483c28abc&w=826" alt="" />
            </div>

            <div className="mt-10">
                <h2 className="text-center text-2xl md:text-4xl text-black mb-5 md:mb-10 font-semibold">Register to Chat App</h2>
                <Row className="flex flex-col items-center" justify="center" align="middle">
                    <UniForm className="bg-[#E1E1E1] px-7 md:px-12 md py-5 md:py-8 rounded-lg shadow-lg md:shadow-2xl" onSubmit={onSubmit}>
                        <FormInput type="text" name="name" label="Name*" />
                        <FormInput type="text" name="email" label="Email*" />
                        <FormInput type="password" name="password" label="Password*" />
                        <FormInput type="text" name="img" label="Image Link" />
                        <p className="-mt-5 text-xs text-right mb-5">Already have an account? <span className="text-blue-500 hover:underline cursor-pointer"><Link to="/login">Login</Link></span></p>
                        <Button className="bg-[#375963] text-white" htmlType="submit">Register</Button>
                    </UniForm>
                </Row>
            </div>
        </div>

    );
};

export default Register;
