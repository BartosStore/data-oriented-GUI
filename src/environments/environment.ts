export const environment = {
  production: false,
  backend: {
    apiBaseUrl: 'http://localhost:8090/api',
  },
  keycloak: {
    url: 'http://localhost:30082/auth',
    realm: 'admin',
    clientId: 'admin_fe'
  },
  batchesFetchInterval: 10000,
  enabledStatistics: true,
  disabledSecurity: true
};
