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

import { useState, useEffect, useLayoutEffect } from "react";

import { Link } from "react-router-dom";
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
import SuiProgress from "@uf/components/SuiProgress";
// Soft UI Dashboard PRO React example components
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import StarIcon from '@mui/icons-material/Star';
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
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setLoyaltyInfo } from "../../../../../reducers/loyaltyInfoSlice";

function Header({ data }) {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const loyaltyInfo = useSelector((state) => state.loyaltyInfo);
    const redeem = useSelector((state) => state.redeem);
    const dispatch = useDispatch();


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

    const handleCreateCoupon = async (e, value) => {
        if (e.target.style.cursor == 'not-allowed') {
            return;
        }
        const confirm = await Swal.fire({
            title: 'Alert',
            text: 'Do you want to generate a discount coupon?',
            icon: 'question',
            input: 'text',
            inputLabel: 'Loyalty Points:',
            inputValue: value,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No'
        });
        if (confirm.isConfirmed) {
            const data = await fetch('/redeemPoints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loyalty_points: confirm.value,
                })
            });
            const response = await data.json();
            if (response.success) {
                let code = response.data.price_rules[0].discount_code;
                let loyalty_earned = response.data.loyalty.loyalty_earned;
                dispatch(setLoyaltyInfo({
                    coupon: code,
                    points: loyalty_earned,
                    expiry: new Date(response.data.price_rules[0].ends_at).toLocaleDateString()
                }));
                await Swal.fire({
                    title: 'Done',
                    text: response.message,
                    icon: 'success',
                });
            } else {
                await Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error',
                })
            }
        }
    }

    return (
        <SuiBox position="relative">
            <DashboardNavbar absolute light />
            <SuiBox style={{ minHeight: "200px" }}

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
                            <SuiBox alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                                <Link to="/edit-profile">
                                    <SuiButton variant="gradient" color="light" size="small" iconOnly>
                                        <Icon>edit</Icon>
                                    </SuiButton>
                                </Link>
                            </SuiBox>
                            <SuiBox alt="spotify logo" position="absolute" right={0} top={-7} mr={-1} mb={-1}>
                                
                            <Tooltip title="Gold" placement="top" arrow>
                                        <StarIcon style={{color:"yellow",background: "lightgray",borderRadius: "50%",padding: "2px"}}/>
                            </Tooltip>
                                
                            </SuiBox>
                        </SuiBox>
                    </Grid>


                    <Grid item>
                        <SuiBox height="100%" mt={0.5} lineHeight={1}>
                           
                            <SuiTypography variant="h5" fontWeight="medium">
                                {data?.name} (Silver)
                            </SuiTypography>
                            <SuiTypography variant="button" color="text" fontWeight="medium">
                                {data?.email} | {data?.phone}
                                
                            </SuiTypography>
                            <SuiTypography color="text"marginTop="10px" fontSize="14px" fontWeight="medium">
                                
                                <SuiProgress  value="60" />
                            </SuiTypography>
                            <SuiTypography color="text" marginTop="5px"fontSize="14px" fontWeight="medium">
                                You are 40 points away from gold
                            </SuiTypography> 
                             
                            
                        </SuiBox>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} sx={{ ml: "auto" }}>
                        <SuiBox
                            style={{ paddingTop: "2px", paddingBottom: "0", paddingLeft: "10px", paddingRight: "10px" }}
                            borderRadius="md"
                            border="0.0625rem dashed #8392ab"
                            textAlign="center"
                            py={2}
                        >
                            <SuiTypography variant="h6" style={{ color: "#17c1e8" }} fontWeight="medium" textTransform="capitalize">
                                Coupon
                            </SuiTypography>
                            <SuiBox display="flex" style={{ marginBottom: "0" }} alignItems="center" mb={2}>
                                <SuiBox width="70%" mr={1}>
                                    <SuiInput
                                        size="small"
                                        value={loyaltyInfo.coupon}
                                        icon={{ component: "lock", direction: "right" }}
                                        disabled
                                    />
                                </SuiBox>
                                <Tooltip title={`Expires On: ${loyaltyInfo.expiry}`} placement="top">
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
                            <span style={{ fontSize: "13px" }}>Expires On: {loyaltyInfo.expiry}</span>

                        </SuiBox>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2} >
                        {/* ernings card */}
                        <SuiBox
                            style={{ background: "linear-gradient(310deg, #2152ff,#21d4fd )" }}
                            borderRadius="md"
                            textAlign="center"
                            py={2}
                        >
                            <SuiTypography variant="h6" style={{ color: "#fff" }} fontWeight="medium" textTransform="capitalize">
                                Earned Points
                            </SuiTypography>
                            <SuiTypography variant="h4" fontWeight="bold">
                                <SuiTypography style={{ color: "#fff" }} component="span" variant="h5" fontWeight="bold">
                                    {loyaltyInfo.points}
                                </SuiTypography>
                            </SuiTypography>
                            <SuiButton variant="text" style={{ textDecoration: "underline", backgroundColor: 'rgb(255, 255, 255, 0.5)', pointerEvents: 'all', cursor: loyaltyInfo.points < redeem.min_value ? 'not-allowed': '' }} color="white" onClick={(e) => handleCreateCoupon(e, loyaltyInfo.points)}>Create Coupon</SuiButton>
                        </SuiBox>
                    </Grid>
                </Grid>
            </Card>
        </SuiBox>
    );
}

export default Header;
