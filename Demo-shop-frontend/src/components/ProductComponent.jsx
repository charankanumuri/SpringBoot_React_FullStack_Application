import React, { Component } from 'react';
import ProductService from '../api';
import { Formik, Form, ErrorMessage, Field } from 'formik';

export default class ProductComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			description: ''
		};
	}

	componentDidMount() {
		console.log(this.state.id);

		if (this.state.id === -1) return;
		ProductService.retrieveProduct(this.state.id).then((response) =>
			this.setState({
				description: response.data.description
			})
		);
	}

	validate = (values) => {
		let errors = {};
		if (!values.description) errors.description = 'Enter some description';
		else if (values.description.length < 5) errors.description = 'Enter atleast 5 Characters in Description';

		return errors;
	};

	onSubmit = (values) => {
		let product = {
			id: this.state.id,
			description: values.description,
			targetDate: values.targetDate
		};

		if (this.state.id === -1) {
			console.log('Create a Product inside Product Component');
			ProductService.createProduct(product).then(() => this.props.history.push('/products'));
		} else {
			console.log('Update a Product inside Product Component');
			ProductService.updateProduct(this.state.id, product).then(() => this.props.history.push('/products'));
		}

		console.log(values);
	};

	render() {
		let { id, description } = this.state;

		return (
			<div>
				<h3>Product</h3>
				<div className="container">
					<Formik
						initialValues={{ id, description }}
						onSubmit={this.onSubmit}
						validate={this.validate}
						enableReinitialize={true}
						validateOnBlur={false}
						validateOnChange={false}
					>
						{(props) => (
							<Form>
								<ErrorMessage name="description" component="div" className="alert alert-warning" />
								<fieldset className="form-group">
									<label>Id</label>
									<Field className="form-control" type="text" name="id" disabled />{' '}
								</fieldset>
								<fieldset className="form-group">
									<label>Description</label>
									<Field className="form-control" type="text" name="description" />
								</fieldset>
								<button className="btn btn-success" type="submit">
									Save
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}
