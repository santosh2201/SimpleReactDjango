import React from 'react';
import { Button, Form, FormGroup, FormControl, Alert, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap/lib';
import axios from 'axios';

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = { 'x': 0, 'y': 0, 'o': 'add', 'data': null };
	}

	handleClick(e) {
		e.preventDefault();
		if(data == parseInt(data, 10)) {
			var url = 'calculate/?x='+this.state.x+'&y='+this.state.y+'&o='+this.state.o;
			axios({
				url: url,
				timeout: 20000,
				method: 'get',
				responseType: 'json'
			})
			.then(response => {
				this.setState({ data: response.data });
			})
			.catch(response => {
				this.setState({ data: {'status': 'fail', 'result': 'Request failed' } });
			})
		} else {
			this.setState({ data: {'status': 'fail', 'result': 'Please enter Integer input !!!' } });
		}
	}

	render(){
		console.log(this.state);
		const tooltip = (
			<Tooltip id="tooltip">
				<strong>Click!</strong> green button to use this output for next calculation.
			</Tooltip>
		);
		const error = this.state.data && this.state.data.status && this.state.data.status != 'fail';
		let outputBox = null;
		if (error) {
			outputBox = <Alert bsStyle="danger">
				<strong>Error!</strong> {this.state.data.message}
			</Alert>;
		} else {
			outputBox = <div className="wellStyles well">
				<h4>Output </h4>
				<OverlayTrigger placement="left" overlay={tooltip}>
					<Badge>Hint</Badge>
				</OverlayTrigger>
				<Button bsStyle="success" id="output" bsSize="large" block onClick={e => this.setState({ x: this.state.data.result, y: 0, data: null})}> { this.state.data.result } </Button>
			</div>;
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>Simple Integer Calculator</h2>
				</div>
				<div className="App-content">
					<Alert bsStyle="warning">
						<strong>Prototype!</strong> For bugs or hugs contact <strong><a target="_blank" href="mailto:nanchasr@mail.uc.edu"> Santosh </a></strong>
					</Alert>
					<div className="form-container">
						<Form inline onSubmit={e => this.handleClick(e)}>
							<FormGroup controlId="first">
								<FormControl type="number" placeholder="Enter Integer Input" value={this.state.x} onChange={e => this.setState({ x: e.target.value })} />
							</FormGroup>{' '}
							<FormGroup controlId="operator">
								<FormControl componentClass="select" placeholder="Select Operator" value={this.state.o} onChange={e => this.setState({ o: e.target.value })} >
									<option value="add"> + </option>
									<option value="sub"> - </option>
									<option value="mul"> * </option>
									<option value="div"> / </option>
									<option value="rem"> % </option>
								</FormControl>
							</FormGroup>{' '}
							<FormGroup controlId="second">
								<FormControl type="number" placeholder="Enter Integer Input" value={this.state.y} onChange={e => this.setState({ y: e.target.value })} />
							</FormGroup>{' '}
							<FormGroup>
								<Button type="submit" value="Submit" >Calculate</Button>
							</FormGroup>
						</Form>
					</div>
				</div>
				{ outputBox }
			</div>
		);
	}
}

export default App;
