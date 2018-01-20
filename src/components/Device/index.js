import { TypeBase, TypeDisplay } from 'raspberry-pi-bits'
import Particle from 'particle-api-js'
import PropTypes, { instanceOf } from 'prop-types'
import React, { Component } from 'react'

import FunctionButton from './FunctionButton'

class Device extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiArgs:       {},
      data:          null,
      functions:     {},
      variables:     {},
      variablesKeys: [],
    }

    this.getData()
  }

  componentDidMount() {
    this.setState({
      apiArgs: {
        auth:     this.props.token,
        deviceId: this.props.id,
      },
    })
  }

  callFunction = (functionName, value, variableName) => {
    let apiArgs = this.state.apiArgs

    apiArgs.name = functionName
    apiArgs.argument = value

    this.props.particle.callFunction(apiArgs).then(
      () => this.getVariable(variableName),
      error => console.log('API call failed: ', error) // eslint-disable-line
    )
  }

  getData = () => {
    const getDevice = this.props.particle.getDevice({
      auth:     this.props.token,
      deviceId: this.props.id,
    })

    getDevice.then(
      data => {
        this.setState(
          {
            data:          data.body,
            functions:     Object.keys(data.body.functions),
            variablesKeys: Object.keys(data.body.variables),
          },
          this.getVariables
        )
      },
      error => console.log('API call failed: ', error) // eslint-disable-line
    )
  }

  getVariable = key => {
    const { variables } = this.state
    let apiArgs = this.state.apiArgs

    apiArgs.name = key

    this.props.particle.getVariable(apiArgs).then(
      data => {
        variables[key] = data.body.result

        this.setState({
          variables: variables,
        })
      },
      error => console.log('An error occurred while getting attrs:', error) // eslint-disable-line
    )
  }

  getVariables = () => {
    const { variablesKeys } = this.state
    let variables = []

    for (let variableKey of variablesKeys) {
      variables[variableKey] = this.getVariable(variableKey)
    }

    this.setState({
      variables: variables,
    })
  }

  renderVariable = key => {
    const value = this.state.variables[key]

    if (typeof value === 'undefined') {
      return null
    }

    return (
      <li key={key}>
        {key}: {value.toString()}
      </li>
    )
  }

  renderVariables = () => {
    var keys = this.state.variablesKeys.sort()

    return <ul>{keys.map(key => this.renderVariable(key))}</ul>
  }

  render() {
    return (
      <div>
        <TypeDisplay element="h2">Device ID: {this.props.id}</TypeDisplay>

        {this.renderVariables()}

        <TypeDisplay element="h3">Change Mode:</TypeDisplay>

        <TypeBase element="p">
          <FunctionButton
            callback={this.callFunction}
            functionName="changeMode"
            label="Static"
            value="0"
            variableName="currentMode"
          />
        </TypeBase>

        <TypeBase element="p">
          <FunctionButton
            callback={this.callFunction}
            functionName="changeMode"
            label="Flames"
            value="1"
            variableName="currentMode"
          />
        </TypeBase>

        <TypeBase element="p">
          <FunctionButton
            callback={this.callFunction}
            functionName="changeMode"
            label="Rainbow"
            value="2"
            variableName="currentMode"
          />
        </TypeBase>
      </div>
    )
  }
}

Device.propTypes = {
  token:    PropTypes.string.isRequired,
  id:       PropTypes.string.isRequired,
  particle: instanceOf(Particle).isRequired,
}

export default Device
