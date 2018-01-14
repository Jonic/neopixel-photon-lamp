import { Container, Slice, TypeDisplayLarge } from "raspberry-pi-bits"
import Particle from "particle-api-js"
import React, { Component } from "react"

import Authenticate from "./Authenticate/Authenticate"
import DeviceManager from "./DeviceManager/DeviceManager"

import "./App.css"

const particle = new Particle()

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
      deviceId: process.env.REACT_APP_PARTICLE_DEVICE_ID,
      token: null,
    }
  }

  authenticationCallback = token => {
    this.setState(
      {
        authenticated: true,
        token: token,
      },
      this.getDeviceInfo,
    )
  }

  getDeviceInfo = () => {}

  render() {
    return (
      <Slice>
        <Container>
          <TypeDisplayLarge element="h1">IOT Lamp</TypeDisplayLarge>

          {this.state.authenticated ? (
            <DeviceManager deviceId={this.state.deviceId} />
          ) : (
            <Authenticate authenticationCallback={this.authenticationCallback} particle={particle} />
          )}
        </Container>
      </Slice>
    )
  }
}

export default App
