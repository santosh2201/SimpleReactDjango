import React from 'react';
import { Button } from 'react-bootstrap/lib';

class App extends React.Component {
	render(){
		return (
			<div className="App">
				<div className="App-header">
					<h2>Cloud Computing</h2>
				</div>
				<div className="App-content">
					<div className="add-book-container">
						<Button bsStyle="primary" bsSize="large" block>Add</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
