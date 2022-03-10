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
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiBadgeDot from "@uf/components/SuiBadgeDot";
import SuiButton from "@uf/components/SuiButton";
// import SuiTypography from "@uf/components/SuiTypography";

// import SuiSocialButton from "@uf/components/SuiSocialButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import Footer from "@uf/examples/Footer";
// import ProfileInfoCard from "@uf/examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "@uf/examples/Lists/ProfilesList";
// import DefaultProjectCard from "@uf/examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "@uf/examples/Cards/PlaceholderCard";

// Overview page components
import Header from "@uf/layouts/dashboards/profile/components/Header";
// import PlatformSettings from "@uf/layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
// import profilesListData from "@uf/layouts/pages/profile/profile-overview/data/profilesListData";
import DefaultStatisticsCard from "@uf/examples/Cards/StatisticsCards/DefaultStatisticsCard";

import DefaultLineChart from "@uf/examples/Charts/LineCharts/DefaultLineChart";

// Overview page components
// import ChannelsChart from "@uf/layouts/ecommerce/overview/components/ChannelsChart";

// Data
import defaultLineChartData from "@uf/layouts/ecommerce/overview/data/defaultLineChartData";

// Images
import DataTable from "@uf/examples/Tables/DataTable";

// Data
import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoyaltyInfo } from "../../../reducers/loyaltyInfoSlice";

function Profile() {
    const [profile, setProfile] = useState({});
    const [chartData, setChartData] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [otherData, setOtherData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            let data = await fetch('/getProfile');
            let response = await data.json();
            if (response.success) {
                setProfile(response.data.user);
                setOtherData(response.data.others);
                setTransactions(response.data.user.transactions);
                if (response.data.user.price_rules.length > 0) {
                    let code = response.data.user.price_rules[0].discount_code;
                    dispatch(setLoyaltyInfo({
                        coupon: code,
                        points: response.data.user.loyalty.loyalty_earned,
                        expiry: new Date(response.data.user.price_rules[0].ends_at).toLocaleDateString()
                    }));
                } else {
                    dispatch(setLoyaltyInfo({
                        coupon: 'XXXXXXXX',
                        points: response.data.user.loyalty.loyalty_earned,
                        expiry: ''
                    }));
                }
            }
            data = await fetch('/getUserCharts');
            response = await data.json();
            if (response.success) {
                setChartData(response.data.sales_chart);
            }
        }
        getData();
    }, []);
    return (
        <DashboardLayout>
            <Header data={profile} />
            <SuiBox mb={3} mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <DefaultStatisticsCard
                            title="Coupons Created"
                            count={otherData?.coupons_created}
                            // percentage={{
                            //     color: "success",
                            //     value: "+55%",
                            //     label: "since last month",
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <DefaultStatisticsCard
                            title="Total Earnings"
                            count={`$${otherData?.total_orders_amount}`}
                            // percentage={{
                            //     color: "success",
                            //     value: "+12%",
                            //     label: "since last month",
                            // }}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <DefaultStatisticsCard
                            title="Orders"
                            count={otherData?.orders_created}
                            // percentage={{
                            //     color: "secondary",
                            //     value: "+1",
                            //     label: "since last month",
                            // }}

                        />
                    </Grid>
                </Grid>
            </SuiBox>
            <SuiBox mb={3}>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} lg={12}>
                        <DefaultLineChart
                            title="Sales Details"
                            description={
                                <SuiBox display="flex" justifyContent="space-between">
                                    <SuiBox display="flex" ml={-1}>
                                        <SuiBadgeDot color="info" size="sm" badgeContent="Loyalty Points" />
                                        <SuiBadgeDot color="dark" size="sm" badgeContent="Orders Amount" />
                                    </SuiBox>
                                    <SuiBox mt={-5.25} mr={-1}>
                                        <Tooltip title="See which ads perform better" placement="left" arrow>
                                            <SuiButton
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                circular
                                                iconOnly
                                            >
                                                <Icon>priority_high</Icon>
                                            </SuiButton>
                                        </Tooltip>
                                    </SuiBox>
                                </SuiBox>
                            }
                            chart={chartData}
                        />
                    </Grid>
                </Grid>
            </SuiBox>
            <SuiBox my={3}>
                <Card>
                    {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
                    <DataTable entriesPerPage={false} canSearch
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Customer Name", accessor: "user.name" },
                                { Header: "Customer Email", accessor: "user.email" },
                                { Header: "Loyalty Points", accessor: "loyalty_points" },
                                { Header: "Transaction Type", accessor: "transaction_type.title" },
                                { Header: "Date", accessor: "date" },
                            ],
                            rows: transactions
                        }}
                    />
                </Card>
            </SuiBox>
            {/* <SuiBox mt={3} mb={3}>
        <Grid container spacing={3}>





        </Grid>
      </SuiBox> */}


            <Footer />
        </DashboardLayout>
    );
}

export default Profile;
