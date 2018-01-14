import { Button, TypeBase, TypeDisplay } from "raspberry-pi-bits"
import React, { Component } from "react"
import PropTypes from "prop-types"

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

    let credentials = {
      password: this.state.password,
      username: this.state.username,
    }

    this.props.particle.login(credentials).then(
      data => {
        this.props.authenticationCallback(data.body.access_token)
      },
      err => {
        console.log("Could not log in.", err)
      },
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
            <label htmlFor="usernane">Username:</label>{" "}
            <input id="username" name="username" onChange={this.updateUsername} type="email" />
          </TypeBase>
          <TypeBase element="p">
            <label htmlFor="password">Password:</label>{" "}
            <input id="password" name="password" onChange={this.updatePassword} type="password" />
          </TypeBase>
          <Button>Submit</Button>
        </form>
      </div>
    )
  }
}

Authenticate.propTypes = {
  authenticationCallback: PropTypes.func.isRequired,
  particle: PropTypes.object.isRequired,
}

export default Authenticate
