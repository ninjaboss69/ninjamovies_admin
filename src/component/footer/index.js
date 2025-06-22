import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto text-center">
				<ul className="flex justify-center space-x-4">
					<li>
						<a href="/support" className="hover:underline">
							Support
						</a>
					</li>
					<li>
						<a href="/report" className="hover:underline">
							Report
						</a>
					</li>
					<li>
						<a href="/login" className="hover:underline">
							Login
						</a>
					</li>
					<li>
						<a href="/about-us" className="hover:underline">
							About Us
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
