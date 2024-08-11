import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Tasks() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <G
        clipPath="url(#clip0_510_18286)"
        stroke="#02447F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M2.887 6.465a3 3 0 013.585-3.577 3 3 0 015.055 0 3 3 0 013.586 3.585 3 3 0 010 5.054 3 3 0 01-3.578 3.586 3 3 0 01-5.063 0 3 3 0 01-3.585-3.578 3 3 0 010-5.07z" />
        <Path d="M6.75 9l1.5 1.5 3-3" />
      </G>
      <Defs>
        <ClipPath id="clip0_510_18286">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Tasks
