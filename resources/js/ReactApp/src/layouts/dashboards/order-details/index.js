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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiBadge from "@uf/components/SuiBadge";
import SuiAvatar from "@uf/components/SuiAvatar";
import SuiButton from "@uf/components/SuiButton";
// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";

// OrderDetails page components
// import Header from "layouts/ecommerce/orders/order-details/components/Header";
// import OrderInfo from "layouts/ecommerce/orders/order-details/components/OrderInfo";
// import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder";
// import PaymentDetails from "layouts/ecommerce/orders/order-details/components/PaymentDetails";
// import BillingInformation from "layouts/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "@uf/layouts/dashboards/order-details/components/OrderSummary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@uf/components/Loader";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";


const orderImage =
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80";
function OrderDetails({ match }) {
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState({});
    const [refunded, setRefunded] = useState(false);
    const { id } = match.params;
    const history = useHistory();
    useEffect(() => {
        setRefunded(false);
        const getOrderDetails = async () => {
            setLoading(true);
            const data = await fetch(`/getOrderDetail/${id}`);
            const response = await data.json();
            if (response.success) {
                setOrderDetail(response.data);
            }
            setLoading(false);
        }
        getOrderDetails();
    }, [refunded]);

    const refund = async (orderId, productId, loyalty) => {
        let confirm = await Swal.fire({
            title: 'Refund',
            icon: 'question',
            inputLabel: 'Please enter the Loyalty value',
            input: 'text',
            inputValue: loyalty,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        });
        if (confirm.isConfirmed) {
            const data = await fetch('/refund', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: orderId,
                    product_id: productId,
                    loyalty_points: confirm.value,
                })
            });
            const response = await data.json();
            if (response.success) {
                confirm = await Swal.fire({
                    tilte: 'Done',
                    icon: 'success',
                    text: 'Product Refunded successfully!',
                });
                setRefunded(true);
            }
        }
    }
    return loading ? <Loader /> : <DashboardLayout>
        <DashboardNavbar />
        <SuiBox my={7}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} lg={10}>
                    <Card>
                        <SuiBox pt={2} px={2}>
                            <SuiBox>
                                <SuiBox mb={1}>
                                    <SuiTypography variant="h6" fontWeight="medium">
                                        Order Details
                                    </SuiTypography>
                                </SuiBox>
                                <SuiTypography component="p" variant="button" fontWeight="regular" color="text">
                                    Order no. <span sx={{ fontWeight: "bold" }}>{orderDetail?.name}</span>
                                </SuiTypography>
                            </SuiBox>
                        </SuiBox>
                        <Divider />
                        <SuiBox pt={1} pb={3} px={2}>
                            <SuiBox mb={3}>
                                {orderDetail?.line_items?.map((value, index) => {
                                    return <>
                                        <Grid key={index} xs={12} container spacing={3} alignItems="center" item>
                                            <Grid item md={6}>
                                                <SuiBox display="flex" alignItems="center">
                                                    <SuiBox mr={2}>
                                                        <SuiAvatar variant="rounded" size="xxl" src={value.image_url} alt={value.name} />
                                                    </SuiBox>
                                                    <SuiBox lineHeight={1}>
                                                        <SuiTypography variant="h6" fontWeight="medium">
                                                            {value.name}
                                                        </SuiTypography>
                                                        <SuiBox mb={2}>
                                                            <SuiTypography variant="button" fontWeight="regular" color="text">
                                                                Order was delivered 2 days ago.
                                                            </SuiTypography>
                                                        </SuiBox>
                                                        <SuiBadge
                                                            variant="gradient"
                                                            color="success"
                                                            size="xs"
                                                            badgeContent="delivered"
                                                            container
                                                        />
                                                    </SuiBox>
                                                </SuiBox>
                                            </Grid>
                                            <Grid item md={2}>
                                                <SuiBox mb={2}>
                                                    <SuiBox style={{ marginTop: "-32px" }}>
                                                        <SuiTypography variant="h6" fontWeight="medium">
                                                            Quantity
                                                        </SuiTypography>
                                                        <SuiBox mb={2}>
                                                            <SuiTypography variant="button" fontWeight="regular" color="text">
                                                                {value.quantity} X
                                                            </SuiTypography>
                                                        </SuiBox>

                                                    </SuiBox>

                                                </SuiBox>
                                            </Grid>
                                            <Grid item md={2}>
                                                <SuiBox mb={2}>
                                                    <SuiBox style={{ marginTop: "-32px" }}>
                                                        <SuiTypography variant="h6" fontWeight="medium">
                                                            Price
                                                        </SuiTypography>
                                                        <SuiBox mb={2}>
                                                            <SuiTypography variant="button" fontWeight="regular" color="text">
                                                                ${value.price}
                                                            </SuiTypography>
                                                        </SuiBox>

                                                    </SuiBox>

                                                </SuiBox>
                                            </Grid>
                                            <Grid item md={2}>
                                                <SuiBox mb={2}>
                                                    <SuiBox style={{ marginTop: "-32px" }}>

                                                        <SuiBox mb={2}>
                                                            <SuiButton variant="gradient" color="info" {...value.is_refunded ? { disabled: true } : { disabled: false }} onClick={() => refund(orderDetail?.id, value.product_id, (value.quantity * value.price) / 0.001)}>{value.is_refunded ? 'Refunded' : 'Refund'}</SuiButton>
                                                        </SuiBox>

                                                    </SuiBox>

                                                </SuiBox>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </>
                                })}
                            </SuiBox>
                            <SuiBox mt={3}>
                                <Grid container spacing={3}>

                                    <Grid item xs={12} md={6} lg={5}>

                                        <SuiBox >
                                            <SuiTypography variant="h6" fontWeight="medium">
                                                Billing Information
                                            </SuiTypography>
                                            <SuiBox
                                                component="li"
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="flex-start"
                                                bgColor="grey-100"
                                                borderRadius="lg"
                                                p={3}
                                                mt={2}
                                            >
                                                <SuiBox width="100%" display="flex" flexDirection="column" lineHeight={1}>

                                                    <SuiBox mb={1} lineHeight={0}>
                                                        <SuiTypography variant="caption" color="text">
                                                            Name:&nbsp;&nbsp;&nbsp;
                                                            <SuiTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                                                {`${orderDetail?.billing_address?.first_name} ${orderDetail?.billing_address?.last_name}`}
                                                            </SuiTypography>
                                                        </SuiTypography>
                                                    </SuiBox>
                                                    <SuiBox mb={1} lineHeight={0}>
                                                        <SuiTypography variant="caption" color="text">
                                                            Email Address:&nbsp;&nbsp;&nbsp;
                                                            <SuiTypography variant="caption" fontWeight="medium">
                                                                {orderDetail?.customer?.email}
                                                            </SuiTypography>
                                                        </SuiTypography>
                                                    </SuiBox>
                                                    <SuiTypography variant="caption" color="text">
                                                        Phone Number:&nbsp;&nbsp;&nbsp;
                                                        <SuiTypography variant="caption" fontWeight="medium">
                                                            {orderDetail?.customer?.phone}
                                                        </SuiTypography>
                                                    </SuiTypography>
                                                    <SuiTypography variant="caption" color="text">
                                                        Address:&nbsp;&nbsp;&nbsp;
                                                        <SuiTypography variant="caption" fontWeight="medium">
                                                            {`${orderDetail?.billing_address?.address1} ${orderDetail?.billing_address?.address2}`}
                                                        </SuiTypography>
                                                    </SuiTypography>
                                                </SuiBox>
                                            </SuiBox>
                                        </SuiBox>
                                    </Grid>
                                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                                        <OrderSummary detail={orderDetail} />
                                    </Grid>
                                </Grid>
                            </SuiBox>
                        </SuiBox>
                    </Card>
                </Grid>
            </Grid>
        </SuiBox>
        <Footer />
    </DashboardLayout>
}

export default OrderDetails;
