import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorPage from '../provider/error/ErrorPage';
import Navbar from '../component/nav';
import ProtectedRoute from '../hook/Auth';

const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about-us'));
const Support = lazy(() => import('../pages/support'));
const FAQ =  lazy(() => import('../pages/faq'));
const Report = lazy(() => import('../pages/report'));
const Login = lazy(() => import('../pages/login'));
const Write = lazy(() => import('../pages/editor'));
const Banner = lazy(() => import('../pages/banner'))
const Portfolio = lazy(() => import("../pages/project"))
export const routes = [
	{
		path: '/',
		element: (
			<>
				<Navbar />
				<Outlet />
				{/* <Footer /> */}
			</>
		),
		children: [
			{
				key: 0,
				path: '/',
				index: true,
				element: (

					<Suspense fallback={<div>Loading home page...</div>}>
						<Home />
					</Suspense>
				),
			},
			{
				key: 1,
				path: '/about-us',
				element: (
					<Suspense fallback={<div>Loading About Us Page...</div>}>
						<About />
					</Suspense>
				),
			},
			{
				key: 2,
				path: '/support',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Loading Support Page...</div>}>
						<Support />
						</Suspense>
					</ProtectedRoute>

				),
			},
			{
				key: 3,
				path: '/report',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Loading Report Page...</div>}>
						<Report />
					</Suspense>
					</ProtectedRoute>

				),
			},

			{
				key: 4,
				path: '/editor',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Loading Editor Page...</div>}>
							<Write />
					</Suspense>
					</ProtectedRoute>

				),
			},
			{
				key: 5,
				path: '/faq',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Loading FAQ Page...</div>}>
						<FAQ />
						</Suspense>
					</ProtectedRoute>

				),
			},
			// {
			// 	key: 6,
			// 	path: '/banner',
			// 	element: (
			// 		<ProtectedRoute>
			// 			<Suspense fallback={<div>Loading Banner Page...</div>}>
			// 			<Banner />
			// 			</Suspense>
			// 		</ProtectedRoute>

			// 	),
			// },
			{
				key: 666,
				path: '/login',
				element: (
					<Suspense fallback={<div>Loading Login Page...</div>}>
						<Login />
					</Suspense>
				),
			},
			{
				key: 7,
				path: '/portfolio',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Loading Portfolio Page...</div>}>
							<Portfolio />
						</Suspense>
					</ProtectedRoute>

				),
			},
		],
		errorElement: <ErrorPage />,
	},
];

