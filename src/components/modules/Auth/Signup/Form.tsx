import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MailIcon } from 'lucide-react';

export const SignupForm = () => {
  return (
    <div className="flex flex-col justify-between gap-3 px-4 py-10">
      <div className="flex flex-col gap-10">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Create a new account</DialogTitle>
          <DialogDescription>Already have an account?</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Button className="bg-white text-black border hover:bg-white hover:text-black flex gap-3">
            <img
              width={20}
              height={20}
              src="./assets/google.webp"
              alt="google icon"
            />
            <span>Continue with Google</span>
          </Button>

          <Button className="flex gap-3">
            <MailIcon />
            <span>Continue with Email</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
