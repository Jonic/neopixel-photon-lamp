import { Button } from 'raspberry-pi-bits'
import PropTypes from 'prop-types'
import React from 'react'

const FunctionButton = ({ callback, functionName, label, value, variableName }) => {
  const onClickHandler = () => {
    callback(functionName, value, variableName)
  }

  return <Button onClick={onClickHandler}>{label}</Button>
}

FunctionButton.propTypes = {
  callback:     PropTypes.func.isRequired,
  functionName: PropTypes.string.isRequired,
  label:        PropTypes.string.isRequired,
  value:        PropTypes.string.isRequired,
  variableName: PropTypes.string.isRequired,
}

export default FunctionButton
