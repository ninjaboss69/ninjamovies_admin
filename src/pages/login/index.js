import axios from 'axios';
import React, { useState } from 'react';
import { appconfig } from '../../config';

const LoginPage = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try{
		const res  = await axios.post(`${appconfig.api_url}/backpanel/login-admin`,{username,password},
			{
 withCredentials: true
});
		if(!res.data.accessToken){
			throw Error("Login Failed")
		}
		const accessToken = res.data.accessToken;
		localStorage.setItem("accessToken",accessToken);
		}catch(err){
		console.log("Login Failed");
		console.log(err.message);
		}
		
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUserName(e.target.value)}
							required
							className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
						/>
					</div>
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
