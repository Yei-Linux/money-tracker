'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

import 'chart.js/auto';
const PieChart = dynamic(() =>
  import('react-chartjs-2').then((mod) => mod.Pie)
);

import { processInfoChart } from './utils';
import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import { EmptyIcon } from '@moneytrack/web/components/ui/empty';

interface IChart {
  info: TTransactionStats;
  totalValue: number;
}

export const Chart: FC<IChart> = ({ info, totalValue }) => {
  const chartSize = 300;
  const { labels, data, backgrounds } = processInfoChart(info, totalValue);
  const dataChart = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgrounds,
      },
    ],
  };

  return (
    <div style={{ width: chartSize, height: chartSize }}>
      {data.every((item) => item !== 0) ? (
        <PieChart data={dataChart}>Browser does not support js</PieChart>
      ) : (
        <EmptyIcon />
      )}
    </div>
  );
};
