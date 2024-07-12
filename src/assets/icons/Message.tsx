import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Message() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M15 3H3a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 003 15h12a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0015 3z"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 5.25L9.773 9.525a1.455 1.455 0 01-1.546 0L1.5 5.25"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Message;
