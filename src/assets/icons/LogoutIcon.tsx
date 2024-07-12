import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogoutIcon({size = 18}: {size: number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M6.75 15.75h-3a1.5 1.5 0 01-1.5-1.5V3.75a1.5 1.5 0 011.5-1.5h3M12 12.75L15.75 9 12 5.25M15.75 9h-9"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LogoutIcon