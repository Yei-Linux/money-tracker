import { useEffect } from 'react';
import { useToggle } from './@shared/useToggle';
import { toggleWatcherLimitServerAction } from '@moneytrack/web/server-actions/money-account/toggle-watcher-limit';
import { toast } from 'react-hot-toast';
import { useIsMounted } from './@shared/useIsMounted';
import { toastMessages } from '@moneytrack/shared/constants';

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

  const toastMessagesObj = [
    toastMessages.EXPENSE_WATCHER_DISABLED,
    toastMessages.EXPENSE_WATCHER_ENABLED,
  ];
  const toastMessage = toastMessagesObj[+active];

  useEffect(() => {
    if (!isMounted) return;

    toggleWatcherLimitServerAction(active)
      .then(() => toast.success(toastMessage))
      .catch((error) => toast.error(error.message));
  }, [active]);

  return { active, toggle };
};
