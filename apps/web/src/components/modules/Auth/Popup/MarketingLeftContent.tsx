import {
  DialogHeader,
  DialogTitle,
} from '@moneytrack/web/components/ui/dialog';

export const MarketingLeftContent = () => {
  return (
    <div className="flex flex-col justify-between gap-3 bg-accent px-4 py-10">
      <DialogHeader className="flex flex-col gap-2">
        <DialogTitle>Success starts here</DialogTitle>
        <ol className="max-w-[200px] flex flex-col gap-2 list-decimal text-sm text-muted-foreground ml-4">
          <li>Success starts here</li>
          <li>Quality work done faster</li>
          <li>Access to talent and businesses across the globe</li>
        </ol>
      </DialogHeader>

      <div className="mx-auto w-fit bg-white rounded-full shadow-lg overflow-hidden">
        <img
          width={100}
          height={100}
          src="./assets/pet.gif"
          alt="pet animated running"
        />
      </div>
    </div>
  );
};
