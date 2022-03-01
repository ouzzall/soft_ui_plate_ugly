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

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiInput from "@uf/components/SuiInput";
import SuiButton from "@uf/components/SuiButton";

// Authentication layout components
import BasicLayout from "@uf/layouts/authentication/components/BasicLayout";
import Socials from "@uf/layouts/authentication/components/Socials";
import Separator from "@uf/layouts/authentication/components/Separator";

// Images
import curved9 from "@uf/assets/images/curved-images/curved9.jpg";

function Basic() {
    const [rememberMe, setRememberMe] = useState(false);
    const history = useHistory();

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const handleLogin = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let data = await fetch('/login', {
            method: 'POST',
            body: formData
        });
        let response = await data.json();
        if (response.success) {
            history.push('/');
        }
    }

    return (
        <BasicLayout
            title="Welcome!"
            description="Sign in to Continue."
            image={curved9}
        >
            <Card>
                <SuiBox p={3} mb={1} textAlign="center">
                    <SuiTypography variant="h5" fontWeight="medium">
                        Sign in
                    </SuiTypography>
                </SuiBox>
                <SuiBox mb={2}>
                    <Socials />
                </SuiBox>
                <SuiBox p={3}>
                    <SuiBox component="form" role="form" onSubmit={handleLogin}>
                        <SuiBox mb={2}>
                            <SuiInput type="email" placeholder="Email" name="email" />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <SuiInput type="password" placeholder="Password" name="password" />
                        </SuiBox>
                        <SuiBox display="flex" alignItems="center">
                            <Switch name="remember_me" checked={rememberMe} onChange={handleSetRememberMe} />
                            <SuiTypography
                                variant="button"
                                fontWeight="regular"
                                onClick={handleSetRememberMe}
                                sx={{ cursor: "pointer", userSelect: "none" }}
                            >
                                &nbsp;&nbsp;Remember me
                            </SuiTypography>
                        </SuiBox>
                        <SuiBox mt={4} mb={1}>
                            <SuiButton type="submit" variant="gradient" color="info" fullWidth>
                                sign in
                            </SuiButton>
                        </SuiBox>
                        <Separator />
                        <SuiBox mt={1} mb={3}>
                            <SuiButton
                                component={Link}
                                to="/signup"
                                variant="gradient"
                                color="dark"
                                fullWidth
                            >
                                sign up
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
            </Card>
        </BasicLayout>
    );
}

export default Basic;
