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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import Footer from "@uf/examples/Footer";
import ComplexProjectCard from "@uf/examples/Cards/ProjectCards/ComplexProjectCard";
import PlaceholderCard from "@uf/examples/Cards/PlaceholderCard";

// Project page components
import Header from "@uf/layouts/pages/profile/components/Header";

// Images
import team1 from "@uf/assets/images/team-1.jpg";
import team2 from "@uf/assets/images/team-2.jpg";
import team3 from "@uf/assets/images/team-3.jpg";
import team4 from "@uf/assets/images/team-4.jpg";
import team5 from "@uf/assets/images/team-5.jpg";
import logoSlack from "@uf/assets/images/small-logos/logo-slack.svg";
import logoSpotify from "@uf/assets/images/small-logos/logo-spotify.svg";
import logoXD from "@uf/assets/images/small-logos/logo-xd.svg";
import logoAsana from "@uf/assets/images/small-logos/logo-asana.svg";
import logoInvision from "@uf/assets/images/small-logos/logo-invision.svg";

function AllProjects() {
  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
  const [designToolsMenu, setDesignToolsMenu] = useState(null);
  const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
  const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  const openPremiumSupportMenu = (event) => setPremiumSupportMenu(event.currentTarget);
  const closePremiumSupportMenu = () => setPremiumSupportMenu(null);
  const openDesignToolsMenu = (event) => setDesignToolsMenu(event.currentTarget);
  const closeDesignToolsMenu = () => setDesignToolsMenu(null);
  const openLookingGreatMenu = (event) => setLookingGreatMenu(event.currentTarget);
  const closeLookingGreatMenu = () => setLookingGreatMenu(null);
  const openDeveloperFirstMenu = (event) => setDeveloperFirstMenu(event.currentTarget);
  const closeDeveloperFirstMenu = () => setDeveloperFirstMenu(null);

  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <Header />
      <SuiBox pt={5} pb={2}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <SuiBox mb={1}>
              <SuiTypography variant="h5">Some of Our Awesome Projects</SuiTypography>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiTypography variant="body2" color="text">
                This is the paragraph where you can write more details about your projects. Keep you
                user engaged by providing meaningful information.
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
        <SuiBox mt={{ xs: 1, lg: 3 }} mb={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                image={logoSlack}
                title="slack bot"
                description="If everything I did failed - which it doesn't, I think that it actually succeeds."
                dateTime="02.03.22"
                members={[team1, team2, team3, team4, team5]}
                dropdown={{
                  action: openSlackBotMenu,
                  menu: renderMenu(slackBotMenu, closeSlackBotMenu),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                image={logoSpotify}
                title="premium support"
                description="Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you."
                dateTime="22.11.21"
                members={[team1, team2, team3]}
                dropdown={{
                  action: openPremiumSupportMenu,
                  menu: renderMenu(premiumSupportMenu, closePremiumSupportMenu),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                image={logoXD}
                title="design tools"
                description="Constantly growing. We’re constantly making mistakes from which we learn and improve."
                dateTime="06.03.20"
                members={[team1, team2, team3, team4]}
                dropdown={{
                  action: openDesignToolsMenu,
                  menu: renderMenu(designToolsMenu, closeDesignToolsMenu),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                image={logoAsana}
                title="looking great"
                description="You have the opportunity to play this game of life you need to appreciate every moment."
                dateTime="14.03.24"
                members={[team1, team2, team3, team4, team5, team3]}
                dropdown={{
                  action: openLookingGreatMenu,
                  menu: renderMenu(lookingGreatMenu, closeLookingGreatMenu),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                image={logoInvision}
                title="developer first"
                description="For standing out. But the time is now to be okay to be the greatest you."
                dateTime="16.01.22"
                members={[team1, team2, team3, team4]}
                dropdown={{
                  action: openDeveloperFirstMenu,
                  menu: renderMenu(developerFirstMenu, closeDeveloperFirstMenu),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PlaceholderCard title={{ variant: "h5", text: "New project" }} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllProjects;
