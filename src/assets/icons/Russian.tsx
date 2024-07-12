import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Russian() {
  return (
    <Svg width={23} height={18} viewBox="0 0 23 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 .85h23v17H0v-17z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6.517h23V17.85H0V6.517z"
        fill="#0039A6"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12.183h23v5.667H0v-5.667z"
        fill="#D52B1E"
      />
    </Svg>
  );
}

export default Russian;
