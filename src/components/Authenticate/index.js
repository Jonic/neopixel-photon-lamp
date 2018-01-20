import { Button, TypeBase, TypeDisplay } from 'raspberry-pi-bits'
import React, { Component } from 'react'
import Particle from 'particle-api-js'
import PropTypes, { instanceOf } from 'prop-types'

class Authenticate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: null,
      username: null,
    }
  }

  loginToParticle = event => {
    event.preventDefault()

    console.log('logging in')

    let credentials = {
      password: this.state.password,
      username: this.state.username,
    }

    console.log(credentials)

    this.props.particle.login(credentials).then(
      data => this.props.authCallback(data.body.access_token),
      err => console.log('Could not log in.', err) // eslint-disable-line
    )
  }

  updatePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  updateUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <TypeDisplay element="h2">Log in:</TypeDisplay>

        <form action="/" method="POST" onSubmit={this.loginToParticle}>
          <TypeBase element="p">
            <label htmlFor="usernane">Username:</label>{' '}
            <input id="username" name="username" onChange={this.updateUsername} type="email" />
          </TypeBase>
          <TypeBase element="p">
            <label htmlFor="password">Password:</label>{' '}
            <input id="password" name="password" onChange={this.updatePassword} type="password" />
          </TypeBase>
          <Button>Submit</Button>
        </form>
      </div>
    )
  }
}

Authenticate.propTypes = {
  authCallback: PropTypes.func.isRequired,
  particle:     instanceOf(Particle).isRequired,
}

export default Authenticate
