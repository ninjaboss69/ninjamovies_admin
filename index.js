import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const mount = () => {
	const root = createRoot(document.getElementById('app'));
	root.render(<App />);
	return () => queueMicrotask(() => root.unmount());
};
mount();
