/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44311/Dashboard/',
  commonUrl: 'https://localhost:44311/Common/',
  checkUrl: 'http://localhost:4200/version.json',
  loginUrl: 'http://localhost:4200/#/auth/login'
};
