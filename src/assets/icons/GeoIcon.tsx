import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GeoIcon({size = 19, active}: {size: number, active: boolean}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
    >
      <Path
        d="M15.5 7.5c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 1112 0z"
        stroke={active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 9.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        stroke={active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default GeoIcon