import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowRight({size = 17}: {size: number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      >
      <Path
        d="M6 12.5l4-4-4-4"
        stroke="#000018"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowRight;
