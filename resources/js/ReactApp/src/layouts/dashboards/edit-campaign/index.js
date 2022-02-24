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

// formik components
// import { Formik } from "@uf/formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SuiTagInput from "@uf/components/SuiTagInput";
import SuiInput from "@uf/components/SuiInput";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiButton from "@uf/components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import FormField from "@uf/layouts/ecommerce/products/new-product/components/FormField";
import SuiSelect from "@uf/components/SuiSelect";
import SuiTypography from "@uf/components/SuiTypography";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// NewUser page components
// import UserInfo from "@uf/layouts/pages/users/new-user/components/UserInfo";
// import Address from "@uf/layouts/pages/users/new-user/components/Address";
// import Socials from "@uf/layouts/pages/users/new-user/components/Socials";
// import Profile from "@uf/layouts/pages/users/new-user/components/Profile";

// NewUser layout schemas for form and form feilds
// import validations from "@uf/layouts/pages/users/new-user/schemas/validations";
// import form from "@uf/layouts/pages/users/new-user/schemas/form";
// import initialValues from "@uf/layouts/pages/users/new-user/schemas/initialValues";


function EditCompain({ match }) {
    const { id } = match.params;
    const [campaignData, setCompaignData] = useState({});
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [compaignName, setCompaignName] = useState('');
    const [loyaltyValue, setLoyaltyValue] = useState(0);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getCampaignData = async () => {
            let data = await fetch(`/getCampaign/${id}`);
            let response = await data.json();
            if (response.success) {
                setCompaignData(response.data);
                setCompaignName(response.data.compaign_name);
                let collects = response.data.collections.map(({ product_id }) => ({
                    label: '',
                    value: product_id
                }));

                let pros = response.data.products.map(({ product_id }) => ({
                    label: '',
                    value: product_id
                }));
                setSelectedCollections(collects);
                setSelectedProducts(pros);
                setLoyaltyValue(response.data.loyalty);
            }
        }
        getCampaignData();
        const getCollections = async () => {
            const data = await fetch('/getCollections');
            const response = await data.json();
            if (response.success) {
                setCollections(response.data);
            }
        }
        getCollections();
        const getProducts = async () => {
            const data = await fetch('/getProducts');
            const response = await data.json();
            if (response.success) {
                setProducts(response.data);
            }
        }
        getProducts();
    }, []);

    const handleForm = async (event) => {
        event.preventDefault();
        let collectionsData = selectedCollections.map((collection) => ({
            compaign_id: campaignData?.id,
            product_id: collection.value,
            type: 'collection'
        }));
        let productsData = selectedProducts.map((product) => ({
            compaign_id: campaignData?.id,
            product_id: product.value,
            type: 'product'
        }));
        const compaignData = {
            compaign_name: compaignName,
            collections: collectionsData,
            products: productsData,
            loyalty: loyaltyValue,
        }
        const data = await fetch('/updateCampaign/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compaignData),
        });
        const response = await data.json();
        if(response.success) {
            history.push('/layouts/dashboards/compaigns');
        }
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox component="form" role="form" py={3} mb={20} onSubmit={handleForm}>
                <Grid container justifyContent="center" sx={{ height: "100%" }}>
                    <Grid item xs={12} lg={8}>
                        <Card style={{ minHeight: "400px", }}>
                            <SuiBox style={{ padding: "40px 80px", }}>
                                <h5>Edit Campaign</h5>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12} sm={4} >
                                        <FormField type="text" label="compaign name" placeholder="Compaign Name" value={compaignName} onChange={({ target: { value } }) => {
                                            setCompaignName(value);
                                        }} />
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={4} style={{ paddingTop: "5px", }}>
                                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                            <SuiTypography
                                                component="label"
                                                variant="caption"
                                                fontWeight="bold"
                                                textTransform="capitalize"
                                            >
                                                Collections
                                            </SuiTypography>
                                        </SuiBox>
                                        <SuiSelect value={selectedCollections} onChange={setSelectedCollections}
                                            options={collections}
                                            isMulti
                                        />
                                    </Grid>
                                </Grid>
                                <SuiBox mt={1}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                                <SuiTypography component="label" variant="caption" fontWeight="bold">
                                                    Products
                                                </SuiTypography>
                                            </SuiBox>
                                            <SuiSelect name="products" value={selectedProducts} onChange={setSelectedProducts}
                                                options={products}
                                                isMulti
                                            />
                                        </Grid>
                                    </Grid>
                                </SuiBox>
                                <Grid item md={12} xs={12} sm={4} >
                                        <FormField type="text" label="Loyalty" placeholder="0" value={loyaltyValue} onChange={({ target: { value } }) => {
                                            setLoyaltyValue(value);
                                        }} />
                                    </Grid>
                                <Grid container spacing={3} mt={5} justifyContent="center">
                                    <SuiButton type="submit" variant="gradient" color="info" >Save</SuiButton>
                                </Grid>
                            </SuiBox>
                        </Card>
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default EditCompain;
