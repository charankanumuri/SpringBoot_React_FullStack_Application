import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListProductsComponent from './ListProductsComponent';
import ProductComponent from './ProductComponent';

const DemoShop = () => {
	return (
		<Router>
			<h1>Online Demo Shop Application</h1>
			<Switch>
				<Route path="/" exact component={ListProductsComponent} />
				<Route path="/products" exact component={ListProductsComponent} />
				<Route path="/products/:id" component={ProductComponent} />
			</Switch>
		</Router>
	);
};

export default DemoShop;
