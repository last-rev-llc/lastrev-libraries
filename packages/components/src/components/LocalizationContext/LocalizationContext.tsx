import React from 'react';
import { CommonResourceProps } from './CommonResource.types';

import createLocalizationLookup from '../../utils/createLocalizationLookup';

export const LocalizationContext = React.createContext({});

interface Props {
  localizationLookup: CommonResourceProps[] | undefined;
  children: React.ReactElement;
}

export const LocalizationProvider = ({ localizationLookup, children }: Props) => {
  return (
    <LocalizationContext.Provider value={createLocalizationLookup(localizationLookup)}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalizationContext = () =>
  React.useContext<{ [key: string]: CommonResourceProps }>(LocalizationContext);

export default LocalizationContext;
