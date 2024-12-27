import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"

function Check() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Circle cx={9} cy={9} r={9} fill="#02447F" />
      <G clipPath="url(#clip0_589_15525)">
        <Path
          d="M14.667 5l-7.334 7.333L4 9"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_589_15525">
          <Path fill="#fff" transform="translate(3 3)" d="M0 0H12V12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Check
