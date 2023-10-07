import React from 'react';

export type IconType = string | React.FC<{ className: string }>;

export type Position = [number, number];

export type Size = [number, number];

export type WindowType = 'Explorer' | 'Setting' | 'Image';
