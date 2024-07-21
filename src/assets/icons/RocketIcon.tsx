import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RocketIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M3.375 12.375c-1.125.945-1.5 3.75-1.5 3.75s2.805-.375 3.75-1.5c.532-.63.525-1.598-.067-2.182a1.635 1.635 0 00-2.183-.068zM9 11.25L6.75 9a16.5 16.5 0 011.5-2.963A9.66 9.66 0 0116.5 1.5c0 2.04-.585 5.625-4.5 8.25a16.762 16.762 0 01-3 1.5z"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 9H3s.413-2.272 1.5-3c1.215-.81 3.75 0 3.75 0M9 11.25V15s2.273-.412 3-1.5c.81-1.215 0-3.75 0-3.75"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RocketIcon;
