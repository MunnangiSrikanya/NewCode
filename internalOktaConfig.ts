const oktaDynamicConfig = {
  DEV: { clientId: '0oa1namwbbbrNguyy0h8', issuer: 'https://cigna.oktapreview.com/oauth2/aus1mvtd196uA1h030h8' },
  QA: { clientId: '0oa1pxf5oudea8szh0h8', issuer: 'https://cigna.oktapreview.com/oauth2/default' }
  // UAT: { clientId: '0oa6m5sj4uxQSPPPs1d7', issuer: 'https://evernorth-workforce.oktapreview.com/oauth2/default' },
  // PROD: { clientId: '0oa4vw9qmvtmgfWsR697', issuer: 'https://evernorth-workforce.okta.com/oauth2/default' }
};

const setOktaConfig = (envVars: any) => ({
  issuer: envVars.issuer,
  clientId: envVars.clientId,
  // redirectUri: `${window.location.origin}/callback`,
  redirectUri: `${window.location.origin}/callback`,
  // redirectUri: 'http://localhost:3000/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCode: false,
  cookies: {
    secure: true
  },
  tokenManager: {
    storage: 'localStorage',
    autorenew: false
  }
});

const internalOktaConfig = () => {
  switch (window.location.hostname) {
    case 'pol-ui-dev.hs-salesaccntmgmt-dev.aws.evernorthcloud.com':
      // case 'static-dev-candidate.hs-pbmsm2-mrs-dev.aws.evernorthcloud.com':
      return setOktaConfig(oktaDynamicConfig.DEV);
    case 'polaris-ui-qa-v1.hs-salesaccntmgmt-test.aws.evernorthcloud.com':
      return setOktaConfig(oktaDynamicConfig.QA);
    // case 'static-uat.hs-pbmsm2-mrs-test.aws.evernorthcloud.com':
    //     return setOktaConfig(oktaDynamicConfig.UAT);
    // case 'static-prod.hs-pbmsm2-mrs-prod.aws.evernorthcloud.com':
    // case 'static-prod-candidate.hs-pbmsm2-mrs-prod.aws.evernorthcloud.com':
    //     return setOktaConfig(oktaDynamicConfig.PROD);
    default:
      // eslint-disable-next-line no-console
      console.log('internal Okta url has been picked', oktaDynamicConfig.DEV);
      return setOktaConfig(oktaDynamicConfig.DEV);
  }
};

export default internalOktaConfig;
