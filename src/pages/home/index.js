import { Link } from 'react-router-dom';

function Home() {


	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
			{/* Hero Section */}
			<div className="max-w-xl">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					Oops! Nothing Here 🚧
				</h1>


				<img
					src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif"
					alt="Empty state illustration"
					className="rounded-2xl shadow-md mx-auto mb-6"
				/>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">

					<a
						href='https://uniqenviron.com'
						className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
					>
						Our Website ℹ️
					</a>
					<Link
						to="/editor"
						className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
					>
						Explore Editor
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
