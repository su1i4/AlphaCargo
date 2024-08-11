import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Vopros() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <G
        clipPath="url(#clip0_510_18300)"
        stroke="#02447F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        <Path d="M6.817 6.75a2.25 2.25 0 014.373.75c0 1.5-2.25 2.25-2.25 2.25M9 12.75h.008" />
      </G>
      <Defs>
        <ClipPath id="clip0_510_18300">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Vopros
