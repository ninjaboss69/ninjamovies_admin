const Navbar = () => {
	return (
		<nav className="bg-gray-800 p-4 sticky top-0">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold">
					<a href="/" className="text-gray-300 hover:text-white">
						Lana
					</a>
				</div>
				<div className="flex space-x-4">
					<a href="/about-us" className="text-gray-300 hover:text-white">
						About Us
					</a>
					<a href="/support" className="text-gray-300 hover:text-white">
						Support
					</a>
					<a href="/editor" className="text-gray-300 hover:text-white">
						Write
					</a>
					<a href="/login" className="text-gray-300 hover:text-white">
						Login
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
