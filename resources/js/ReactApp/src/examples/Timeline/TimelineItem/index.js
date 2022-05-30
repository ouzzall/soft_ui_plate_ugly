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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import SuiAvatar from "@uf/components/SuiAvatar";
import SuiProgress from "@uf/components/SuiProgress";
import burceMars from "@uf/assets/images/bruce-mars.jpg";
// @mui material components
import Icon from "@mui/material/Icon";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from "@mui/material/Tooltip";
import SuiInput from "@uf/components/SuiInput";
import SuiButton from "@uf/components/SuiButton";
// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiBadge from "@uf/components/SuiBadge";

// Timeline context
import { useTimeline } from "@uf/examples/Timeline/context";

// Custom styles for the TimelineItem
import { timelineItem, timelineItemIcon } from "@uf/examples/Timeline/TimelineItem/styles";
import { Card, Grid } from "@mui/material";

function TimelineItem({ color, icon, title, dateTime, description, badges, lastItem,progress }) {
  const isDark = useTimeline();

  const renderBadges =
    badges.length > 0
      ? badges.map((badge, key) => {
          const badgeKey = `badge-${key}`;

          return (
            <SuiBox key={badgeKey} mr={key === badges.length - 1 ? 0 : 0.5}>
              <SuiBadge color={color} size="xs" badgeContent={badge} container />
            </SuiBox>
          );
        })
      : null;

  return (
    <SuiBox position="relative" sx={(theme) => timelineItem(theme, { lastItem })}>
      <SuiBox
        bgColor={isDark ? "dark" : "white"}
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="2px"
        zIndex={2}
      >
        <Icon sx={(theme) => timelineItemIcon(theme, { color })}>{icon}</Icon>
      </SuiBox>
      
      <SuiBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
      <Card style={{padding: "20px"}}>
      
      <SuiBox display="flex" alignItems="center" >
      <SuiBox mr={2}>
        
        <SuiAvatar src={burceMars} alt="profile picture" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column" width="250px">
        <SuiTypography variant="button" fontWeight="700">
        {title} 
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="medium" color="secondary">
          <SuiTypography component="span" variant="button" color="secondary">
            $
          </SuiTypography>
          {dateTime}
        </SuiTypography>
      </SuiBox>
      <div>
        <CheckCircleIcon/>
      </div>
    </SuiBox>
       
        <h6 style={{marginTop:"15px"}}>You are {100 - progress} points away</h6>
        <SuiBox mt={2} mb={1.5}>
          
          <SuiProgress value={progress} />
        </SuiBox>
        <SuiBox>
        <SuiBox
                            style={{ paddingTop: "2px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px" }}
                            borderRadius="md"
                            border="0.0625rem dashed #8392ab"
                            textAlign="center"
                            py={2}
                        >
                            <SuiTypography variant="h6" style={{ color: "#17c1e8" }} fontWeight="medium" textTransform="capitalize">
                                Coupon
                            </SuiTypography>
                            <SuiBox display="flex" style={{ marginBottom: "0" }} alignItems="center" mb={2}>
                                <SuiBox width="100%" mr={1}>
                                    <SuiInput
                                        size="small"
                                        icon={{ component: "lock", direction: "right" }}
                                        disabled
                                    />
                                </SuiBox>
                                <Tooltip title={`Expires On: $`} placement="top">
                                    <SuiButton
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        sx={{ padding: "0.5rem 1rem" }}
                                    >
                                        copy
                                    </SuiButton>
                                    
                                </Tooltip>
                                
                            </SuiBox>
                            <p style={{ fontSize: "13px",paddingTop:"10px",paddingBottom:"10px" }}>Expiress On: </p>

                        </SuiBox>
         </SuiBox>           
        
        
        </Card>
      </SuiBox>
      
    </SuiBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  badges: [],
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  lastItem: PropTypes.bool,
};

export default TimelineItem;
