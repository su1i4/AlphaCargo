import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FaUser() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M12 15.75v-1.5a3 3 0 00-3-3H4.5a3 3 0 00-3 3v1.5M6.75 8.25a3 3 0 100-6 3 3 0 000 6zM12 8.25l1.5 1.5 3-3"
        stroke="#94C325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FaUser;
