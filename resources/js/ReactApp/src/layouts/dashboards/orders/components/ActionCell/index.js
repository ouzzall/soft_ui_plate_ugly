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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import { Link } from "react-router-dom";

function ActionCell({ view }) {
    return (
        <SuiBox display="flex" alignItems="center">
            <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                <Link to={view}>
                    <Tooltip title="View order" placement="top">
                        <Icon>visibility</Icon>
                    </Tooltip>
                </Link>
            </SuiTypography>
            {/* <SuiBox mx={2}>
                <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                    <Link to={edit}>
                        <Tooltip title="Edit Campaign" placement="top">
                            <Icon>edit</Icon>
                        </Tooltip>
                    </Link>
                </SuiTypography>
            </SuiBox>
            <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                <Tooltip title="Delete Campaign" placement="left">
                    <Icon>delete</Icon>
                </Tooltip>
            </SuiTypography> */}
        </SuiBox>
    );
}

export default ActionCell;
