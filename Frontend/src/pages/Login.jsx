import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const {email, password} = inputValue;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left"
        });
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const {data} =await axios.post(
                    "http://localhost:4000/login",
                    {
                        ...inputValue
                    },
                    {withCredentials: true}
                );
                console.log(data);
                const {success, message} = data;
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
                else {
                    handleError(message);
                }
            }
            catch (error) {
                console.log(error);
            }
            setInputValue ({
                ...inputValue,
                email: "",
                password: "",
            });
        };
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={handleOnChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handleOnChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
