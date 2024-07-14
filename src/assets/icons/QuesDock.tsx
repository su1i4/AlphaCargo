import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function QuesDock() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.25 1.5H4.5A1.5 1.5 0 003 3v12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V5.25L11.25 1.5z"
        stroke="#94C325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 7.725c.15-.3.375-.6.675-.75a1.575 1.575 0 011.95.3c.225.3.375.6.375.975 0 .975-1.5 1.5-1.5 1.5M9 12.75h.008"
        stroke="#94C325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default QuesDock;
