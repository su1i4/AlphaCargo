import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Calc({active}: {active?: boolean}) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M13.5 1.5h-9A1.5 1.5 0 003 3v12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V3a1.5 1.5 0 00-1.5-1.5zM6 4.5h6M12 10.5v3M12 7.5h.008M9 7.5h.008M6 7.5h.008M9 10.5h.008M6 10.5h.008M9 13.5h.008M6 13.5h.008"
        stroke={active? '#02447F': '#F9FFFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Calc;
