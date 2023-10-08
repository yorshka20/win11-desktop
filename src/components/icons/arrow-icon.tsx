import { styled } from 'styled-components';

import arrowUpGrey from '../../assets/arrow-up-grey.ico';
import arrowUp from '../../assets/arrow-up.ico';

interface Props {
  type: 'up' | 'left' | 'right' | 'down';
  inActive?: boolean;
}

const rotate = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

const Img = styled.img<Props>`
  transform: rotate(${(props) => rotate[props.type]}deg);

  width: 15px;
  height: 15px;
`;

export function ArrowIcon({ type, inActive = false }: Props) {
  return <Img type={type} src={inActive ? arrowUpGrey : arrowUp} />;
}
