import { styled } from 'styled-components';

export interface IconWrapperProps {
  src: string;
  className?: string;
  size?: number;
}

const Img = styled.img<IconWrapperProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  user-select: none;
  -webkit-user-drag: none;
`;

export function IconWrapper({
  size = 24,
  className = '',
  src,
}: IconWrapperProps) {
  console.log('src', src);
  return <Img className={className} size={size} src={src} />;
}
