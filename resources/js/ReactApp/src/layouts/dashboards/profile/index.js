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
import TimelineList from "@uf/examples/Timeline/TimelineList";
import TimelineItem from "@uf/examples/Timeline/TimelineItem";
import Swal from "sweetalert2";

function Profile() {
    const [profile, setProfile] = useState({});
    const [chartData, setChartData] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [otherData, setOtherData] = useState({});
    const dispatch = useDispatch();

    const [nextPlan, setNextPlan] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(false);
    const [ordersProgress, setOrdersProgress] = useState(false);
    const [rewardsList, setRewardsList] = useState(false);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);

    useEffect(() => {
        const getData = async () => {
            let data = await fetch("/getProfile");
            let response = await data.json();
            if (response.success) {
                setProfile(response.data.user);
                setOtherData(response.data.others);
                setTransactions(response.data.user.transactions);
                if (response.data.user.price_rules.length > 0) {
                    let code = response.data.user.price_rules[0].discount_code;
                    dispatch(
                        setLoyaltyInfo({
                            coupon: code,
                            points: response.data.user.loyalty.loyalty_earned,
                            expiry: new Date(
                                response.data.user.price_rules[0].ends_at
                            ).toLocaleDateString(),
                        })
                    );
                } else {
                    dispatch(
                        setLoyaltyInfo({
                            coupon: "XXXXXXXX",
                            points: response.data.user.loyalty.loyalty_earned,
                            expiry: "",
                        })
                    );
                }
            }
            data = await fetch("/getUserCharts");
            response = await data.json();
            if (response.success) {
                setChartData(response.data.sales_chart);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            let data = await fetch("/get_my_plan");
            let response = await data.json();
            if (response.success) {
                console.log(response);
                // console.log(response.data[2].length);
                response.data[0].sort((a, b) => (a.orders > b.orders ? 1 : -1));
                setLoyaltyPoints(response.data[4].loyalty_earned);
                // console.log(response.data[0]);

                let next_plan = "";
                let current_plan = "";
                for (let i = 0; i < response.data[0].length; i++) {
                    if (response.data[2].length >= response.data[0][i].orders) {
                        current_plan = response.data[0][i];
                        next_plan = response.data[0][i + 1];
                        break;
                    }
                }
                if (next_plan) {
                    // console.log(current_plan);
                    // console.log(next_plan);
                    setCurrentPlan({
                        currentStar: current_plan.star,
                        currentPlan: current_plan.title,
                    });
                    setNextPlan({
                        remPoints: next_plan.orders - response.data[2].length,
                        nextPlan: next_plan.title,
                    });
                    setOrdersProgress(
                        (response.data[2].length / next_plan.orders) * 100
                    );
                    // console.log("INSIDE");
                } else {
                    // console.log("OUTSIDE");
                    next_plan = response.data[0][0];
                    setNextPlan({
                        remPoints: next_plan.orders - response.data[2].length,
                        nextPlan: next_plan.title,
                    });
                    setOrdersProgress(
                        (response.data[2].length / next_plan.orders) * 100
                    );
                    // console.log(next_plan);
                    // console.log(next_plan.orders - response.data[2].length);
                }

                const current_rewards = [];
                if (current_plan) {
                    for (let i = 0; i < response.data[3].length; i++) {
                        if (response.data[3][i].plan_id == current_plan.id) {
                            current_rewards.push(response.data[3][i]);
                        }
                    }
                }
                // console.log(current_rewards);
                // console.log(response.data[4]);
                current_rewards.forEach((element) => {
                    // console.log(element);
                    element.shop_name = response.data[5].name;
                    if (
                        element.reward_point <= response.data[4].loyalty_earned
                    ) {
                        element.availability = "YES";
                    } else {
                        element.availability = "NO";
                        element.points_diffrence =
                            element.reward_point -
                            response.data[4].loyalty_earned;
                        element.user_points = response.data[4].loyalty_earned;
                    }
                });
                // console.log(current_rewards);
                setRewardsList(current_rewards);
            }
        };
        getData();
    }, []);

    function allRewardsHandler() {
        console.log(rewardsList);
        console.log(loyaltyPoints);

        let allRewardsPoints = 0;
        const allRewardsIds = [];
        const allRewardsDBIds = [];
        rewardsList.forEach(element => {
            allRewardsPoints += element.reward_point;
            allRewardsIds.push(element.variant_id);
            allRewardsDBIds.push(element.id);
        });

        console.log(allRewardsPoints);

        if(allRewardsPoints > loyaltyPoints)
        {
            Swal.fire("Error!", "Your loyalty points are less than all rewards points.", "error");
        }
        else
        {
            // window.open(`https://${rewardsList[0].shop_name}?all_rewards=true&variant_id=${allRewardsIds.toString()}&discount_code=CTH_CTH`, "_blank");

            const dataS = new URLSearchParams({ variant_ids: allRewardsIds.toString(),  ids: allRewardsDBIds.toString(), all_rewards: true}).toString();

            fetch(`/make_discount_code?${dataS}`, {
            // method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status === true) {
                // history.replace("/user-management");
                // console.log(data);
                window.open(`https://${rewardsList[0].shop_name}?all_rewards=true&variant_id=${allRewardsIds.toString()}&discount_code=${data.data}`, "_blank");
                } else if (data.status === false) {
                // console.log(data);
                // setErrorText(data.data);
                // setErrorSB(true);
                }
            });
        }
    }

    return (
        <DashboardLayout>
            <Header
                data={profile}
                nextPlan={nextPlan}
                currentPlan={currentPlan}
                ordersProgress={ordersProgress}
            />
            <SuiBox mb={3} mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TimelineList>
                            {rewardsList &&
                                rewardsList.map((value, index) => (
                                    <TimelineItem
                                        color="success"
                                        icon="emoji_events"
                                        title={value.reward_title}
                                        dateTime={value.reward_point}
                                        progress={value.points_diffrence}
                                        image={value.image_src}
                                        availability={value.availability}
                                        userPoints={value.user_points}
                                        variantId={value.variant_id}
                                        discountCode="CTH_CTH"
                                        shopName={value.shop_name}
                                        rewardStatus={value.reward_status}
                                    />
                                ))}
                            <SuiBox
                                display="flex"
                                justifyContent="center"
                                ml={2}
                                mt={3}
                            >
                                <SuiButton
                                    type="submit"
                                    variant="gradient"
                                    color="dark"
                                    onClick={allRewardsHandler}
                                >
                                    Get All Rewards
                                </SuiButton>
                            </SuiBox>
                        </TimelineList>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={{ display: "flex" }}>
                            <Grid item mt={3} xs={12} sm={4}>
                                <DefaultStatisticsCard
                                    title="Coupons Created"
                                    count={
                                        otherData && otherData.coupons_created
                                    }
                                    // percentage={{
                                    //     color: "success",
                                    //     value: "+55%",
                                    //     label: "since last month",
                                    // }}
                                />
                            </Grid>
                            <Grid
                                style={{
                                    marginLeft: "20px",
                                    marginRight: "20px",
                                }}
                                item
                                mt={3}
                                xs={12}
                                sm={4}
                            >
                                <DefaultStatisticsCard
                                    title="Total Earnings"
                                    count={
                                        otherData &&
                                        otherData.total_orders_amount
                                    }
                                    // percentage={{
                                    //     color: "success",
                                    //     value: "+12%",
                                    //     label: "since last month",
                                    // }}
                                />
                            </Grid>
                            <Grid item mt={3} xs={12} sm={4}>
                                <DefaultStatisticsCard
                                    title="Orders"
                                    count={
                                        otherData && otherData.orders_created
                                    }
                                    // percentage={{
                                    //     color: "secondary",
                                    //     value: "+1",
                                    //     label: "since last month",
                                    // }}
                                />
                            </Grid>
                        </div>
                        <Grid item mt={3} xs={12} sm={12} lg={12}>
                            <DefaultLineChart
                                title="Sales Details"
                                description={
                                    <SuiBox
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <SuiBox display="flex" ml={-1}>
                                            <SuiBadgeDot
                                                color="info"
                                                size="sm"
                                                badgeContent="Loyalty Points"
                                            />
                                            <SuiBadgeDot
                                                color="dark"
                                                size="sm"
                                                badgeContent="Orders Amount"
                                            />
                                        </SuiBox>
                                        <SuiBox mt={-5.25} mr={-1}>
                                            <Tooltip
                                                title="See which ads perform better"
                                                placement="left"
                                                arrow
                                            >
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
                        <Grid item mt={3} xs={12} sm={12} lg={12}>
                            <SuiBox my={3}>
                                <Card>
                                    {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
                                    <DataTable
                                        entriesPerPage={false}
                                        canSearch
                                        table={{
                                            columns: [
                                                {
                                                    Header: "Id",
                                                    accessor: "id",
                                                },
                                                {
                                                    Header: "Customer Name",
                                                    accessor: "user.name",
                                                },
                                                {
                                                    Header: "Customer Email",
                                                    accessor: "user.email",
                                                },
                                                {
                                                    Header: "Loyalty Points",
                                                    accessor: "loyalty_points",
                                                },
                                                {
                                                    Header: "Transaction Type",
                                                    accessor:
                                                        "transaction_type.title",
                                                },
                                                {
                                                    Header: "Date",
                                                    accessor: "date",
                                                },
                                            ],
                                            rows: transactions,
                                        }}
                                    />
                                </Card>
                            </SuiBox>
                        </Grid>
                    </Grid>
                </Grid>
            </SuiBox>
            <SuiBox mb={3}>
                <Grid container spacing={3}></Grid>
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
