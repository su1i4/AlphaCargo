import * as React from 'react';
import Svg, {Mask, Path, G} from 'react-native-svg';

function WebWorld() {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={17}
        height={17}>
        <Path d="M16.1.9H.9v15.2h15.2V.9z" fill="#fff" />
      </Mask>
      <G mask="url(#a)" fill="#203B7A">
        <Path d="M8.5 16.1C4.3 16.1.9 12.7.9 8.5.9 4.3 4.3.9 8.5.9c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6zM8.5 2C4.9 2 2 4.9 2 8.5S4.9 15 8.5 15 15 12.1 15 8.5 12.1 2 8.5 2z" />
        <Path d="M15.5 9H1.4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h14.1c.3 0 .5.2.5.5s-.2.5-.5.5z" />
        <Path d="M8.5 16.1c-.2 0-.3-.1-.4-.2-1.7-2.1-2.7-4.6-2.8-7.4.1-2.8 1.1-5.3 2.8-7.4.2-.3.6-.3.8 0 1.7 2.1 2.7 4.6 2.8 7.4v.1c-.1 2.7-1.1 5.3-2.8 7.4-.1 0-.3.1-.4.1zm0-13.8C7.2 4.1 6.4 6.2 6.3 8.5c.1 2.2.9 4.3 2.2 6.1 1.3-1.8 2-3.9 2.2-6.1-.2-2.3-.9-4.4-2.2-6.2z" />
      </G>
    </Svg>
  );
}

export default WebWorld;
