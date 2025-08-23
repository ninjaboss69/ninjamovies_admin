import { useLocation, useNavigate } from "react-router-dom";
import { instanceForJSON } from "../../api/instance";
import logoImage from '../../../public/logo.png'
const Navbar = () => {
	const token = localStorage.getItem("accessToken");
	const location = useLocation();
	const selected = location.pathname;
	const navigate = useNavigate()
	const logout = () => {

		instanceForJSON
			.post(`/backpanel/logout-admin`)
			.then((res) => {

				localStorage.removeItem("accessToken");

				navigate("/login");
			})
			.catch((e) => console.log(e));
	}

	return (
		<nav className="nav-bar p-4 sticky top-0">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold w-1/3">
					<a href="/" >
						<img src={logoImage} alt='' className='h-full w-[180px] object-contain ' />
					</a>
				</div>
				<div className="flex items-center justify-center space-x-4 w-1/3 ">

					<a href="/banner" className={`w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white px-4 py-2 rounded-2xl transition-all ${selected.includes('banner') ? 'bg-[#6baed6] text-white' : ''}`}>
						Banner
					</a>
					<a href="/editor" className={`w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white px-4 py-2 rounded-2xl transition-all ${selected.includes('editor') ? 'bg-[#6baed6] text-white' : ''}`}>
						Write
					</a>
					<a href="/faq" className={`w-[100px] text-center text-black hover:bg-[#6baed6] hover:text-white px-4 py-2 rounded-2xl transition-all  ${selected.includes('faq') ? 'bg-[#6baed6] text-white' : ''}`}>
						FAQ
					</a>

				</div>
				<div className="w-1/3 flex justify-end items-center space-x-4">

					{token ?

						<button onClick={logout} className="text-black hover:shadow-xl  shadow-md bg-[#fff] px-4  py-2 rounded-2xl transition-all" >
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
