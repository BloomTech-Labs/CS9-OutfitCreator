import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(
	<Router>
		<StripeProvider apiKey="null">
			<App />
		</StripeProvider>
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
