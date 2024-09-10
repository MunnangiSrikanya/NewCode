/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import StoreContext from '@pega/react-sdk-components/lib/bridge/Context/StoreContext';
import createPConnectComponent from '@pega/react-sdk-components/lib/bridge/react_pconnect';
import { SdkConfigAccess, loginIfNecessary, getAvailablePortals } from '@pega/auth/lib/sdk-auth-manager';
import { compareSdkPCoreVersions } from '@pega/react-sdk-components/lib/components/helpers/versionHelpers';
import InvalidPortal from './InvalidPortal';
import { getSdkComponentMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';
import localSdkComponentMap from '../../../sdk-local-component-map';
import { theme } from '../../theme';
import StartingComp from '../startingComp';
import NavBar from './Welcome';
declare const myLoadPortal: any;
declare const myLoadDefaultPortal: any;

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Welcome() {
  const [portalSelectionScreen, setPortalSelectionScreen] = useState(false);
  const [defaultPortalName, setDefaultPortalName] = useState('');
  const [availablePortals, setAvailablePortals] = useState<string[]>([]);

  const history = useHistory();
  const query = useQuery();
  if (query.get('portal')) {
    const portalValue: any = query.get('portal');
    sessionStorage.setItem('rsdk_portalName', portalValue);
  }
  if (query.get('locale')) {
    const localeOverride: any = query.get('locale');
    sessionStorage.setItem('rsdk_locale', localeOverride);
  }
  // async function initializeApp() {
  //   const config = {
  //     appAlias: 'app/polaris-ec',
  //     // appAliasWithoutServlet: 'app/polaris-ec',
  //     restServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec',
  //     customRendering: 'false',
  //     onPCoreReadyCallback: () => {
  //       console.log('PCore is ready!');
  //     },
  //     staticContentServerUrl: 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec/api/application/v2/portals/WebPortal',
  //     renderingMode: 'view'
  //   };
  //   const { getBootstrapConfig } = PCore.getInitialiser();
  //   const { initCoreContainers } = PCore.getInitialiser();
  //   const restServerUrl = 'https://samcrm-dev.express-scripts.com/samcrm/PRAuth/app/polaris-ec';
  //   const tokenurl = {
  //     token_type: 'Bearer',
  //     access_token:
  //       'eyJraWQiOiI3NjhhMWI0ODk0MjdiZGE0Mzc2NjAzNWYyZDhjMWZiNSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ1cm46NTA3NjY4MzE3NDU2NTkxMTk2MDEiLCJzdWIiOiJDb25zdFVzZXIiLCJhcHBfbmFtZSI6IlBvbGFyaXNFUCIsIm5iZiI6MTcyNDM0MzY4MiwiYXBwX3ZlcnNpb24iOiIwMS4wMS4wMSIsInNjb3BlIjpbImFwcC5hbGlhcy5wb2xhcmlzLWVjIiwicHJvZmlsZSIsImVtYWlsIl0sImlzcyI6InVybjpzYW1jcm0tZGV2LmV4cHJlc3Mtc2NyaXB0cy5jb20iLCJwc3luY19pZCI6IjQ4MzdmNDNiOTcwZGVlODhkODVjZjFiY2EzZDdhZmVkIiwiZXhwIjoxNzI0MzQ3MjgyLCJpYXQiOjE3MjQzNDM2ODIsImp0aSI6ImQzNGFmYTkwYzhmOWQ3YjQxNGZhNjZmZGI2OGI0OGFkIiwib3BlcmF0b3JfYWNjZXNzIjoiUG9sYXJpc0VQOlVzZXJzIn0.JJOtSBdpfiYYCcFHn12IZPrxIRbq9XBzXSeUmiYr6UQ5cMvpPcNDVcsqY0nkrv04vR-L61VKo2Ym9EjLfHsgmTWRe_q4lcnjraEHF988puy-IxR0GG7eYTi7nW8zs14RMvpImtLEyt16Sy7Vvg-cjd0V12vi8PimKUL-kiTJw2PMKgtMLFmotpmYqrWtwmV0A6RoIMlE2EbbvbeW-KxjMrEn8kC2mydtPMDOq2aVFjNaOEncG-6eY62LMdtsgfetJRCN7KsfTLEvOVh6wfvdLbSmS25SkkT9Q7SHpTPRWhLKed_kPtK2T5AY0eHpt2YOv0WNb5OFoSmfGHJYbu4tUi_aDye9r4QXIRkt5sbgtmQ3umJBiV6roAqw9dnCJMiLI1NtInXQwp52M2exNVMnpsU7DGG0P0oCc-fEvI6Bl9kkB0fgEIhSJ3zX0KZ45nixzLT7_AN9x7_XFxuIZh71GtVX0Dy_QVcQ3Yy7NoR8N0bzEavLcjjAXuCPODNxiuPfPyYLOYMKgZ0-8CQLwJwEuPHmfrPkS9AHxYGAEjEMvkiHjH1CETPXxzqfDOjMW2W6GSIBynbgx3jHkQR54WL7jEvRm86URn2G0n9QO1I1LkAJw7AtOU272o0yzVreEaen3by8YSXzfQjFI715A1aFrsX-P1n0acdG8wbaWkrdLAA'
  //   };

  //   const app = await getBootstrapConfig(restServerUrl, tokenurl);

  //   const creatcase = PCore.getMashupApi().createCase('ESI-Cust-Polaris-Work-Process-Intent');
  //   if (creatcase) {
  //     console.log(creatcase, 'Case Created');
  //   }
  //   const resu = await initCoreContainers();
  //   if (app) {
  //     console.log('Initializer object:', app);
  //   }
  //   const { init } = PCore.getInitialiser();
  //   init(config);
  // }

  //  const outlet = document.getElementById("outlet")
  // from react_root.js with some modifications

  function RootComponent(props) {
    const PegaConnectObj = createPConnectComponent();
    // const thePConnObj = <div>the RootComponent</div>;
    const thePConnObj = <PegaConnectObj {...props} />;

    return (
      <StoreContext.Provider value={{ store: PCore.getStore() }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {thePConnObj}
        </ThemeProvider>
      </StoreContext.Provider>
    );
  }

  /**
   * Callback from onPCoreReady that's called once the top-level render object
   * is ready to be rendered
   * @param inRenderObj the initial, top-level PConnect object to render
   */
  function initialRender(inRenderObj) {
    // modified from react_root.js render
    const { props, domContainerID = null, componentName, portalTarget, styleSheetTarget } = inRenderObj;
    let target: any = null;
    if (domContainerID !== null) {
      target = document.getElementById(domContainerID);
    } else if (portalTarget !== null) {
      target = portalTarget;
    }
    const Component: any = RootComponent;
    if (componentName) {
      Component.displayName = componentName;
    }

    // 1st arg was:
    // <Component
    //   {...props}
    //   portalTarget={portalTarget}
    //   styleSheetTarget={styleSheetTarget}
    // />,

    // var theComponent = <div>the Component</div>;
    const theComponent = (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} portalTarget={portalTarget} styleSheetTarget={styleSheetTarget} />;
      </ThemeProvider>
    );
  }

  /**
   * kick off the application's portal that we're trying to serve up
   */
  function startPortal() {
    // NOTE: When loadMashup is complete, this will be called.
    PCore.onPCoreReady(renderObj => {
      // Check that we're seeing the PCore version we expect
      compareSdkPCoreVersions();

      // Initialize the SdkComponentMap (local and pega-provided)

      getSdkComponentMap(localSdkComponentMap).then((theComponentMap: any) => {
        console.log(`SdkComponentMap initialized`);

        // Don't call initialRender until SdkComponentMap is fully initialized
        initialRender(renderObj);
      });
    });

    // load the Portal and handle the onPCoreEntry response that establishes the
    //  top level Pega root element (likely a RootContainer)

    const { appPortal: thePortal, excludePortals } = SdkConfigAccess.getSdkConfigServer();
    const defaultPortal = PCore?.getEnvironmentInfo?.().getDefaultPortal?.();
    const queryPortal = sessionStorage.getItem('rsdk_portalName');

    // Note: myLoadPortal and myLoadDefaultPortal are set when bootstrapWithAuthHeader is invoked
    if (queryPortal) {
      myLoadPortal('root', queryPortal, []);
    } else if (thePortal) {
      console.log(`Loading specified appPortal: ${thePortal}`);
      myLoadPortal('root', thePortal, []);
    } else if (myLoadDefaultPortal && defaultPortal && !excludePortals.includes(defaultPortal)) {
      console.log(`Loading default portal`);
      myLoadDefaultPortal('root', []);
    } else {
      console.log('Loading portal selection screen');
      setPortalSelectionScreen(true);
      setDefaultPortalName(defaultPortal);
      // Getting current user's access group's available portals list other than excluded portals (relies on Traditional DX APIs)
      getAvailablePortals().then(portals => {
        setAvailablePortals(portals as string[]);
      });
    }
  }

  function loadSelectedPortal(portal) {
    setPortalSelectionScreen(false);
    myLoadPortal('app-root', portal, []); // this is defined in bootstrap shell that's been loaded already
  }

  function doRedirectDone() {
    history.push(window.location.pathname);
    let localeOverride: any = sessionStorage.getItem('rsdk_locale');
    if (!localeOverride) {
      localeOverride = undefined;
    }
    // appName and mainRedirect params have to be same as earlier invocation
    loginIfNecessary({ appName: 'portal', mainRedirect: true, locale: localeOverride });
  }

  // One time (initialization)
  useEffect(() => {
    document.addEventListener('SdkConstellationReady', () => {
      // start the portal
      startPortal();
    });
    let localeOverride: any = sessionStorage.getItem('rsdk_locale');
    if (!localeOverride) {
      localeOverride = undefined;
    }
    // Login if needed, doing an initial main window redirect
    loginIfNecessary({
      appName: 'portal',
      mainRedirect: true,
      redirectDoneCB: doRedirectDone,
      locale: localeOverride
    });
  }, []);

  return portalSelectionScreen ? (
    <InvalidPortal defaultPortal={defaultPortalName} portals={availablePortals} onSelect={loadSelectedPortal} />
  ) : (
    <div>
      <div id='root'>
        {/* <Header /> */}
        {/* <StartingComp/> */}
        <NavBar />
        {/* <Button onClick={initializeApp}>Click</Button> */}
      </div>
    </div>
  );
}
