import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { appconfig } from '../../config';
import { Eye, EyeClosed } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../../public/login.jpg'
import { ToastContainer,toast } from 'react-toastify';
const LoginPage = () => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm();

	const [isShownPassword, setIsShownPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate()

	const onSubmit = async (values) => {
		
		setIsLoading(true)
		try {
			const res = await axios.post(`${appconfig.api_url}/backpanel/login-admin`, values,
				{
					withCredentials: true
				});
			if (!res.data.accessToken) {
				throw Error("Login Failed")
			}
			const accessToken = res.data.accessToken;
			localStorage.setItem("accessToken", accessToken);
			toast(res.message , {
				type: "success",
			});
			navigate('/editor')
			setIsLoading(false)
		} catch (err) {
			console.log("Login Failed");
			console.log(err.message);
			toast(err.message , {
				type: "error",
			});
			setIsLoading(false)
		}

	};

	useEffect(() => {
		setFocus("username");
	}, []);

	return (
		<div className="w-full min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] flex  flex-col items-center justify-center  ">
			{isLoading &&
				<div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
					<div className="flex flex-col items-center space-y-2">

						<div className="w-16 h-16 border-4 border-t-[#6baed6] border-b-[#3182ce] border-l-[#63b3ed] border-r-[#90cdf4] rounded-full animate-spin"></div>

						<span className="text-[#6baed6] font-semibold">Loading...</span>
					</div>
				</div>
			}
			<div className='w-[70%]  p-8 flex items-center justify-between bg-white  shadow-xl rounded-xl fixed'>
				<ToastContainer autoClose={3000} />
				<img
					src={LoginImage}
					className=" basis-1/2 w-1/2 p-8"
					width={400}
					height={400}
				/>
				<div className="basis-1/2 w-1/2  space-y-6  flex flex-col items-center ">
					<h2 className="text-2xl font-bold text-center">Login</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-[400px]">
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								id="username"
								{...register("username", {
									required: "Username is required",
								})}
								className="w-full px-3 py-2 mt-1 border border-gray-400 focus:border-0  rounded-md focus:outline-none focus:ring focus:ring-blue-500"
							/>
							{errors.username && <p className='text-red-600 mt-1'>{errors.username.message}</p>}
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className='w-full flex items-center justify-between relative '>
								<input
									type={isShownPassword ? "text" : "password"}
									id="password"
									{...register("password", {
										required: "Password is required",
									})}
									className="w-full px-3 py-2 mt-1  rounded-md focus:border-0  focus:outline-none focus:ring focus:ring-blue-500 border border-gray-400"
								/>
								<button
									type="button"
									className="absolute top-4 right-5 laptop:cursor-pointer"
									onClick={() => setIsShownPassword((curr) => !curr)}
								>
									{
										isShownPassword ? (

											<Eye size={20} className="text-gray-600" />
										) : (

											<EyeClosed size={20} className="text-gray-600" />
										)
									}
								</button>
							</div>
							{errors.password && <p className='text-red-600 mt-1'>{errors.password.message}</p>}
						</div>
						<div>

							<button
								type="submit"
								className="w-full btn overflow-hidden rounded-md  mt-1 border font-semibold uppercase leading-none tracking-wider relative bg-[#6baed6] "
							>
								<span className="absolute inset-0 bg-[#FFFFFF]" />
								<span className="absolute inset-0 flex items-center justify-center text-white hover:text-black">
									Login
								</span>
								<div className="py-3 ">

									Login
								</div>
							</button>
						</div>
					</form>
				</div>
			</div>

		</div>
	);
};

export default LoginPage;
