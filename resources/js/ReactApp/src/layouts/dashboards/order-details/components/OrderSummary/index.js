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

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

function OrderSummary({ detail }) {
    return (
        <>
            <SuiBox mb={2}>
                <SuiTypography variant="h6" fontWeight="medium">
                    Order Summary
                </SuiTypography>
            </SuiBox>
            {/* <SuiBox display="flex" justifyContent="space-between" mb={0.5}>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Points Earned:
        </SuiTypography>
        <SuiBox ml={1}>
          <SuiTypography variant="body2" fontWeight="medium">
            60
          </SuiTypography>
        </SuiBox>
      </SuiBox> */}
            <SuiBox display="flex" justifyContent="space-between" mb={0.5}>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                    Sub Total:
                </SuiTypography>
                <SuiBox ml={1}>
                    <SuiTypography variant="body2" fontWeight="medium">
                        ${detail?.subtotal_price}
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
            <SuiBox display="flex" justifyContent="space-between" mb={0.5}>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                    Shipping:
                </SuiTypography>
                <SuiBox ml={1}>
                    <SuiTypography variant="body2" fontWeight="medium">
                        ${detail?.shipping_cost}
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
            <SuiBox display="flex" justifyContent="space-between" mb={0.5}>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                    Taxes:
                </SuiTypography>
                <SuiBox ml={1}>
                    <SuiTypography variant="body2" fontWeight="medium">
                        ${detail?.total_tax}
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
            <SuiBox display="flex" justifyContent="space-between" mt={3}>
                <SuiTypography variant="body1" fontWeight="light" color="text">
                    Total:
                </SuiTypography>
                <SuiBox ml={1}>
                    <SuiTypography variant="body1" fontWeight="medium">
                        ${detail?.total_price}
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
        </>
    );
}

export default OrderSummary;
