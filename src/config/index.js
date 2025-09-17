var config = {
	Development: {
		env: 'Development',
		// api_url: 'http://localhost:5000/api',
		api_url: 'https://uniqenviron.com/api',
		// Please block different origin in google console
		map_api: 'AIzaSyCzJIBmzqAbD6_AUcGtyQzJTciBK1dhr78',
		map_style_id: 'b181cac70f27f5e6',
		default_image: "https://uniqenviron.com/images/logo.png",
	},
};

export const appconfig = config['Development'];
