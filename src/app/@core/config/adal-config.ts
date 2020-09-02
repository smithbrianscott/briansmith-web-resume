export const adalOptions: adal.Config = {
    tenant: 'tampageneral.onmicrosoft.com',
    clientId: '73143143-ce71-439c-8570-58a57625f10d',
    redirectUri: window.location.origin,
    cacheLocation: 'localStorage',
    endpoints: {
      '/api': '73143143-ce71-439c-8570-58a57625f10d',
    },
    extraQueryParameter: "domain_hint=tgh.org",
};
