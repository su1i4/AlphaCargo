import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FaceId() {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M7 3H5a2 2 0 00-2 2v2M17 3h2a2 2 0 012 2v2M16 8v2M8 8v2M9 16s1 1 3 1 3-1 3-1M12 8v5h-1M7 21H5a2 2 0 01-2-2v-2M17 21h2a2 2 0 002-2v-2"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FaceId
