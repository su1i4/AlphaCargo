import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function LoginSign() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <G
        clipPath="url(#clip0_510_17487)"
        stroke="#8C8C8C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM9 6v3M9 12h.008" />
      </G>
      <Defs>
        <ClipPath id="clip0_510_17487">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default LoginSign;
