import React, { useEffect, useState } from 'react';

import { queryAlgolia } from '../../utils/queryAlgolia';

export const DriftContext = React.createContext<
  | {
      initializing: boolean;
      loading: boolean;
    }
  | undefined
>(undefined);

DriftContext.displayName = 'DriftContext';

export function DriftProvider({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // @ts-ignore
    if (window?.drift && initializing) {
      // @ts-ignore
      window.drift.on('ready', function (api) {
        setInitializing(false);
        // @ts-ignore
        window.drift.on('conversation:buttonClicked', async (response) => {
          if (!!response.questionId) return;
          try {
            setLoading(true);
            const queryResponse = await queryAlgolia(response.buttonBody);

            if (!queryResponse || queryResponse?.error) {
            } else if (!queryResponse?.data?.hits?.length) {
              console.log('[ DRIFT ] NO RESULTS');
            } else {
              // TODO: Need to force a navigation to remove the previous drift playbook, find a better approach.
              // router.push(`${queryResponse.data.hits[0].path}#feedback`);
              window.location.replace(`${queryResponse.data.hits[0].path}#feedback`);
            }
          } catch (err) {
            console.log('[ DRIFT ] ERROR', err);
          } finally {
            setLoading(false);
          }
        });
      });
    }
  }, [initializing, setInitializing, setLoading]);

  const value = {
    initializing,
    loading
  };

  return <DriftContext.Provider value={value}>{children}</DriftContext.Provider>;
}
