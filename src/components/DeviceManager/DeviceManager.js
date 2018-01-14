import { TypeDisplay } from "raspberry-pi-bits"
import PropTypes from "prop-types"
import React from "react"

const DeviceManager = ({ deviceId }) => <TypeDisplay element="h2">Device ID: {deviceId}</TypeDisplay>

DeviceManager.propTypes = {
  deviceId: PropTypes.string.isRequired,
}

export default DeviceManager
