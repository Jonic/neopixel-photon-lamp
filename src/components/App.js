import { Container, Slice, TypeDisplayLarge } from 'raspberry-pi-bits'
import { withCookies, Cookies } from 'react-cookie'
import Particle from 'particle-api-js'
import { instanceOf } from 'prop-types'
import React, { Component } from 'react'

import Authenticate from './Authenticate/Authenticate'
import DeviceManager from './DeviceManager/DeviceManager'

import './App.css'

const particle = new Particle()

class App extends Component {
  constructor(props) {
    super(props)

    const { cookies } = this.props

    this.state = {
      authenticated: cookies.get('authenticated') || false,
      deviceId:      process.env.REACT_APP_PARTICLE_DEVICE_ID,
      token:         cookies.get('token') || null,
    }
  }

  authenticationCallback = token => {
    this.setState(
      {
        authenticated: true,
        token:         token,
      },
      () => {
        this.storeAuthenticationDetails()
        this.getDeviceInfo()
      }
    )
  }

  getDeviceInfo = () => {}

  storeAuthenticationDetails = () => {
    const { cookies } = this.props

    cookies.set('authenticated', this.state.authenticated, { path: '/' })
    cookies.set('token', this.state.token, { path: '/' })
  }

  render() {
    return (
      <Slice>
        <Container>
          <TypeDisplayLarge element="h1">IOT Lamp</TypeDisplayLarge>

          {this.state.authenticated
            ? <DeviceManager deviceId={this.state.deviceId} />
            : <Authenticate authenticationCallback={this.authenticationCallback} particle={particle} />
          }
        </Container>
      </Slice>
    )
  }
}

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
}

export default withCookies(App)
