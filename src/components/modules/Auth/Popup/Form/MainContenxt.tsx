import { EmailProvider } from '../../Providers/EmailProvider';
import { GoogleProvider } from '../../Providers/GoogleProvider';
import { FormHeader } from './FormHeader';

export const MainContent = () => (
  <div className="flex flex-col gap-10">
    <FormHeader />
    <div className="flex flex-col gap-4">
      <GoogleProvider />
      <EmailProvider />
    </div>
  </div>
);
