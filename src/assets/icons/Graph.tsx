import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Graph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 3.75v3M7.5 6.75H6a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75zM6.75 11.25v1.5M12.75 2.25v1.5M13.5 3.75H12a.75.75 0 00-.75.75V9c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75zM12.75 9.75V12"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.25 2.25v13.5h13.5"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Graph;
