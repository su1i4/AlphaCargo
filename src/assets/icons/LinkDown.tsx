import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LinkDown() {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
      <Path
        d="M16.833 12.69v2.25a1.499 1.499 0 01-1.635 1.5 14.843 14.843 0 01-6.472-2.303 14.625 14.625 0 01-4.5-4.5 14.843 14.843 0 01-2.303-6.502A1.5 1.5 0 013.416 1.5h2.25a1.5 1.5 0 011.5 1.29 9.63 9.63 0 00.525 2.108 1.5 1.5 0 01-.338 1.582l-.952.953a12 12 0 004.5 4.5l.952-.953a1.5 1.5 0 011.583-.338c.68.254 1.387.43 2.107.526a1.5 1.5 0 011.29 1.522z"
        stroke="#94C325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LinkDown;
