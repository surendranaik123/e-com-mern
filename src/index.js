// import React from 'react';
// import { createRoot } from 'react-dom'; // Import createRoot from 'react-dom'
// import App from './App';



// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(<App/>);
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import App from './App'; // Replace with your root component file

const root = createRoot(document.getElementById('root'));

root.render(<App />);



