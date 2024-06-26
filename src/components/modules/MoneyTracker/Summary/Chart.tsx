'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

import 'chart.js/auto';
const PieChart = dynamic(() =>
  import('react-chartjs-2').then((mod) => mod.Pie)
);

import { processInfoChart } from './utils';
import { TSummaryTransactionTypes } from '@/types/summary';

interface IChart {
  info: TSummaryTransactionTypes;
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
      <PieChart data={dataChart} />
    </div>
  );
};
