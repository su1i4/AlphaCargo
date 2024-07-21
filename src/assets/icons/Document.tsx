import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Document() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.25 1.5H4.5A1.5 1.5 0 003 3v12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V5.25L11.25 1.5z"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 1.5v3A1.5 1.5 0 0012 6h3M7.5 6.75H6M12 9.75H6M12 12.75H6"
        stroke="#F9FFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Document;
