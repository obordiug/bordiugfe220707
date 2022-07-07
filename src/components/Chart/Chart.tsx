import React, { useState, useMemo, useEffect } from 'react';
import './Chart.scss';

const initialData: Data[] = [
  { name: 'Landing Page', time: 7.4 },
  { name: 'Configurator', time: 0.2 },
  { name: 'Check-out', time: 7.0 },
  { name: 'Deal', time: 3.8 },
];

export const Chart: React.FC = () => {
  const [visibleData, setVisibleData] = useState(initialData);

  const allTime = useMemo(() => {
    return +visibleData.reduce((sum, current) => sum + current.time, 0).toFixed(2);
  }, [visibleData]);

  useEffect(() => {
    let getVisibleDate = visibleData.map(item => {
      return {
        ...item,
        width: +((item.time * 100) / allTime).toFixed(2),
      };
    });

    getVisibleDate = getVisibleDate.map((item, index) => {
      return {
        ...item,
        shift: getVisibleDate.slice(0, index)
          .reduce((sum, current) => sum + current.width, 0).toFixed(2),
      };
    });

    setVisibleData(getVisibleDate);
  }, [allTime]);

  const handleClick = () => {
    const randomData = visibleData.map(item => {
      return {
        ...item,
        time: +(Math.random() * 10).toFixed(1),
      };
    });

    setVisibleData(randomData);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClick();
    }, 30000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="chart">
      <h1 className="chart__title">Spent time (seconds)</h1>
      <ul className="chart__list">
        {visibleData.map(item => (
          <li key={item.name} className="chart__item">
            <div className="chart__data">
              <div className="chart__name">{item.name}</div>
              <div className="chart__time">
                <div
                  className="chart__time-item"
                  style={{
                    backgroundColor: '#f096a2',
                    width: `${item.width}%`,
                    textAlign: 'center',
                    marginLeft: `${item.shift}%`,
                  }}
                >
                  {item.time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="chart__button">
        <button
          type="button"
          className="chart__button-random"
          onClick={handleClick}
        >
          Random
        </button>
      </div>
    </div>
  );
};
