export const FakeCard = () => {
  return (
    <div className="min-w-[250px] md:min-w-[300px] bg-black text-white rounded-2xl p-4 flex flex-col gap-10 shadow-md">
      <div className="flex justify-between">
        <p>Cardzzz</p>
        <img
          width={60}
          className="h-fit"
          src="./assets/visa-black.png"
          alt="visa-card"
        />
      </div>

      <div className="text-md flex gap-2">
        <div>1 2 3 4</div>
        <div>* * * *</div>
        <div>* * * *</div>
        <div>* * * *</div>
      </div>

      <div className="flex text-xs justify-between">
        <div className="flex flex-col gap-1">
          <p>Card Holder Name</p>
          <p className="font-bold">Jesus</p>
        </div>

        <div className="flex flex-col gap-1">
          <p>Expiry date</p>
          <p className="font-bold">01/30</p>
        </div>
      </div>
    </div>
  );
};