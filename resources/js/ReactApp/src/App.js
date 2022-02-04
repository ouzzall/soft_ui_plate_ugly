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
import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";

import '@uf/assets/style.css';
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
// import SuiBox from "@uf/./components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "@uf/examples/Sidenav";
// import Configurator from "@uf/./examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "@uf/assets/theme";
import themeRTL from "@uf/assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard PRO React routes
import routes from "@uf/routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "@uf/context";


// Images
import brand from "@uf/assets/images/logo-ct.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./reducers/loadingSlice";
import Loader from "./components/Loader";

export default function App() {
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, direction, layout, sidenavColor } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const { pathname } = useLocation();
    const loading = useSelector((state) => state.loading.value);
    const dispatch1 = useDispatch();

    const history = useHistory();


    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
            key: "rtl",
            stylisPlugins: [rtlPlugin],
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);


    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        const getUser = async () => {
            dispatch1(setLoading(true));
            const data = await fetch('/getSession');
            const response = await data.json();
            if (!response.success) {
                if(pathname != '/signup') {
                    history.push('/login');
                }
            } else {
                if(pathname == '/signup' || pathname == '/login') {
                    history.push('/');
                }
            }
            dispatch1(setLoading(false));
        }
        getUser();
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} component={route.component} key={route.key} />;
            }

            return null;
        });

    return loading ? <Loader /> : (direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={themeRTL}>
                <CssBaseline />
                {layout === "dashboard" && (
                    <>
                        <Sidenav
                            color={sidenavColor}
                            brand={brand}
                            brandName="Soft UI Dashboard PRO"
                            routes={routes}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                        />

                    </>
                )}

                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/" />
                </Switch>
            </ThemeProvider>
        </CacheProvider>
    ) : (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={brand}
                        brandName="Soft UI Dashboard PRO"
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />

                </>
            )}

            <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/" />
            </Switch>
        </ThemeProvider>
    ));
}
