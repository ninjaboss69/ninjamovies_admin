const Navbar = () => {
	 const token = localStorage.getItem("accessToken");
	return (
		<nav className="bg-gray-800 p-4 sticky top-0">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold w-1/3">
					<a href="/" className="text-gray-300 hover:text-white">
						Lana
					</a>
				</div>
				<div className="flex items-center justify-center space-x-4 w-1/3 ">
					<a href="/about-us" className="text-gray-300 hover:text-white">
						About Us
					</a>
					<a href="/support" className="text-gray-300 hover:text-white">
						Support
					</a>
					<a href="/editor" className="text-gray-300 hover:text-white">
						Write
					</a>
					
				</div>
				<div className="w-1/3 flex justify-end items-center space-x-4">

					{token ? 
					
					<button  className="text-gray-300 hover:text-white bg-blue-600 px-4  py-2 rounded-lg " >
						Logout
					</button> :
					<a href="/login" className="text-gray-300 hover:text-white bg-blue-600 px-4  py-2 rounded-lg">
						Login
					</a>
				}
					</div>
			</div>
		</nav>
	);
};

export default Navbar;
