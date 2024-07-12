import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MapIcon({size = 17}: {size: number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
    >
      <Path
        d="M2 4.5l4-2 4 2 4-2v10l-4 2-4-2-4 2v-10zM6 2.5v10M10 4.5v10"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MapIcon