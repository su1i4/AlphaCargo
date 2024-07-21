import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CargoIcon({size = 19, active}: {size: number, active: boolean}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
    >
      <Path
        d="M12.5 12l1.5 1.5 3-3"
        stroke={active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.25 7.5V6a1.5 1.5 0 00-.75-1.298l-5.25-3a1.5 1.5 0 00-1.5 0l-5.25 3A1.5 1.5 0 002.75 6v6a1.5 1.5 0 00.75 1.297l5.25 3a1.5 1.5 0 001.5 0l1.5-.854M6.125 3.203l6.75 3.862"
        stroke={active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.968 5.25L9.5 9l6.532-3.75M9.5 16.5V9"
        stroke={active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CargoIcon