import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GeoWhite() {
  return (
    <Svg width={19} height={21} viewBox="0 0 19 21" fill="none">
      <Path
        d="M9.7 20.6C7.5 20.6.9 14.4.9 8.8.9 4 4.8.1 9.7.1s8.8 3.9 8.8 8.7c0 5.6-6.6 11.8-8.8 11.8zm0-19c-4 0-7.3 3.2-7.3 7.2 0 5 6 10.3 7.3 10.3 1.3 0 7.3-5.3 7.3-10.3 0-4-3.3-7.2-7.3-7.2z"
        fill="#fff"
      />
      <Path
        d="M9.7 12.1c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8zm0-6c-1.2 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3 0-1.3-1-2.3-2.3-2.3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default GeoWhite;
