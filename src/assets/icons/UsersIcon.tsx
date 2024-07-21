import Svg, {Path} from 'react-native-svg';

function UserIcon({size = 17}: {size: number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.667 14.5v-1.333A2.667 2.667 0 008 10.5H4a2.667 2.667 0 00-2.667 2.667V14.5M6 7.833A2.667 2.667 0 106 2.5a2.667 2.667 0 000 5.333zM14.666 14.5v-1.333a2.666 2.666 0 00-2-2.58M10.666 2.587a2.667 2.667 0 010 5.166"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UserIcon;
