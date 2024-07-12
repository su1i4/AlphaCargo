import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LocateIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M2.5 15h3.75M23.75 15h3.75M15 2.5v3.75M15 23.75v3.75M15 23.75a8.75 8.75 0 100-17.5 8.75 8.75 0 000 17.5z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 18.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LocateIcon;
