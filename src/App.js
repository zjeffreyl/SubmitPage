import React, { Component } from 'react';

class App extends Component {

  state = {
    errorMessage: '',
    username: '',
    submitted: false
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    //reset
    this.setState({
      errorMessage: ''
    });

    e.preventDefault();
    const username = this.state.username;
    if (username.length > 0 && username.length <= 3) {
      this.setState({
        errorMessage: "Your username is too short"
      });
      return;
    }
    this.isUnique(username);
    if (this.state.errorMessage === '') {
      this.setState({
        submitted: true
      });
    }

  }

  isUnique(username) {
    //check if unqiue
    const url = "https://hxj1tck8l1.execute-api.us-east-1.amazonaws.com/default/users/taken?username=" + username;
    fetch(url).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.taken) {
          this.setState({
            errorMessage: "Your username is taken"
          });
          return true;
        }
        else {
          return false
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return <div>
      <form onSubmit={this.onSubmit}>
        <label>Username:
          <input type="text" name="username" onChange={this.onChange} value={this.state.username} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <br />
      {this.state.errorMessage === '' && this.state.submitted ? <p>Submitted Successfully!</p> : <p>{this.state.errorMessage}</p>}
    </div>;
  }
}

export default App;
