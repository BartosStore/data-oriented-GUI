export const environment = {
  production: true,
  backend: {
    apiBaseUrl: '%api-url-placeholder%',
  },
  keycloak: {
    url: '%keycloak-url-placeholder%',
    realm: 'admin',
    clientId: 'admin_fe',
  },
  batchesFetchInterval: 10000,
  enabledStatistics: false,
  disabledSecurity: true
};
