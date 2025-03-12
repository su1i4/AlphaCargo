import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Vosk() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 29 29"
      fill="none"
    >
      <Path
        d="M14.3 28.6C6.7 28.6.4 22.4.4 14.7S6.6.8 14.3.8 28.2 7 28.2 14.7s-6.3 13.9-13.9 13.9zm0-25.8C7.7 2.8 2.4 8.2 2.4 14.7s5.4 11.9 11.9 11.9c6.6 0 11.9-5.4 11.9-11.9S20.8 2.8 14.3 2.8z"
        fill="#2B3F6C"
      />
      <Path
        d="M14.9 22.1c-.5 0-1-.4-1-1v-7.7c0-.5.4-1 1-1 .5 0 1 .4 1 1v7.7c0 .6-.5 1-1 1z"
        fill="#2B3F6C"
      />
      <Path
        d="M14.9 14.4h-2.6c-.5 0-1-.4-1-1s.4-1 1-1h2.6c.5 0 1 .4 1 1s-.5 1-1 1zM14.9 10.5c-.5 0-1-.4-1-1V8.2c0-.5.4-1 1-1 .5 0 1 .4 1 1v1.3c0 .6-.5 1-1 1z"
        fill="#2B3F6C"
      />
    </Svg>
  )
}

export default Vosk
