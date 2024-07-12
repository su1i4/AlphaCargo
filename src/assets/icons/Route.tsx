import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RouteIcon() {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
      <Path
        d="M2.167 9.75a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 113 0V15a1.5 1.5 0 003 0V3a1.5 1.5 0 013 0v9.75a1.5 1.5 0 103 0v-3a1.5 1.5 0 011.5-1.5"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RouteIcon;
