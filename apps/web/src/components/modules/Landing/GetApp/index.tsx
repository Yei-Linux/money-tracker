import { StartAppButton } from '../../@shared/StartAppButton';
import { CallToAction } from '../Hero/CallToAction';

export const GetApp = () => {
  return (
    <div className="p-20 flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="font-bold text-4xl font-snicker">
          Generate, save and earn
        </h4>
        <p>Control your money every time and improve your budget...</p>
      </div>

      <CallToAction />
    </div>
  );
};
