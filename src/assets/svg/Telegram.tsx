import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Telegram() {
  return (
    <Svg
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none"
    >
      <Path
        d="M13.5 27.5C20.956 27.5 27 21.456 27 14S20.956.5 13.5.5 0 6.544 0 14s6.044 13.5 13.5 13.5z"
        fill="#039BE5"
      />
      <Path
        d="M6.177 13.707L19.194 8.69c.604-.218 1.131.147.936 1.06l-2.216 10.44c-.164.741-.604.921-1.22.572l-3.374-2.487-1.628 1.568c-.18.18-.332.332-.68.332l.24-3.435 6.254-5.65c.272-.24-.06-.375-.42-.137l-7.73 4.867-3.332-1.04c-.723-.229-.739-.723.153-1.072z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Telegram