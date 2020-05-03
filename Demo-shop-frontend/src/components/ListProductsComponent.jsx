import React, { Component } from 'react';
import ProductService from '../api';

export default class ListProductsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			message: null
		};
	}

	componentDidMount() {
		this.refreshProducts();
	}

	refreshProducts = () => {
		ProductService.retrieveAllProducts().then((response) => {
			this.setState({ products: response.data });
		});
	};

	deleteProductClicked = (id) => {
		ProductService.deleteProduct(id).then((response) => {
			this.setState({ message: `Delete of product ${id} Successful` });
			this.refreshProducts();
		});
	};

	addProductClicked = () => {
		this.props.history.push(`/products/-1`);
	};

	updateProductClicked = (id) => {
		console.log(`Update Product with id: ${id}`);
		this.props.history.push(`/products/${id}`);
	};

	render() {
		return (
			<div className="container">
				<h3>All Products</h3>
				{this.state.message && <div className="alert alert-success">{this.state.message}</div>}
				<div className="container">
					<table className="table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Description</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{this.state.products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.description}</td>
									<td>
										<button
											className="btn bth-success"
											onClick={() => {
												this.updateProductClicked(product.id);
											}}
										>
											Update
										</button>
									</td>
									<td>
										<button
											className="btn bth-success"
											onClick={() => {
												this.deleteProductClicked(product.id);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="row">
						<button className="btn btn-primary" onClick={this.addProductClicked}>
							Add
						</button>
					</div>
				</div>
			</div>
		);
	}
}
