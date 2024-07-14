import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Card() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M15 3.75H3a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5zM1.5 7.5h15"
        stroke="#94C325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Card