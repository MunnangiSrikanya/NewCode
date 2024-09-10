/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const CLIENT_ID = '0oa1namwbbbrNguyy0h8';
// const ISSUER = 'https://cigna.okta.com/login/agentlessDsso/auth';
const ISSUER = 'https://cigna.oktapreview.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = false;
// const BASENAME = 'https://cigna.oktapreview.com/';
const REDIRECT_URI = `${window.location.origin}/callback`;
// 'http://localhost:3000/callback'; //

const authConfig = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    cookies: {
      secure: true
    },
    tokenManager: {
      storage: 'localStorage',
      autorenew: false
    }
  }
};

export default authConfig;
