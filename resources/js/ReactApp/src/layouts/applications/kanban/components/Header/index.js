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

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiAvatar from "@uf/components/SuiAvatar";
import SuiButton from "@uf/components/SuiButton";

// Image
import team1 from "@uf/assets/images/team-1.jpg";
import team2 from "@uf/assets/images/team-2.jpg";
import team3 from "@uf/assets/images/team-3.jpg";
import team4 from "@uf/assets/images/team-4.jpg";
import team5 from "@uf/assets/images/team-5.jpg";

function Header() {
  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <SuiBox display="flex" alignItems="center">
      <SuiBox mt={0.5} pr={1}>
        <SuiBox mb={1} lineHeight={0}>
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            Team members:
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex">
          <SuiAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          <SuiAvatar src={team2} alt="team-1" size="sm" sx={avatarStyles} />
          <SuiAvatar src={team3} alt="team-1" size="sm" sx={avatarStyles} />
          <SuiAvatar src={team4} alt="team-1" size="sm" sx={avatarStyles} />
          <SuiAvatar src={team5} alt="team-1" size="sm" sx={avatarStyles} />
        </SuiBox>
      </SuiBox>
      <SuiBox height="75%" alignSelf="flex-end">
        <Divider orientation="vertical" />
      </SuiBox>
      <SuiBox pl={1}>
        <SuiButton variant="gradient" color="info" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </SuiButton>
      </SuiBox>
    </SuiBox>
  );
}

export default Header;
