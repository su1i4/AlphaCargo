import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BurgerIcon({size = 19, active, lox}: {size: number, active: boolean, lox?: boolean}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 18" fill="none">
      <Path
        d="M2.75 4.5h13.5M2.75 9h13.5M2.75 13.5h13.5"
        stroke={lox? '#FFFFFF' : active ? '#94C325' : '#8C8C8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BurgerIcon;
