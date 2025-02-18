import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NewFlip() {
  return (
    <Svg width={26} height={27} viewBox="0 0 26 27" fill="none">
      <Path
        d="M13.5 13.3h-2.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h2.4c.5 0 .9.4.9.9s-.4.9-.9.9z"
        fill="#A0C417"
      />
      <Path
        d="M12.9 26.4C5.9 26.4.1 20.7.1 13.6.1 6.6 5.8.8 12.9.8c7.1 0 12.8 5.7 12.8 12.8 0 7.1-5.7 12.8-12.8 12.8zm0-23.8c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11z"
        fill="#A0C417"
      />
      <Path
        d="M13.5 20.5c-.5 0-.9-.4-.9-.9v-7.1c0-.5.4-.9.9-.9s.9.4.9.9v7.1c0 .5-.4.9-.9.9zM13.5 9.8c-.5 0-.9-.4-.9-.9V7.7c0-.5.4-.9.9-.9s.9.4.9.9v1.2c0 .5-.4.9-.9.9z"
        fill="#A0C417"
      />
    </Svg>
  );
}

export default NewFlip;
