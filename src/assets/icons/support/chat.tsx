import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function Chat() {
  return (
    <Svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_15_90)">
        <Path fill="#fff" d="M0 0H24V24H0z" />
        <Path
          d="M20 12a8 8 0 01-11.876 7c-.591-.328-3.637 1.462-4.124 1-.559-.53 1.458-3.33 1.07-4A8 8 0 1120 12z"
          stroke="#000"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_15_90">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Chat;
