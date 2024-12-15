import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Mark() {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19h.01M8.217 7.697A4.002 4.002 0 0116 9a4.001 4.001 0 01-2.442 3.685c-.74.314-1.111.47-1.24.592a.75.75 0 00-.257.386C12 13.83 12 14.087 12 14.6V16"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Mark;
