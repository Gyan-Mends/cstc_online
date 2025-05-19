import { useNavigate } from "@remix-run/react";
import axios from "axios";
import logo from "~/components/image/logo.jpg"
const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        try {
            await axios.post("https://cstsapi.vercel.app/auth", data, {
                headers: { "Content-Type": "application/json" }

            })
            navigate("/");
        } catch (err: any) {
            navigate("/login");
        }
    }

    return (
        <div className="bg-gray-50/20 w-full lg:h-[100vh] flex items-center justify-center" >
            <div className=" p-20 rounded-lg">
                <div className="flex flex-col justify-center items-center w-full gap-6">
                    <img className="h-10 w-10" src={logo} alt="" />
                    <h5 className="font-nunito text-2xl font-bold">
                        Sign in
                    </h5>
                </div>
                <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit} method="post">
                    <div>
                        <label htmlFor="name" className="block w-80 font-medium text-gray-700 font-nunito text-lg">
                            Email
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter email"
                            name="email"
                            // value={formData.name}
                            // onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block w-80 font-medium text-gray-700 font-nunito text-lg">
                            Password
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="password"
                            placeholder="Enter password"
                            // value={formData.name}
                            // onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <button className="mt-1 block w-full rounded-md  px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 font-montserrat focus:outline-none bg-pink-500 text-white focus:ring-1 focus:ring-pink-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

