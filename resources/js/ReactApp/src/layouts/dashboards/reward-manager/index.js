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
import Actions from "@uf/layouts/dashboards/plan-manager/components/ActionCell";

import Silver from "@uf/assets/images/stars/Silver.png";
import Gold from "@uf/assets/images/stars/Gold.png";
import Red from "@uf/assets/images/stars/Red.png";
import Blue from "@uf/assets/images/stars/Blue.png";
import Green from "@uf/assets/images/stars/Green.png";
import Orange from "@uf/assets/images/stars/Orange.png";
import Pink from "@uf/assets/images/stars/Pink.png";
import Purple from "@uf/assets/images/stars/Purple.png";
import Yellow from "@uf/assets/images/stars/Yellow.png";
import Swal from "sweetalert2";

function TearManager() {
    const [design, setDesign] = useState(false);
    const [code, setCode] = useState(false);
    const [develop, setDevelop] = useState(false);

    const [plans, setPlans] = useState(false);
    const [rewards, setRewards] = useState(false);
    const [products, setProducts] = useState(false);
    const [productsData, setProductsData] = useState(false);

    const [rewardTitle, setRewardTitle] = useState("");
    const [rewardPreviousReward, setRewardPreviousReward] = useState(0);
    const [rewardPlan, setRewardPlan] = useState(0);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [rewardProduct, setRewardProduct] = useState(0);
    const [searchOptions, setSearchOptions] = useState(0);
    const [optionSelected, setOptionSelected] = useState(false);
    const [rewardId, setRewardId] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`/reward_manager_init`, {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Not Fetching data from server.");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setPlans(result.data[0]);
        const options = [];

        const searchOptions = [];
        result.data[0].forEach(element => {
            searchOptions.push({ value: element.id, label: element.title });
        });
        setSearchOptions(searchOptions);

        options.push({ value: 0, label: "" });
        setRewards(options);

        // result.data[0].forEach((element) => {
        // // console.log(element);
        // newData2.push({ value: element.id, label: element.name });
        // });
        // setRewards(options);
        const productsInIt = [];
        setProductsData(result.data[2]);
        result.data[2].forEach((element) => {
            // console.log(element);
            productsInIt.push(
                {
                    value: element.id ,  label: (
                        <SuiBox className="productSelect">
                        <img
                            src={element.image.src}
                            alt="alt_image"
                            width={22}
                            className="img_tag_styling"
                        /><p>{element.title}</p>
                        </SuiBox>
                    ),
                }
            );
        });
        setProducts(productsInIt);
      })
      .catch((err) => {
          console.log(err);
      });

    return () => abortCont.abort();
  }, [`/reward_manager_init`]);


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
        if (optionSelected != '') {
            query += `&selected_plan=${optionSelected.value}`;
        }
        setQueryString(query);
    }, [startDate, endDate, optionSelected]);

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setQueryString('');
        setReloadTable(!reloadTable);
    }

    // function handleSelect(e)
    // {
    //     console.log(e);
    // }

    function addRewardHandler(e)
    {
        e.preventDefault();
        // console.log(productsData);
        let image_src = "";
        let variant_id = "";
        let product_title = "";

        productsData.forEach((element) => {
            if(element.id == rewardProduct.value)
            {
                // console.log(element);
                image_src = element.image.src;
                variant_id = element.variants[0].id;
                product_title = element.title;
            }
        });

        // console.log(rewardTitle,rewardPreviousReward,rewardPlan,rewardPoints,rewardProduct,image_src,variant_id);

        const formData = new FormData();

        console.log(rewardPreviousReward);
        console.log(rewardProduct);

        formData.append("id", rewardId);
        formData.append("reward_title", rewardTitle);
        formData.append("reward_point", rewardPoints);
        formData.append("prev_reward_id", rewardPreviousReward.value);
        formData.append("plan_id", rewardPlan);
        formData.append("product_id", rewardProduct.value);
        formData.append("variant_id", variant_id);
        formData.append("image_src", image_src);
        formData.append("product_title", product_title);

        fetch("/add_reward", {
        method: "POST",
        // headers: { "content-Type": "application/json" },
        body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if (data.status === true) {
            // history.replace("/user-management");
            setReloadTable(!reloadTable);
            setRewardId(false);
            console.log(data);
            Swal.fire("Success!", data.message , "success");
            setRewardTitle("");
            setRewardPoints(0);
            setRewardPreviousReward(0);
            setRewardPlan(0);
            setRewardProduct(0);
            const options = [];
            options.push({ value: 0, label: "" });
            setRewards(options);
            } else if (data.status === false) {
            console.log(data);
            Swal.fire("Error!", data.message , "error");
            // setErrorText(data.data);
            // setErrorSB(true);
            }
        });

    }

    const renderColumns = (row) => ({
        dependency_init: <SuiTypography variant="body" >{row.dependency_title == null ? "No Dependency" : row.dependency_title }</SuiTypography>,
        actions: <Actions edit={() => editHandler(row)} del={() => deleteHandler(row)} />,
        image_src: <SuiBox className="productSelect">
                        <img
                            src={row.image_src}
                            alt="alt_image"
                            width={22}
                            className="img_tag_styling"
                        /><p>{row.reward_title}</p>
                    </SuiBox>,
        star_detail: <SuiBox className="productSelect">
                    <img
                        src={row.star == "Blue" ? Blue :
                            row.star == "Yellow" ? Yellow :
                            row.star == "Silver" ? Silver :
                            row.star == "Gold" ? Gold :
                            row.star == "Red" ? Red :
                            row.star == "Orange" ? Orange :
                            row.star == "Pink" ? Pink :
                            row.star == "Purple" ? Purple :
                             row.star == "Green" ? Green : null }
                        alt="alt_image"
                        width={22}
                        className="img_tag_styling"
                    />
                    <p>{row.title}</p>
                    </SuiBox>,
    });

    function editHandler(e)
    {
        // console.log(e);
        setRewardId(e.id);
        setRewardTitle(e.reward_title);
        setRewardPoints(e.reward_point);
        setRewardPlan(e.plan_id);
        setRewardPreviousReward({ value: e.prev_reward_id, label: e.dependency_title });
        setRewardProduct({value: e.product_id ,  label: (
            <SuiBox className="productSelect">
            <img
                src={e.image_src}
                alt="alt_image"
                width={22}
                className="img_tag_styling"
            /><p>{e.product_title}</p>
            </SuiBox>
        )});
    }

    function deleteHandler(e)
    {
        // console.log(e);
        fetch(`/delete_reward?id=${e.id}`, {
        method: "GET",
        // headers: { "content-Type": "application/json" },
        // body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if (data.status === true) {
            // history.replace("/user-management");
            Swal.fire("Success!", "Reward Deleted" , "success");
            console.log(data);
            setReloadTable(!reloadTable);
            } else if (data.status === false) {
            console.log(data);
            // setErrorText(data.data);
            // setErrorSB(true);
            }
        });
    }

    function planCatcher(e)
    {
        console.log(e);

        const planId = new URLSearchParams({ id: e }).toString();

        fetch(`/get_plan_rewards?${planId}`, {
        // method: "POST",
        // headers: { "content-Type": "application/json" },
        // body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if (data.status === true) {
            // history.replace("/user-management");
            console.log(data);
            const options = [];
            if(data.data.length == 0)
            {
                options.push({ value: 0, label: "No Previous Rewards" });
                setRewards(options);
            }
            else
            {
                data.data.forEach(element => {
                    options.push({ value: element.id, label: element.reward_title });
                });
                setRewards(options);
            }

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
                <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={12} lg={5}>
                        <Card style={{ minHeight: "400px",padding: "40px 15%" }}>
                            <SuiBox >
                                <h5>Reward Manager</h5>

                                <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sm={4} >
                                    <SuiBox mt={2}>
                                        <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Plan</label>
                                        <Grid container spacing={3} justifyContent="center">
                                            {plans &&
                                            plans.map((value, index) => (
                                            <Grid key=  {value.id} item xs={12} sm={3}>
                                                <SuiBox textAlign="center">
                                                <SuiButton
                                                    color="secondary"
                                                    variant={design ? "contained" : "outlined"}
                                                    onClick={() => {setRewardPlan(value.id); planCatcher(value.id)}}
                                                    sx={customButtonStyles}
                                                >
                                                    <Settings size="24px" color={design ? "white" : "dark"} />
                                                </SuiButton>
                                                <SuiTypography variant="h6" className="selectProductTitle">{value.title}</SuiTypography>
                                                </SuiBox>
                                            </Grid>
                                            ))
                                            }
                                        </Grid>
                                    </SuiBox>
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={12} >
                                        <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Parent</label>
                                       <SuiSelect
                                        placeholder="Select Prev Reward"
                                        options={rewards && rewards}
                                        onChange={(e) => {setRewardPreviousReward(e)}}
                                        value={rewardPreviousReward}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField type="text" onChange={(e) => {setRewardTitle(e.target.value)}} value={rewardTitle} label="Title" placeholder="Title.."  />
                                    </Grid>

                                    <Grid item md={6} xs={12} sm={4} >
                                        <FormField onChange={(e) => {setRewardPoints(e.target.value)}} type="number" value={rewardPoints} label="Target Points" placeholder="0"  />
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={4} >
                                        <label className="MuiTypography-root MuiTypography-caption css-cgrud3-MuiTypography-root">Select Product</label>
                                       <SuiSelect
                                        placeholder="Select Product"
                                        options={products && products}
                                        onChange={(e) => {setRewardProduct(e)}}
                                        value={rewardProduct}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mt={5} justifyContent="center">
                                    <SuiButton type="submit" variant="gradient" color="info" onClick={addRewardHandler}>Save</SuiButton>
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
                                        options={searchOptions && searchOptions}
                                        onChange={(event) => {
                                            console.log(event.value);
                                            setOptionSelected(event);
                                        }}
                                        value={optionSelected}
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
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={`/get_rewards`}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Product", accessor: "image_src" },
                                { Header: "Plan", accessor: "star_detail" },
                                { Header: "Target Points", accessor: "reward_point" },
                                { Header: "Dependency", accessor: "dependency_init" },
                                { Header: "Actions", accessor: "actions" },
                            ]
                        }}
                        key={reloadTable}
                        filterQuery={queryString}
                        renderColumns={renderColumns}
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
