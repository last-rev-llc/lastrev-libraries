declare var Osano: {
  cm: {
    showDrawer(key: string): void;
  };
};

const linkActionTypePropsMapper = (actionType?: string): Object => {
  switch (actionType) {
    case 'openCookieConsentDialog':
      return {
        component: 'button',
        onClick: () => {
          if (typeof Osano !== 'undefined') {
            Osano?.cm?.showDrawer('osano-cm-dom-info-dialog-open');
          } else {
            // send log here so we know it's not working
            console.log('[Cookie Consent]: Osano script not loaded, check Osano script in Google Tag Manager');
          }
        }
      };
    default:
      return {};
  }
};

export default linkActionTypePropsMapper;
