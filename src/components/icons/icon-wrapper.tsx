import React from 'react';
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

export const IconWrapper = React.memo(
  ({ size = 24, className = '', src }: IconWrapperProps) => (
    <Img className={className} size={size} src={src} />
  ),
);
