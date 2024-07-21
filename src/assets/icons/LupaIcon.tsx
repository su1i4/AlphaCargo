import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LupaIcon({size = 18, active, color}: {size: number; active: boolean, color?: boolean}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 18" fill="none">
      <Path
        d="M8.75 14.25a6 6 0 100-12 6 6 0 000 12zM16.25 15.75l-3.225-3.225"
        stroke={color === true ? '#505893': active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LupaIcon;
