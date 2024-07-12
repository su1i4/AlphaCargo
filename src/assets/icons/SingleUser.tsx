import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SingleUser({size = 19}: {size: number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M9 9.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM15 15.75a6 6 0 10-12 0"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SingleUser