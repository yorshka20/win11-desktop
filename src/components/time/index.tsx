import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ButtonWrapper } from '../buttons/button-wrapper';

const TimeContent = styled.span`
  font-size: 12px;
  transform: scale(0.7);
  text-align: right;
`;

export const TimeBlock = React.memo(() => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    // update time every 5 second
    const timeTimer = setInterval(() => {
      setTime(moment().format('HH:mm'));
      setDate(moment().format('YYYY/MM/DD'));
    }, 1000 * 5);

    return () => {
      clearInterval(timeTimer);
    };
  }, []);

  return (
    <ButtonWrapper className="h-[30px] select-none flex justify-end items-center">
      <TimeContent className="flex flex-col justify-center items-end float-right">
        {time}
        <br />
        {date}
      </TimeContent>
    </ButtonWrapper>
  );
});
