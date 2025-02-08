import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function VoskArrow() {
  return (
    <Svg width={41} height={25} viewBox="0 0 41 25" fill="none">
      <Path
        d="M40.5 12.4H21.3"
        stroke="#2B3F6C"
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path d="M.1 12.4L30 .2l-7.1 12.2L30 24.6.1 12.4z" fill="#2B3F6C" />
    </Svg>
  );
}

export default VoskArrow;
