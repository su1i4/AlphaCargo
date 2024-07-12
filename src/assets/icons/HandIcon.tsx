import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HandIcon({size = 18}: {size: number}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M8.25 12.75l1.5 1.5A1.592 1.592 0 0012 12"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 10.5l1.875 1.875a1.59 1.59 0 102.25-2.25l-2.91-2.91a2.25 2.25 0 00-3.18 0l-.66.66a1.591 1.591 0 11-2.25-2.25l2.107-2.107a4.343 4.343 0 015.295-.653l.353.21a1.5 1.5 0 001.065.188L15.75 3"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.75 2.25l.75 8.25H15M2.25 2.25L1.5 10.5l4.875 4.875a1.59 1.59 0 102.25-2.25M2.25 3h6"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HandIcon;
