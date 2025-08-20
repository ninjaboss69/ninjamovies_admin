const Navbar = () => {
	 const token = localStorage.getItem("accessToken");
	return (
		<nav className="nav-bar p-4 sticky top-0">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold w-1/3">
					<a href="/" className="text-black  hover:font-bold">
						Lana
					</a>
				</div>
				<div className="flex items-center justify-center space-x-4 w-1/3 ">
					<a href="/about-us" className="w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white  px-4 py-2 rounded-2xl transition-all   ">
						About Us
					</a>
					<a href="/support" className="w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white px-4 py-2 rounded-2xl transition-all ">
						Support
					</a>
					<a href="/editor" className="w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white px-4 py-2 rounded-2xl transition-all ">
						Write
					</a>
					
				</div>
				<div className="w-1/3 flex justify-end items-center space-x-4">

					{token ? 
					
					<button  className="text-black hover:shadow-xl  shadow-md bg-[#fff] px-4  py-2 rounded-2xl transition-all" >
						Logout
					</button> :
					<a href="/login" className="text-black hover:shadow-xl  shadow-md bg-[#fff] px-4  py-2 rounded-2xl transition-all">
						Login
					</a>
				}
					</div>
			</div>
		</nav>
	);
};

export default Navbar;
