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

/**
  The boxShadow() function helps you to create a box shadow for an element
 */

// Soft UI Dashboard PRO React helper functions
import rgba from "@uf/assets/theme/functions/rgba";
import pxToRem from "@uf/assets/theme/functions/pxToRem";

function boxShadow(offset = [], radius = [], color, opacity, inset = "") {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;
