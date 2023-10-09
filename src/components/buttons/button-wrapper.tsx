import classNames from 'classnames';
import { styled } from 'styled-components';

import { noop } from '../../utils/helper';

interface Props {
  children: React.JSX.Element;
  className?: string;
  title?: string;
  id?: string;
  onClick?: () => void;

  // styled props.
  width?: number;
  height?: number;
  backgroundColor?: string;
}

interface StyledProps {
  $width?: number;
  $height?: number;
  $backgroundColor?: string;
}

const Container = styled.div<StyledProps>`
  min-width: ${(props) => props.$width}px;
  min-height: ${(props) => props.$height}px;
  max-height: ${(props) => props.$height}px;

  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.$backgroundColor};
  }
`;

export function ButtonWrapper({
  children,
  title,
  id,
  className = '',
  onClick = noop,
  width = 30,
  height = 30,
  backgroundColor = 'rgba(240, 248, 255, 0.8)',
}: Props) {
  return (
    <Container
      id={id}
      title={title}
      onClick={onClick}
      className={classNames(
        'common-button-wrapper',
        'flex justify-center items-center',
        `${className}`,
      )}
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
    >
      {children}
    </Container>
  );
}
