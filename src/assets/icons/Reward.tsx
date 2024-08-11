import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Reward() {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
    >
      <Path
        d="M5 6.75H3.875a1.875 1.875 0 010-3.75H5M14 6.75h1.125a1.875 1.875 0 100-3.75H14M3.5 16.5h12M8 10.995v1.755c0 .412-.353.735-.728.908-.885.405-1.522 1.522-1.522 2.842M11 10.995v1.755c0 .412.352.735.727.908.886.405 1.523 1.522 1.523 2.842"
        stroke="#02447F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 1.5H5v5.25a4.5 4.5 0 009 0V1.5z"
        stroke="#02447F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Reward
