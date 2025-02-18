import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowDownGeo() {
  return (
    <Svg width={12} height={9} viewBox="0 0 12 9" fill="none">
      <Path
        d="M6 8.3L1 2.9C.4 2.3.5 1.3 1.1.7 1.7.1 2.7.2 3.3.8l2.9 3.1 3.2-3c.6-.6 1.6-.5 2.2.1.6.6.5 1.6-.1 2.2L6 8.3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ArrowDownGeo;
