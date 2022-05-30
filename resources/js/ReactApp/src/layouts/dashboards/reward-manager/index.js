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

// import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiSelect from "@uf/components/SuiSelect";
import SuiTypography from "@uf/components/SuiTypography";
import SuiButton from "@uf/components/SuiButton";
import FormField from "@uf/layouts/ecommerce/products/new-product/components/FormField";
import SuiAvatar from "@uf/components/SuiAvatar";
// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import DataTable from "@uf/examples/Tables/DataTable";
// import ActionCell from "@uf/layouts/dashboards/redumtion/components/ActionCell";
import team2 from "@uf/assets/images/team-2.jpg"
// import SuiSelect from "@uf/components/SuiSelect";
// Data
// import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";
import SuiDatePicker from "@uf/components/SuiDatePicker";
import { useEffect, useState } from "react";
import Loader from "@uf/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../reducers/loadingSlice";

import Settings from "@uf/examples/Icons/Settings";
import Cube from "@uf/examples/Icons/Cube";
import SpaceShip from "@uf/examples/Icons/SpaceShip";

function TearManager() {
    const [design, setDesign] = useState(false);
  const [code, setCode] = useState(false);
  const [develop, setDevelop] = useState(false);

  const handleSetDesign = () => {
    setDesign(true)
    setCode(false)
    setDevelop(false)
  
  }
  const handleSetCode = () => {
    setDesign(false)
    setCode(true)
    setDevelop(false)
  
  }
  const handleSetDevelop = () => {
    setDesign(false)
    setCode(false)
    setDevelop(true)
  
  }

  const customButtonStyles = ({
    functions: { pxToRem, rgba },
    borders: { borderWidth },
    palette: { transparent, dark, secondary },
  }) => ({
    width: pxToRem(60),
    height: pxToRem(60),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

  
  });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [queryString, setQueryString] = useState('');
    const [reloadTable, setReloadTable] = useState(false);

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

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox   py={3}  >
                <Grid container ="center" sx={{ height: "100%" }}>
                    <Grid item xs={12} lg={5}>
                        <Card style={{ minHeight: "400px",padding: "40px 15%" }}>
                            <SuiBox >
                                <h5>Reward Manager</h5>
                               
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="text" label="Title" placeholder="Title.."  />
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Parent</label>
                                       <SuiSelect
                                        placeholder="Select Parent"
                                        options={[
                                            { value: "no", label: "No Parent" },
                                            { value: "february", label: "February" },
                                            { value: "march", label: "March" },
                                            { value: "april", label: "April" },
                                            { value: "may", label: "May" },
                                            { value: "june", label: "June" },
                                            { value: "july", label: "July" },
                                            { value: "august", label: "August" },
                                            { value: "september", label: "September" },
                                            { value: "october", label: "October" },
                                            { value: "november", label: "November" },
                                            { value: "december", label: "December" },
                                        ]}  
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={4} >
                                    <SuiBox mt={2}>
                                        <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} sm={3}>
                                            <SuiBox textAlign="center">
                                            <SuiButton
                                                color="secondary"
                                                variant={design ? "contained" : "outlined"}
                                                onClick={handleSetDesign}
                                                sx={customButtonStyles}
                                            >
                                                <Settings size="24px" color={design ? "white" : "dark"} />
                                            </SuiButton>
                                            <SuiTypography variant="h6" className="selectProductTitle">Design</SuiTypography>
                                            </SuiBox>
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={3}>
                                            <SuiBox textAlign="center">
                                            <SuiButton
                                                color="secondary"
                                                variant={code ? "contained" : "outlined"}
                                                onClick={handleSetCode}
                                                sx={customButtonStyles}
                                            >
                                                <Cube size="24px" color={code ? "white" : "dark"} />
                                            </SuiButton>
                                            <SuiTypography variant="h6"className="selectProductTitle">Code</SuiTypography>
                                            </SuiBox>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <SuiBox textAlign="center">
                                            <SuiButton
                                                color="secondary"
                                                variant={develop ? "contained" : "outlined"}
                                                onClick={handleSetDevelop}
                                                sx={customButtonStyles}
                                            >
                                                <SpaceShip size="24px" color={develop ? "white" : "dark"} />
                                            </SuiButton>
                                            <SuiTypography variant="h6" className="selectProductTitle">Develop</SuiTypography>
                                            </SuiBox>
                                        </Grid>
                                        </Grid>
                                    </SuiBox>
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="number" label="Number of Orders" placeholder="0"  />
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="number" label="Number of Days" placeholder="0"  />
                                    </Grid>
                                    
                                   
                                    <Grid item md={12} xs={12} sm={4} >
                                        <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Product</label>
                                       <SuiSelect
                                        placeholder="Select Product"
                                        options={[
                                            { value: "Abc Product",  label: (
                                                <SuiBox className="productSelect">
                                                <img
                                                    src={team2}
                                                    alt="alt_image"
                                                    width={22}
                                                    className="img_tag_styling"
                                                /><p>Product 1</p>
                                                </SuiBox>
                                            ), },
                                            { value: "Def Product",  label: (
                                                <SuiBox className="productSelect">
                                                <img
                                                    src={team2}
                                                    alt="alt_image"
                                                    width={22}
                                                    className="img_tag_styling"
                                                /><p>Def Product</p>
                                                </SuiBox>
                                            ), },
                                            { value: "zxc product",  label: (
                                                <SuiBox className="productSelect">
                                                <img
                                                    src={team2}
                                                    alt="alt_image"
                                                    width={22}
                                                    className="img_tag_styling"
                                                /><p>Zxc Product</p>
                                                </SuiBox>
                                            ), },
                                            
                                            
                                        ]}  
                                        />
                                    </Grid>
                                </Grid>
                                
                                <Grid container spacing={3} mt={5} justifyContent="center">
                                    <SuiButton type="submit" variant="gradient" color="info" >Save</SuiButton>
                                </Grid>
                            </SuiBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={7} >
                    <SuiBox my={3} style={{marginLeft:"24px",marginTop:"0"}}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <SuiBox display="flex" >
                        <suiBox style={{ width: "150px"}}>
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
                        </suiBox>
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
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={`/getDiscounts`}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Customers Name", accessor: "user.name" },
                                { Header: "Discount Code", accessor: "discount_code" },
                                { Header: "Starts at", accessor: "starts_at" },
                                { Header: "Ends at", accessor: "ends_at" },
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

export default TearManager;
