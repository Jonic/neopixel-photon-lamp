import { Container, Slice, TypeDisplayLarge } from 'raspberry-pi-bits'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import Particle from 'particle-api-js'
import React, { Component } from 'react'

import Authenticate from './Authenticate'
import Device from './Device'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    const { cookies } = this.props

    this.state = {
      authToken:  cookies.get('authToken') || null,
      deviceData: null,
      deviceId:   process.env.REACT_APP_PARTICLE_DEVICE_ID,
      particle:   new Particle(),
    }
  }

  authenticated = () => this.state.authToken

  authCallback = authToken => {
    this.setState(
      {
        authToken: authToken,
      },
      this.storeAuthDetails
    )
  }

  storeAuthDetails = () => {
    const { cookies } = this.props

    cookies.set('authToken', this.state.authToken, {
      path: '/',
    })
  }

  render() {
    return (
      <Slice>
        <Container>
          <TypeDisplayLarge element="h1">IOT Lamp</TypeDisplayLarge>

          {this.state.authToken
            ? <Device token={this.state.authToken} id={this.state.deviceId} particle={this.state.particle} />
            : <Authenticate authCallback={this.authCallback} particle={this.state.particle} />
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
