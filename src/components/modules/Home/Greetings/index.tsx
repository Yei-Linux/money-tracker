export const Greetings = () => {
  return (
    <div className="flex justify-center items-center gap-1 w-full p-4 border shadow-sm">
      <div className="font-semibold text-4xl">
        <span className="font-snicker">Welcome Back Jesus</span> !
      </div>
      <img
        width={100}
        height={100}
        src="./assets/welcome-pig.gif"
        alt="pet animated running"
      />
    </div>
  );
};
