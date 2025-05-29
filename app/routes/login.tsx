import { Checkbox } from "@heroui/react";
import { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "~/components/image/logo.jpg";
import login from "~/controllers/users";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const actionData = useActionData<any>();
    const isSubmitting = navigation.state === "submitting";
    useEffect(() => {
        if (actionData) {
            setEmailError(actionData.emailErrorMessage || "");
            setPasswordError(actionData.passwordErrorMessage || "");
        }
    }, [actionData]);

    return (
        <div className="bg-gray-50/20 dark:dark-bg w-full h-[100vh] lg:h-[100vh] flex items-center justify-center">
            <div className="p-20 rounded-lg">
                <div className="flex flex-col justify-center items-center w-full gap-6">
                    <img className="h-10 w-10" src={logo} alt="Logo" />
                    <h5 className="font-nunito dark:dark-text text-2xl font-semibold">Welcome Back</h5>
                </div>
                <Form
                    className="mt-6 flex flex-col gap-6"
                    method="post"
                >
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md w-80 font-medium text-light-text dark:dark-text font-nunito "
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500/40 focus:outline-none focus:ring-1 focus:ring-pink-500/20 dark:bg-[#111111] dark:border dark:border-[#333333] placeholder:text-sm shadow-md"
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block w-80 text-md font-medium text-light-text dark:dark-text font-nunito"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500/40 focus:outline-none focus:ring-1 focus:ring-pink-500/20 dark:bg-[#111111] dark:border dark:border-[#333333] placeholder:text-sm"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                   
                    <div>
                        <button
                            disabled={navigation.state !== "idle"}
                            type="submit"
                            className="mt-1 block w-full rounded-md px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 font-montserrat focus:outline-none bg-pink-500 text-white focus:ring-1 focus:ring-pink-500"
                        >
                            {navigation.state === "idle" ? "Login" : "Logging in..."}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe");

    const signin = await login.Logins({ request, email, password, rememberMe });

    return signin;
    
};