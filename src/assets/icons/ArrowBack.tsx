import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowBack({size = 17}: {size: number}) {
  return (
    <Svg width={18} height={19} viewBox="0 0 18 19" fill="none">
      <Path
        d="M9 14.75L3.75 9.5 9 4.25M14.25 9.5H3.75"
        stroke="#94C325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowBack;
