import PropTypes from 'prop-types'
import React, { Component } from 'react'

class FunctionSlider extends Component {
  onChangeHandler = event => {
    const value = event.target.value
    this.props.callback(this.props.functionName, value, this.props.variableName)
  }

  render() {
    return (
      <div>
        {this.props.label}
        {': '}
        {this.props.currentValue}
        <br />
        <input max="255" min="0" onChange={this.onChangeHandler} type="range" />
      </div>
    )
  }
}

FunctionSlider.propTypes = {
  callback:     PropTypes.func.isRequired,
  currentValue: PropTypes.number,
  functionName: PropTypes.string.isRequired,
  label:        PropTypes.string.isRequired,
  variableName: PropTypes.string.isRequired,
}

export default FunctionSlider
