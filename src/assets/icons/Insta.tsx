import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function Insta() {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
    >
      <Mask
        id="a"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={17}
        height={17}
      >
        <Path d="M16.3.7H.6v15.7h15.7V.7z" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M11.8 16.4H5.1c-2.5 0-4.5-2-4.5-4.5V5.2C.6 2.7 2.6.7 5.1.7h6.7c2.5 0 4.5 2 4.5 4.5v6.7c0 2.5-2 4.5-4.5 4.5zM5.1 1.8c-1.9 0-3.4 1.5-3.4 3.4v6.7c0 1.9 1.5 3.4 3.4 3.4h6.7c1.9 0 3.4-1.5 3.4-3.4V5.2c0-1.9-1.5-3.4-3.4-3.4H5.1z"
          fill="#203B7A"
        />
      </G>
      <Mask
        id="b"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={17}
        height={17}
      >
        <Path d="M16.3.7H.6v15.7h15.7V.7z" fill="#fff" />
      </Mask>
      <G mask="url(#b)">
        <Path
          d="M8.5 10.8a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z"
          stroke="#203B7A"
          strokeWidth={1.2}
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  )
}

export default Insta
