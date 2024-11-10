import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Perevozka() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M15.75 6A1.5 1.5 0 0015 4.702l-5.25-3a1.5 1.5 0 00-1.5 0l-5.25 3A1.5 1.5 0 002.25 6v6A1.5 1.5 0 003 13.297l5.25 3a1.5 1.5 0 001.5 0l5.25-3A1.5 1.5 0 0015.75 12V6z"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.475 5.25L9 9l6.525-3.75M9 16.5V9"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Perevozka
