/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import './assets/style.css';
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
// import SuiBox from "./components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "./examples/Sidenav";
// import Configurator from "./examples/Configurator";

// Soft UI Dashboard PRO React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Soft UI Dashboard PRO React routes
// import routes from "routes";

// // Soft UI Dashboard PRO React contexts
// import { useSoftUIController, setMiniSidenav } from "context";
// import { Provider } from '@shopify/app-bridge-react';


// // Images
// import brand from "./assets/images/logo-ct.png";

// export default function App() {
//   const [controller, dispatch] = useSoftUIController();
//   const { miniSidenav, direction, layout, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   const getRoutes = (allRoutes) =>
//     allRoutes.map((route) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }

//       if (route.route) {
//         return <Route exact path={route.route} component={route.component} key={route.key} />;
//       }

//       return null;
//     });
//   const config = { apiKey: '70f26dec9c3fabed913e2fd81cc84aa0', host: 'dWdseWZvb2RzLm15c2hvcGlmeS5jb20vYWRtaW4' };

//   return direction === "rtl" ? (
//     <Provider config={config}>
//       <CacheProvider value={rtlCache}>
//         <ThemeProvider theme={themeRTL}>
//           <CssBaseline />
//           {layout === "dashboard" && (
//             <>
//               <Sidenav
//                 color={sidenavColor}
//                 brand={brand}
//                 brandName="Soft UI Dashboard PRO"
//                 routes={routes}
//                 onMouseEnter={handleOnMouseEnter}
//                 onMouseLeave={handleOnMouseLeave}
//               />

//             </>
//           )}

//           <Switch>
//             {getRoutes(routes)}
//             <Redirect from="*" to="/" />
//           </Switch>
//         </ThemeProvider>
//       </CacheProvider>
//     </Provider>
//   ) : (
//     <Provider config={config}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//               color={sidenavColor}
//               brand={brand}
//               brandName="Soft UI Dashboard PRO"
//               routes={routes}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />

//           </>
//         )}

//         <Switch>
//           {getRoutes(routes)}
//           <Redirect from="*" to="/" />
//         </Switch>
//       </ThemeProvider>
//     </Provider>
//   );
// }
