import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SuitCaseIcon({color}: {color: string}) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 24 22"
      fill="none">
      <Path
        d="M12.1 14.2c-.5 0-1-.1-1.5-.2l-8.2-2.5C1.1 11.1.2 9.9.2 8.6V6.8c0-1.7 1.4-3 3-3H21c1.7 0 3 1.4 3 3v1.8c0 1.4-.9 2.5-2.2 2.9L13.6 14c-.5.1-1 .2-1.5.2zM3.3 5.4c-.8 0-1.4.6-1.4 1.4v1.8c0 .6.4 1.1 1 1.3l8.2 2.5c.7.2 1.4.2 2.1 0l8.2-2.5c.6-.2 1-.7 1-1.3V6.8c0-.8-.6-1.4-1.4-1.4H3.3z"
        fill={color}
      />
      <Path
        d="M12.1 11.1c-.5 0-.8-.4-.8-.8V8.4c0-.5.4-.8.8-.8s.8.4.8.8v1.9c.1.4-.3.8-.8.8z"
        fill={color}
      />
      <Path
        d="M17.8 21.5H6.4c-2.9 0-5.3-2.4-5.3-5.3v-6h1.7v6c0 2 1.6 3.6 3.6 3.6h11.4c2 0 3.6-1.6 3.6-3.6v-6h1.7v6c0 3-2.4 5.3-5.3 5.3zM16.6 4.6H15V3c0-.8-.6-1.4-1.4-1.4h-2.9c-.8 0-1.4.6-1.4 1.4v1.6H7.6V3c0-1.7 1.4-3 3-3h2.9c1.7 0 3 1.4 3 3v1.6h.1z"
        fill={color}
      />
    </Svg>
  );
}

export default SuitCaseIcon;
