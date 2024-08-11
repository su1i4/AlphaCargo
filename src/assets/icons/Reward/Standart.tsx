import * as React from "react"
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg"

function Standart() {
  return (
    <Svg
      width={34}
      height={35}
      viewBox="0 0 34 35"
      fill="none"
    >
      <Rect
        x={0.0999756}
        y={0.358826}
        width={33}
        height={34.65}
        rx={16.5}
        fill="url(#pattern0_1084_6194)"
      />
      <Defs>
        <Pattern
          id="pattern0_1084_6194"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_1084_6194" transform="scale(.01667 .01587)" />
        </Pattern>
        <Image
          id="image0_1084_6194"
          width={60}
          height={63}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  )
}

export default Standart
