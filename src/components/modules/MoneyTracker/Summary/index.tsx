import { summaryList } from '@/mocks/summary';
import { TransactionTypeList } from './TransactionTypeList';
import { ChartTotal } from './ChartTotal';
import { Chart } from './Chart';

export const Summary = () => {
  const filterTerm = 'Net Total';

  const total = summaryList.find((item) => item.type === filterTerm);
  const summaryListSplit = summaryList.filter(
    (item) => item.type !== filterTerm
  );

  return (
    <div className="flex flex-col gap-7 w-100">
      <h2 className="font-bold text-2xl">Summary</h2>

      {total && (
        <ChartTotal total={total}>
          <Chart info={summaryListSplit} totalValue={total.value} />
        </ChartTotal>
      )}

      <TransactionTypeList summaryListSplit={summaryListSplit} />
    </div>
  );
};
