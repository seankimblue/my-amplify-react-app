import React from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
// import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify'

class App extends React.Component {
  // initial state
  state = { pets: [] }

  async componentDidMount() {
    // const user = await Auth.currentAuthenticatedUser()
    // console.log('user:', user)
    // console.log('user info:', user.signInUserSession.idToken.payload)
    // console.log('username:', user.username)
    this.getData()
  }

  getData = async() => {
    try {
      const data = await API.get('amplifyreactrestapi', '/pets')
      console.log('data from Lambda REST API: ', data)
      this.setState({ pets: data.pets })
    } catch (err) {
      console.log('error fetching data..', err)
    }
  }

  render() {
    return (
      // existing code
      <div className="App">
      <h1>Hello World</h1>
      {
        this.state.pets.map((p, i) => (
          <p key={i}>{p}</p>
        ))
      }
      </div>
    )
  }
}

export default withAuthenticator(App, { includeGreetings: true });
