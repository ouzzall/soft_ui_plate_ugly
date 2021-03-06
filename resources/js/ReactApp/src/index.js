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

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "@uf/App";
import store from '@uf/store'
import { Provider } from 'react-redux'

// Soft UI Context Provider
import { SoftUIControllerProvider } from "@uf/context";

ReactDOM.render(
    <BrowserRouter>
        <SoftUIControllerProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </SoftUIControllerProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
