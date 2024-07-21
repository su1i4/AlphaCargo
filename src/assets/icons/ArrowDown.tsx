import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowDown({size = 20}: {size: number}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 7.5l5 5 5-5"
        stroke="#8C8C8C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowDown;
