import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Back({color = 'white'}: {color?: string}) {
  return (
    <Svg fill={color} width="24px" height="24px" viewBox="0 0 100 100">
      <Path d="M33.934 54.458l30.822 27.938a1.996 1.996 0 002.826-.138 1.999 1.999 0 00-.139-2.824l-29.642-26.87L64.67 22.921a1.998 1.998 0 10-2.963-2.685L33.768 51.059a1.994 1.994 0 00-.475 1.723 1.988 1.988 0 00.641 1.676z" />
    </Svg>
  );
}

export default Back;
