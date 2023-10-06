import moment from 'moment';
import { useEffect, useState } from 'react';

import { ButtonWrapper } from '../buttons/button-wrapper';
import './style.less';

export function TimeBlock() {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const timeTimer = setInterval(() => {
      setTime(moment().format('HH:mm'));
    }, 1000);
    const dateTimer = setInterval(() => {
      setDate(moment().format('YYYY/MM/DD'));
    }, 1000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(dateTimer);
    };
  }, []);

  return (
    <ButtonWrapper className="time-block flex justify-end items-center">
      <span className="flex flex-col justify-center items-end float-right">
        {time}
        <br />
        {date}
      </span>
    </ButtonWrapper>
  );
}
