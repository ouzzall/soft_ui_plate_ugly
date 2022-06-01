import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiInput from "@uf/components/SuiInput";
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
// import SuiTypography from "@uf/components/SuiTypography";
import SuiButton from "@uf/components/SuiButton";
import FormField from "@uf/layouts/ecommerce/products/new-product/components/FormField";
// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import DataTable from "@uf/examples/Tables/DataTable";
// import ActionCell from "@uf/layouts/dashboards/redumtion/components/ActionCell";
// Data
// import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";
import SuiDatePicker from "@uf/components/SuiDatePicker";
import SuiSelect from "@uf/components/SuiSelect";
import { useEffect, useState } from "react";
import Loader from "@uf/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../reducers/loadingSlice";

function Redumtion() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [queryString, setQueryString] = useState('');
    const [reloadTable, setReloadTable] = useState(false);

    const [planTitle, setPlanTitle] = useState('');
    const [planDays, setPlanDays] = useState(0);
    const [planOrders, setPlanOrders] = useState(0);
    const [planPercentage, setPlanPercentage] = useState(0);

    useEffect(() => {
        let query = '';
        if (startDate != '') {
            query += `startDate=${startDate}`;
        }
        if (endDate != '') {
            query += `&endDate=${endDate}`;
        }
        setQueryString(query);
    }, [startDate, endDate]);

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setQueryString('');
        setReloadTable(!reloadTable);
    }

    function saveHandler(e)
    {
        e.preventDefault();

        console.log(planTitle,planDays,planOrders,planPercentage);
        // console.log(e);

        const formData = new FormData();

        formData.append("title", planTitle);
        formData.append("days", planDays);
        formData.append("orders", planOrders);
        formData.append("percentage", planPercentage);


        fetch("/add_plan", {
        method: "POST",
        // headers: { "content-Type": "application/json" },
        body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if (data.status === true) {
            // history.replace("/user-management");
            console.log(data);
            } else if (data.status === false) {
            console.log(data);
            // setErrorText(data.data);
            // setErrorSB(true);
            }
        });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox   py={3}  >
                <Grid container  sx={{ height: "100%" }}>
                    <Grid item xs={12} lg={5}>
                        <Card style={{ minHeight: "400px",padding: "40px 15%" }}>
                            <SuiBox >
                                <h5>Plan Manager</h5>

                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12} sm={4} >
                                        <FormField type="text" label="Plan Name / Title" onChange={(e) => setPlanTitle(e.target.value)} placeholder="Title"  />
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="number" label="Number of Days" onChange={(e) => setPlanDays(e.target.value)} placeholder="0"  />
                                    <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Star Color</label>
                                       <SuiSelect
                                        placeholder="Select Star Color"
                                        options={[
                                            { value: "gold", label: "Gold" },
                                            { value: "silver", label: "Silver" },
                                            { value: "bronze", label: "Bronze" },
                                            { value: "Red", label: "Red" },
                                            { value: "blue", label: "Blue" },
                                            { value: "orange", label: "Orange" },

                                        ]}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="number" label="Number of Orders" onChange={(e) => setPlanOrders(e.target.value)} placeholder="0"  />
                                </Grid>
                                <Grid item  md={6} xs={12} sm={4} >
                                        <label style={{fontSize:"13px",fontWeight:"700"}}>Percentage </label>
                                        <Tooltip title="Multiply with cashback Points" placement="bottom" arrow>
                                            <ReportGmailerrorredRoundedIcon style={{fontSize:"20px !important",marginBottom:"-4px"}}/>
                                        </Tooltip>
                                        <SuiInput placeholder="Percentage" onChange={(e) => setPlanPercentage(e.target.value)} icon={{ component: "percent", direction: "right", }} />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mt={5} justifyContent="center">
                                    <SuiButton type="submit" variant="gradient" color="info" onClick={saveHandler}>Save</SuiButton>
                                </Grid>
                            </SuiBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={7} >
                    <SuiBox my={3} style={{marginLeft:"24px",marginTop:"0"}}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <SuiBox display="flex" >
                        <SuiBox style={{ width: "150px"}}>
                            <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Plan</label>
                                       <SuiSelect
                                        placeholder="Select Plan"
                                        options={[
                                            { value: "Weekly", label: "weekly" },
                                            { value: "Monthly", label: "Monthly" },
                                            { value: "Fortnightly", label: "Fortnightly" },
                                            { value: "Yearly", label: "Yearly" },
                                        ]}
                                        />
                        </SuiBox>
                        <SuiBox ml={1} mt={4}>
                            <SuiButton onClick={() => setReloadTable(!reloadTable)} variant="gradient" color="info">
                                Filter
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                    <SuiBox display="flex">
                        {/* <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Category"
                                options={[
                                    { value: "area-wise", label: "Area Wise" },
                                    { value: "order Wise", label: "Order Wise" },
                                ]}
                            />
                            </SuiBox> */}
                    </SuiBox>
                </SuiBox>
                <Card >
                    {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={`/get_plans`}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Title", accessor: "title" },
                                { Header: "Days", accessor: "days" },
                                { Header: "Orders", accessor: "orders" },
                                { Header: "Percentage", accessor: "percentage" },
                            ]
                        }}
                        key={reloadTable}
                        filterQuery={queryString}
                    />

                </Card>
            </SuiBox>
                    </Grid>
                </Grid>
            </SuiBox>

            <Footer />
        </DashboardLayout>
    );
}

export default Redumtion;
