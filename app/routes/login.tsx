import { useNavigate, useNavigation } from "@remix-run/react";
import axios from "axios";
import { useState } from "react";
import logo from "~/components/image/logo.jpg";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        try {
            const res = await axios.post(
                "https://cstsapi.vercel.app/auth",
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    // withCredentials: true
                }
            );
            navigate("/admin");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="bg-gray-50/20 dark:dark-bg w-full h-[100vh] lg:h-[100vh] flex items-center justify-center">
            <div className="p-20 rounded-lg">
                <div className="flex flex-col justify-center items-center w-full gap-6">
                    <img className="h-10 w-10" src={logo} alt="Logo" />
                    <h5 className="font-nunito dark:dark-text text-2xl font-bold">Sign in</h5>
                </div>
                <form
                    className="mt-6 flex flex-col gap-6"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                    <div>
                        <label
                            htmlFor="email"
                            className="block w-80 font-medium text-light-text dark:dark-text font-nunito text-lg"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500/40 focus:outline-none focus:ring-1 focus:ring-pink-500/20 dark:bg-[#111111] dark:border dark:border-[#333333] placeholder:text-sm shadow-md"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block w-80 font-medium text-light-text dark:dark-text font-nunito text-lg"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500/40 focus:outline-none focus:ring-1 focus:ring-pink-500/20 dark:bg-[#111111] dark:border dark:border-[#333333] placeholder:text-sm"
                        />
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
                </form>
            </div>
        </div>
    );
};

export default Login;
