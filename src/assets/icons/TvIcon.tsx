import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TvIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M7.5 5.25l3.75 2.25L7.5 9.75v-4.5z"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 2.25H3a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5zM9 12.75v3M6 15.75h6"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TvIcon;
