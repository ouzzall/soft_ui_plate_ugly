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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiAvatar from "@uf/components/SuiAvatar";
import SuiInput from "@uf/components/SuiInput";
import SuiButton from "@uf/components/SuiButton";
// Soft UI Dashboard PRO React example components
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React icons
// import Cube from "@uf/examples/Icons/Cube";
// import Document from "@uf/examples/Icons/Document";
// import Settings from "@uf/examples/Icons/Settings";

// Soft UI Dashboard PRO React base styles
import breakpoints from "@uf/assets/theme/base/breakpoints";
// import OutlinedCounterCard from "@uf/examples/Cards/CounterCards/OutlinedCounterCard";
// Images
import burceMars from "@uf/assets/images/bruce-mars.jpg";
import curved0 from "@uf/assets/images/curved-images/curved0.jpg";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox style = {{minHeight: "200px"}}

        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
          <SuiBox position="relative" height="max-content" mx="auto">
              <SuiAvatar src={burceMars} alt="profile picture" size="xxl" variant="rounded" />
              
            </SuiBox>
          </Grid>


          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Alex Thompson
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="medium">
                alecthompson@mail.com | (44) 123 1234 123
              </SuiTypography>
            </SuiBox>
          </Grid>
          

        </Grid>
      </Card>
    </SuiBox>
  );
}

export default Header;
