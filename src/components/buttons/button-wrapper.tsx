import { styled } from 'styled-components';

import { noop } from '../../utils/helper';

interface Props extends StyledProps {
  children: React.JSX.Element;
  className?: string;
  title?: string;
  id?: string;
  onClick?: () => void;
}

interface StyledProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const Container = styled.div<StyledProps>`
  min-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
  max-height: ${(props) => props.height}px;

  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.backgroundColor};
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
      onClick={onClick}
      title={title}
      id={id}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      className={`common-button-wrapper flex justify-center items-center ${className}`}
    >
      {children}
    </Container>
  );
}
