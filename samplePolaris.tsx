/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import StoreContext from '@pega/react-sdk-components/lib/bridge/Context/StoreContext';
import createPConnectComponent from '@pega/react-sdk-components/lib/bridge/react_pconnect';
import { SdkConfigAccess, loginIfNecessary, getAvailablePortals } from '@pega/auth/lib/sdk-auth-manager';
import { compareSdkPCoreVersions } from '@pega/react-sdk-components/lib/components/helpers/versionHelpers';
import { Button } from '@material-ui/core';
import { getSdkComponentMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';
import localSdkComponentMap from '../../sdk-local-component-map';
import { theme } from '../theme';
import axios from 'axios';
import { token } from '../../GenerateToken/webservice';

declare const myLoadPortal: any;
declare const myLoadDefaultPortal: any;

interface TokenInfo {
  token_type: string;
  access_token: string;
}

interface ConfigObj {
  restServerUrl: string;
  customRendering: boolean;
  onPCoreReadyCallback: () => void;
  staticContentServerUrl: string;
  authInfo?: Record<string, any>; // Optional
  theme?: Record<string, any>; // Optional
  renderingMode: 'view' | 'edit'; // Assuming these are the valid options
  appAlias: 'polaris-ec';
}

// Define the configuration object
const configObj: ConfigObj = {
  restServerUrl:
    'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec/2jg7ujy75GL4_eOdtNcGNfkaKBTlNIeN*/!STANDARD?pzuiactionzzz=CXtpbn1nakt1UEFNL0E4R0h5WTZEcVBTaE1jeGNIekJsSXBOamJhU2s5V3JJQVVvaWtYTWVJcTN1SElmYVBxTUtDQkZReG5zL0lYM2VleVE0dENvQU9Ha3g4cVVOYm9zbXJGWS9uSDJQRjJBMTVFejc1bmtBWmZISkRWZytXbjBLeFpRMDhBSTMzMlNRVG9lZ3lkTzYyenJxZitLakEvTXlrakxhUmc0T2hVaVlqaXlIVDVQSUJwQjNua3VvTURTSmpCdmFuTzhvSUtOMzFOYkpJSjNQR09EbWpDQUFWSnBodlVWNk94UGlHYVlyaGcrWnYzWDVaY0dlOXpCTU55NkVUK05JRVh6MzMvbjJjeDV4OWtEbVpUSFpuSjRJV3RFcVhhQU5BM3NZU0RjZGlNQ2xBZVJ5MFZ5eG5mQjZhVDQ1QXZSY29LUEdJVDRqRFY0blJxSnR1Um9JVmhleExxWFREbENuSTJROFNZT200Vis2Q0pYU3I3TFNxa0dNeVZVMHdUdmpOdzMrV0tRSmF6MWo2bFNHd3BIR3lET3F2T0NPckpnUU5ndi9KcU5GckpOVHY3WUJZZWN0NTE3QVlpV2tXMWM0UnBwNXl5Q1BVYzFjaVdXcUZFcmx1QkFINUpicEt5aVM1OWhxODA0TkxEd3BxS0dwS3FKZEVVZVFiSEVUWVBkSHAyREd6NlBTVldHNFlHKzI2aWR2SU4rU1pCN1k0UWJ1bDRnOWlCMFBmVVJyWGlZek94TVBLbHVncWJSUlRNUlQ%3D*&cookies=none&pgrules=%7Batn%7De3ByfVRKenJoKzg0VGpPenlrT0Z4Z1ZqTS9UR04rMzNZa0tUcmpneFhQUS9zRGd0aEdCYVI4VG5YeXprMDJBbXpZTlFrb2xSL2VaNEJWckoKbVJ5eHVzQXRYUT09',
  customRendering: false,
  onPCoreReadyCallback: () => {
    console.log('PCore is ready!');
  },
  staticContentServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec/api/application/v2/portals/WebPortal',
  // staticContentServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec/2jg7ujy75GL4_eOdtNcGNfkaKBTlNIeN*/!STANDARD?pzuiactionzzz=CXtpbn1nakt1UEFNL0E4R0h5WTZEcVBTaE1jeGNIekJsSXBOamJhU2s5V3JJQVVvaWtYTWVJcTN1SElmYVBxTUtDQkZReG5zL0lYM2VleVE0dENvQU9Ha3g4cVVOYm9zbXJGWS9uSDJQRjJBMTVFejc1bmtBWmZISkRWZytXbjBLeFpRMDhBSTMzMlNRVG9lZ3lkTzYyenJxZitLakEvTXlrakxhUmc0T2hVaVlqaXlIVDVQSUJwQjNua3VvTURTSmpCdmFuTzhvSUtOMzFOYkpJSjNQR09EbWpDQUFWSnBodlVWNk94UGlHYVlyaGcrWnYzWDVaY0dlOXpCTU55NkVUK05JRVh6MzMvbjJjeDV4OWtEbVpUSFpuSjRJV3RFcVhhQU5BM3NZU0RjZGlNQ2xBZVJ5MFZ5eG5mQjZhVDQ1QXZSY29LUEdJVDRqRFY0blJxSnR1Um9JVmhleExxWFREbENuSTJROFNZT200Vis2Q0pYU3I3TFNxa0dNeVZVMHdUdmpOdzMrV0tRSmF6MWo2bFNHd3BIR3lET3F2T0NPckpnUU5ndi9KcU5GckpOVHY3WUJZZWN0NTE3QVlpV2tXMWM0UnBwNXl5Q1BVYzFjaVdXcUZFcmx1QkFINUpicEt5aVM1OWhxODA0TkxEd3BxS0dwS3FKZEVVZVFiSEVUWVBkSHAyREd6NlBTVldHNFlHKzI2aWR2SU4rU1pCN1k0UWJ1bDRnOWlCMFBmVVJyWGlZek94TVBLbHVncWJSUlRNUlQ%3D*&cookies=none&pgrules=%7Batn%7De3ByfVRKenJoKzg0VGpPenlrT0Z4Z1ZqTS9UR04rMzNZa0tUcmpneFhQUS9zRGd0aEdCYVI4VG5YeXprMDJBbXpZTlFrb2xSL2VaNEJWckoKbVJ5eHVzQXRYUT09',
  authInfo: {}, // Optional
  theme: {}, // Optional
  renderingMode: 'view',
  appAlias: 'polaris-ec'
};

const restServerUrl = 'https://samcrm-dev.express-scripts.com/samcrm';

const tokenInfo: TokenInfo = {
  token_type: 'bearer',
  access_token:
    'eyJraWQiOiI3NjhhMWI0ODk0MjdiZGE0Mzc2NjAzNWYyZDhjMWZiNSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ1cm46NTA3NjY4MzE3NDU2NTkxMTk2MDEiLCJzdWIiOiJDb25zdFVzZXIiLCJhcHBfbmFtZSI6IlBvbGFyaXNFUCIsIm5iZiI6MTcyNDMzNzA5NSwiYXBwX3ZlcnNpb24iOiIwMS4wMS4wMSIsInNjb3BlIjpbImFwcC5hbGlhcy5wb2xhcmlzLWVjIiwicHJvZmlsZSIsImVtYWlsIl0sImlzcyI6InVybjpzYW1jcm0tZGV2LmV4cHJlc3Mtc2NyaXB0cy5jb20iLCJwc3luY19pZCI6ImZkZWQwYjI4Njg5ZDc2ZDA3YTMzNjE5NzU0Y2FmZjYyIiwiZXhwIjoxNzI0MzQwNjk1LCJpYXQiOjE3MjQzMzcwOTUsImp0aSI6ImI2NWRkNDU1ZGU1YzE5ODA3YTg4NGY5YzBiMDM4YjUwIiwib3BlcmF0b3JfYWNjZXNzIjoiUG9sYXJpc0VQOlVzZXJzIn0.gwHcjj03BYGCPfG5C2wI8RqcyW1h5lbBEh1V0P3xKg4aE32nsgNmJhcVoSUYqiisP7DNuhT_i-pyboC3mkIdocglY3jGHjp8R8yEuzqaaoDkik8cZdLgixtGEpsxrCy0JT1U58fEFdINsZEvYnccpFg1x5FuZegc_XsTt5vZT60ihCKgzyU4zAL12LH6pTvlGYBaAC21buYHA5rZK4GUr0WhbZhVdFr8Y0BN04EgA6QvP6KiB3X3tZSYBqRVNReZkL_OEDHlid049IEmaVNpfnnvfnvJBZiVtYWjsYwJI9uJHmKDJVLL8IyF8QN4Um-4FwvCNeibTWbvQRW_XgH_FqLsLi8BXqvz6CvVqSLq33ZPe7Rs6015B4w6wc2yLIBWeLsUWmlpwyQHCH0iYzLPEOFeOeqc0BHx3o1jqnoBMFfKnpJMWbrlu2MGUg2RcacwP8lZVnPxSb9NOYi1Gr9nggYZ1YkdDAjcjAa-UVDh1Z6uFYbJr2ZCdks9WHkTmnFBu0O5tOHtYyQbSZNU5KXTJZK104WWNN40BvndgmKdUmvoDhTCbg-fyGLCZbp-gbmy97EKnFUrgs5nOcV_anVQcmpVctXm7r6a086MLN0qD6Vj69Tbk0IG5K8TDJ45gV2urvTXPCIXo20oBnCh15bArdWLOEBrEhbJp8NjS9EQV-A'
};

export default function FullPortal() {
  // useEffect(() => {
  //   const fetchCases = async () => {
  //     try {
  //       const response = await axios.get('https://samcrm-dev.express-scripts.com/samcrm/app/polaris-ec/api/application/v2/cases?viewType=page', {
  //         headers: { Authorization: '' }
  //       });
  //       console.log('response is ==', response.data);
  //     } catch (error) {
  //       console.log('response error message', error);
  //       // setError(error.message);
  //     }
  //   };
  //   // fetchCases();
  // }, []);

  const createCase = async () => {
    const config = {
      appAlias: 'app/polaris-ec',
      // appAliasWithoutServlet: 'app/polaris-ec',
      restServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec',
      customRendering: 'false',
      onPCoreReadyCallback: () => {
        console.log('PCore is ready!');
      },
      staticContentServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec/api/application/v2/portals/WebPortal',
      renderingMode: 'view'
    };

    // console.log('Config object:', config);

    // PCore.getInitialiser().initCoreContainers(options);
    // const initializer = PCore.getInitialiser[].getBootstrapConfig();
    // const { getBootstrapConfig } = PCore.getInitialiser();
    // const { initCoreContainers } = PCore.getInitialiser();
    const restServerUrl = 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec';
    console.log('Deep 3: ==', token);
    const tokenurl = {
      token_type: 'Bearer',
      access_token:
        'eyJraWQiOiI2R1pIU1picFktRjE5Vi1JWUVsUmFaOGtUN1RxOVlreGtVQVNzTFl6VUY4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnRiY0lLak9sZ1dVdlBxbi03d1lFVTc1TnJDU3FxZzdPV0Z1YVo4dnBpMm8iLCJpc3MiOiJodHRwczovL2NpZ25hLm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzMW12dGQxOTZ1QTFoMDMwaDgiLCJhdWQiOiJhcGk6Ly9hdXRoYWRtaW4iLCJpYXQiOjE3MjQ2NTMxNjMsImV4cCI6MTcyNDY1Njc2MywiY2lkIjoiMG9hMW5hbXdiYmJyTmd1eXkwaDgiLCJ1aWQiOiIwMHUxbHdkZno2Z0lEcFJjODBoOCIsInNjcCI6WyJwcm9maWxlIiwiZW1haWwiLCJvcGVuaWQiXSwiYXV0aF90aW1lIjoxNzI0NjQ5NTg4LCJzdWIiOiJINzcyODEiLCJsYXN0TmFtZSI6IlNoYXJtYSIsImVudC5hcHBOYW1lIjoiUG9sYXJpcyBSZWFjdCAtIERFViIsImVudC52ZXIiOiIxLjAiLCJtYW5hZ2VyIjoiQ049QnV0bGVyXFwsIFBhdWwgRS4gKFNUTCksT1U9RG9tYWluRE9EVXNlcnMsT1U9VXNlcnNHcm91cHMsREM9YWNjb3VudHMsREM9cm9vdCxEQz1jb3JwIiwiZGlzcGxheU5hbWUiOiJTaGFybWEsIERlZXBpa2EgIChDVFIpIiwic2FtQWNjb3VudE5hbWUiOiJINzcyODEiLCJmdWxsTmFtZSI6IkRlZXBpa2EgU2hhcm1hIiwiZW50LmVudiI6ImRldiIsImVtcGxveWVlSUQiOiI1NzcyODEiLCJsYW5JRCI6Ikg3NzI4MSIsInRpdGxlIjoiU09XIFdvcmtlcnMiLCJsb2dpbiI6ImFjY291bnRzXFxINzcyODEiLCJlc3J4LnJvb3QiOnRydWUsImZpcnN0TmFtZSI6IkRlZXBpa2EiLCJlbnQudG9rZW5UeXBlIjoidXNlci1pbnQiLCJlbnQuZG9tYWluIjoiYWNjb3VudHMiLCJkZXBhcnRtZW50IjoiSVQtUEJNIFBvbGFyaXMiLCJlbWFpbCI6IkRlZXBpa2EuU2hhcm1hQGV2ZXJub3J0aC5jb20ifQ.Ub9qD0EoudeXCJDytYdsbM0iOJwL0hySICf8KwY6yjQQm5sIhA3PyUQindoiwA1eNO74XIDokHbDfG0UmhZqjBMebYb9rsHDY52ODKKE24Fe8CrfrUWnFN1rSQeGfd88Gwh1Cpu_z7L6WveiqyVsbSa2eTfbnhNJMx5pBGXmcLKnV26rgeI1PvZ5tdJXhdEkKdoo18S_-u0wo6Y_rUohgtviDtpUMr9MUz7J5rlJKhWn033YuyVLBxJUf9P0S_CWESoMqXG2UPi09Wy8KpKcCQhl1xNdf8UXUgLfTJk9bkbjxRQ-G_D-NwhJ0wpde-S8GKg9XwLR_amaMezi4wLn4g'
    };

    // const app = await getBootstrapConfig(restServerUrl, tokenurl);

    // const resu = await initCoreContainers();
    // if (app) {
    //   console.log('Initializer object:', app);
    const creatcase = PCore.getMashupApi().createCase('cn11');
    if (creatcase) {
      console.log(creatcase, 'Case Created');
    }

    // if (resu) {
    //   //console.log('initCoreContainers', resu.props.getPConnect().getCaseInfo().caseTypeID());
    //   // const response = await resu.props.getPConnect().getCaseInfo();
    //   // const caseKey = await resu.props.getPConnect().getCaseInfo().caseTypeID();
    //   // if(response)
    //   // {
    //   //   console.log(caseKey);
    //   // }
    // }
    // const { init } = PCore.getInitialiser();
    // init(config);
  };

  return (
    <div>
      {' '}
      <Button
        onClick={() => {
          createCase();
        }}
      >
        Create Case
      </Button>
    </div>
  );
}
