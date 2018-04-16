import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
	handleSubmi2t(event) {
		event.preventDefault();

		// Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text,
			createdAt: new Date(),
		});

		// Clear forums
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
					<form className="new-task" onSubmit={this.handleSubmi2t.bind(this)} >
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add new tasks pls"
							/>
					</form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, {sort: { createdAt: -1 } }).fetch(),
  };
})(App);
