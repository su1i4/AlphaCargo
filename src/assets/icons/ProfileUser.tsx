import * as React from 'react';
import Svg, {Path, Mask, G, Defs, LinearGradient, Stop} from 'react-native-svg';

function ProfileUser() {
  return (
    <Svg width={53} height={53} viewBox="0 0 53 53" fill="none">
      <Path
        opacity={0.5}
        d="M26.5 52.5c14.414 0 26.1-11.73 26.1-26.2C52.6 11.83 40.914.1 26.5.1 12.085.1.4 11.83.4 26.3c0 14.47 11.685 26.2 26.1 26.2z"
        fill="url(#paint0_linear_3115_13633)"
      />
      <Path
        d="M26.5 33.899c5.854 0 10.6-4.746 10.6-10.6 0-5.854-4.746-10.6-10.6-10.6-5.854 0-10.6 4.746-10.6 10.6 0 5.854 4.746 10.6 10.6 10.6z"
        stroke="#2B3F6C"
        strokeWidth={4}
        strokeMiterlimit={10}
      />
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={53}
        height={53}>
        <Path
          d="M26.5 52.5c14.414 0 26.1-11.73 26.1-26.2C52.6 11.83 40.914.1 26.5.1 12.085.1.4 11.83.4 26.3c0 14.47 11.685 26.2 26.1 26.2z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M26.5 59.899c11.543 0 20.9-4.746 20.9-10.6 0-5.854-9.357-10.6-20.9-10.6S5.6 43.445 5.6 49.3c0 5.854 9.357 10.6 20.9 10.6z"
          stroke="#2B3F6C"
          strokeWidth={4}
          strokeMiterlimit={10}
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3115_13633"
          x1={5.6704}
          y1={36.7803}
          x2={52.3475}
          y2={13.3516}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#009DE1" />
          <Stop offset={0.2189} stopColor="#1FA5B9" />
          <Stop offset={0.7067} stopColor="#6EB856" />
          <Stop offset={1} stopColor="#A0C417" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ProfileUser;
