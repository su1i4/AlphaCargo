import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Angar() {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
      <Path
        d="M13.75 5.219V12.5a1.25 1.25 0 01-1.25 1.25h-10a1.25 1.25 0 01-1.25-1.25V5.219a1.25 1.25 0 01.788-1.157l5-2a1.25 1.25 0 01.925 0l5 2a1.25 1.25 0 01.787 1.157zM3.75 11.25h7.5M3.75 8.75h7.5"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 6.25h-7.5v7.5h7.5v-7.5z"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Angar;
