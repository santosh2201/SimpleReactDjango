import React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap/lib';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = { 'x': 0, 'y': 0, 'o': '', 'errShow': false, 'data':{} };
	}

	handleClick(e) {
		e.preventDefault();
		var url = 'calculate/?x='+this.state.x+'&y='+this.state.y+'&o='+this.state.o;
		axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
		.then(function(response) {
			this.setState({ errShow: !this.state.errShow, data: response.data });
		})
		.catch(function(response){
		})
	}


	render(){
		return (
			<div className="App">
				<div className="App-header">
					<h2>Cloud Computing</h2>
				</div>
				<div className="App-content">
				    <div className="form-container">
					<Form inline onSubmit={e => this.handleClick(e)}>
						<FormGroup controlId="first">
							<FormControl type="number" placeholder="Enter Integer Input" value={this.state.x} onChange={e => this.setState({ x: e.target.value })} />
						</FormGroup>{' '}
						<FormGroup controlId="operator">
							<FormControl componentClass="select" placeholder="Select Operator" value={this.state.o} onChange={e => this.setState({ o: e.target.value })} >
								<option value="select">select</option>
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
						<input type="submit" value="Submit" />
					</Form>
				    </div>
				    <div>
					<h2> { this.state.data != {} ? this.state.data.result : '' } </h2>
				    </div>
				</div>
			</div>
		);
	}
}

export default App;
