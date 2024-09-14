import { useEffect } from 'react';
import { useToggle } from './@shared/useToggle';
import { toggleWatcherLimitServerAction } from '@/server-actions/settings/toggle-watcher-limit';
import { toast } from 'react-hot-toast';
import { useIsMounted } from './@shared/useIsMounted';

type UseToggleWatcherLimit = {
  watcherLimitDefaultValue: boolean;
};

export const useToggleWatcherLimit = ({
  watcherLimitDefaultValue,
}: UseToggleWatcherLimit) => {
  const isMounted = useIsMounted();
  const { active, toggle } = useToggle({
    defaultValue: watcherLimitDefaultValue,
  });

  const toastMessages = [
    'You just disactivate your watcher!',
    'You just activate your watcher!',
  ];
  const toastMessage = toastMessages[+active];

  useEffect(() => {
    if (!isMounted) return;

    toggleWatcherLimitServerAction(active)
      .then(() => toast.success(toastMessage))
      .catch((error) => toast.error(error.message));
  }, [active]);

  return { active, toggle };
};
