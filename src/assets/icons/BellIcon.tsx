import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BellIcon({size = 17, color = '#F9FFFF', strokeWidth = 1}: {size: number; color?: string, strokeWidth?: number}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M4.5 6a4.5 4.5 0 019 0c0 5.25 2.25 6.75 2.25 6.75H2.25S4.5 11.25 4.5 6zM7.725 15.75a1.455 1.455 0 002.55 0M3 1.5C2.1 2.775 1.5 4.275 1.5 6M16.5 6c0-1.725-.6-3.225-1.5-4.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export default BellIcon;
