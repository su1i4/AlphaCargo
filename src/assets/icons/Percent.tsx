import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Percent() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M14.25 3.75l-10.5 10.5M4.875 6.75a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75zM13.125 15a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Percent;
