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

// Soft UI Dashboard PRO React base styles
import colors from "@uf/assets/theme/base/colors";
import boxShadows from "@uf/assets/theme/base/boxShadows";
import borders from "@uf/assets/theme/base/borders";

const { white } = colors;
const { xxl } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: xxl,
      borderRadius: borderRadius.xl,
    },
  },
};
