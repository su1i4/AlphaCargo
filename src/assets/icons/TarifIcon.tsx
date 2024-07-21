import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TarifIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 2.25H3a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75V3a.75.75 0 00-.75-.75zM6.75 10.5H3a.75.75 0 00-.75.75V15c0 .414.336.75.75.75h3.75A.75.75 0 007.5 15v-3.75a.75.75 0 00-.75-.75zM10.5 3h5.25M10.5 6.75h5.25M10.5 11.25h5.25M10.5 15h5.25"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TarifIcon;
