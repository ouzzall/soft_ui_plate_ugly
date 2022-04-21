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

/**
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
// import Default from "@uf/layouts/dashboards/default";
// import Automotive from "@uf/layouts/dashboards/automotive";
import SmartHome from "@uf/layouts/dashboards/smart-home";
import Transactions from "@uf/layouts/dashboards/transactions";
import ShipingRules from "@uf/layouts/dashboards/shiping-rules";
import Orders from "@uf/layouts/dashboards/orders";
import Users from "@uf/layouts/dashboards/users";
import Profile from "@uf/layouts/dashboards/profile";
import EditProfile from "@uf/layouts/dashboards/edit-profile";
import SubscriptionRules from "@uf/layouts/dashboards/Subsciption-rules";
import OrderDetails from "@uf/layouts/dashboards/order-details";
import Campaign from "@uf/layouts/dashboards/campaigns";
import CreateCampaign from "@uf/layouts/dashboards/new-campaign";
import EditCampaign from "@uf/layouts/dashboards/edit-campaign";
import RadeemSetting from "@uf/layouts/dashboards/radeem-settings";
import DiscountRule from "@uf/layouts/dashboards/discount-rules";


// import VRDefault from "@uf/layouts/dashboards/virtual-reality/vr-default";

// import VRInfo from "@uf/layouts/dashboards/virtual-reality/vr-info";
// import CRM from "@uf/layouts/dashboards/crm";
// import ProfileOverview from "@uf/layouts/pages/profile/profile-overview";
// import Teams from "@uf/layouts/pages/profile/teams";
// import AllProjects from "@uf/layouts/pages/profile/all-projects";
// import Reports from "@uf/layouts/pages/users/reports";
// import NewUser from "@uf/layouts/pages/users/new-user";
// import Settings from "@uf/layouts/pages/account/settings";
// import Billing from "@uf/layouts/pages/account/billing";
// import Invoice from "@uf/layouts/pages/account/invoice";
// import Security from "@uf/layouts/pages/account/security";
// import General from "@uf/layouts/pages/projects/general";
// import Timeline from "@uf/layouts/pages/projects/timeline";
// import NewProject from "@uf/layouts/pages/projects/new-project";
// import Widgets from "@uf/layouts/pages/widgets";
// import Charts from "@uf/layouts/pages/charts";
// import SweetAlerts from "@uf/layouts/pages/sweet-alerts";
// import Notifications from "@uf/layouts/pages/notifications";
// import PricingPage from "@uf/layouts/pages/pricing-page";
// import RTL from "@uf/layouts/pages/rtl";
// import Kanban from "@uf/layouts/applications/kanban";
// import Wizard from "@uf/layouts/applications/wizard";
// import DataTables from "@uf/layouts/applications/data-tables";
// import Calendar from "@uf/layouts/applications/calendar";
// import Analytics from "@uf/layouts/applications/analytics";
// import Overview from "@uf/layouts/ecommerce/overview";
// import NewProduct from "@uf/layouts/ecommerce/products/new-product";
// import EditProduct from "@uf/layouts/ecommerce/products/edit-product";
// import ProductPage from "@uf/layouts/ecommerce/products/product-page";
// import ProductsList from "@uf/layouts/ecommerce/products/products-list";
// import OrderList from "@uf/layouts/ecommerce/orders/order-list";
// import OrderDetails from "@uf/layouts/ecommerce/orders/order-details";
// import Referral from "@uf/layouts/ecommerce/referral";
import SignInBasic from "@uf/layouts/authentication/sign-in/basic";
// import SignInCover from "@uf/layouts/authentication/sign-in/cover";
// import SignInIllustration from "@uf/layouts/authentication/sign-in/illustration";
import SignUpBasic from "@uf/layouts/authentication/sign-up/basic";
// import SignUpCover from "@uf/layouts/authentication/sign-up/cover";
// import SignUpIllustration from "@uf/layouts/authentication/sign-up/illustration";
// import ResetBasic from "@uf/layouts/authentication/reset-password/basic";
// import ResetCover from "@uf/layouts/authentication/reset-password/cover";
// import ResetIllustration from "@uf/layouts/authentication/reset-password/illustration";
// import LockBasic from "@uf/layouts/authentication/lock/basic";
// import LockCover from "@uf/layouts/authentication/lock/cover";
// import LockIllustration from "@uf/layouts/authentication/lock/illustration";
// import VerificationBasic from "@uf/layouts/authentication/2-step-verification/basic";
// import VerificationCover from "@uf/layouts/authentication/2-step-verification/cover";
// import VerificationIllustration from "@uf/layouts/authentication/2-step-verification/illustration";
// import Error404 from "@uf/layouts/authentication/error/404";
// import Error500 from "@uf/layouts/authentication/error/500";

// Soft UI Dashboard PRO React icons
import Shop from "@uf/examples/Icons/Shop";
// import Office from "@uf/examples/Icons/Office";
// import SettingsIcon from "@uf/examples/Icons/Settings";
// import Basket from "@uf/examples/Icons/Basket";
// import Document from "@uf/examples/Icons/Document";
// import SpaceShip from "@uf/examples/Icons/SpaceShip";
// import CustomerSupport from "@uf/examples/Icons/CustomerSupport";
// import CreditCard from "@uf/examples/Icons/CreditCard";

const routes = [
    {
        role: ["admin"],
        name: "Dashboard",
        key: "smart-home",
        icon: <Shop size="12px" />,
        route: '/',
        component: SmartHome,
    },
    {
        role: ["admin"],
        name: "Users",
        key: "users",
        icon: <Shop size="12px" />,
        route: '/users',
        component: Users,
    },
    {
        role: ["admin"],
        name: "Orders",
        key: "orders",
        icon: <Shop size="12px" />,
        route: '/orders',
        component: Orders,
    },
    {
        role: ["customer"],
        name: "Dashboard",
        key: "dashboard",
        icon: <Shop size="12px" />,
        route: "/profile",
        component: Profile,
    },
    {
        role: ["admin", "customer"],
        name: "Transactions",
        key: "transactions",
        icon: <Shop size="12px" />,
        route: '/transactions',
        component: Transactions,
    },
    {
        role: ["admin"],
        name: "Campaigns",
        key: "campaigns",
        icon: <Shop size="12px" />,
        route: "/campaigns",
        component: Campaign,
    },
    {
        role: ["admin"],
        name: "Shipping Rules",
        key: "shipping-rules",
        icon: <Shop size="12px" />,
        route: "/shipping-rules",
        component: ShipingRules,
    },
    {
        role: ["admin"],
        type: "nodisplay",
        name: "Subscription Rules",
        key: "subscription-rules",
        icon: <Shop size="12px" />,
        route: "/subscription-rules",
        component: SubscriptionRules,
    },
    {
        role: ["admin"],
        type: "nodisplay",
        name: "Order Details",
        key: "Order Details",
        icon: <Shop size="12px" />,
        route: "/order-details/:id",
        component: OrderDetails,
    },
    {
        role: ["admin"],
        name: "Radeem Settings",
        key: "Radeem Settings",
        icon: <Shop size="12px" />,
        route: "/radeem-settings",
        component: RadeemSetting,
    },
    {
        role: ["admin", "customer"],
        name: "Discount Rules",
        key: "Discount Rules",
        icon: <Shop size="12px" />,
        route: "/discount-rules",
        component: DiscountRule,
    },
    {
        role: ["customer"],
        type: "nodisplay",
        name: "Edit Profile",
        key: "edit-profile",
        icon: <Shop size="12px" />,
        route: "/edit-profile",
        component: EditProfile,
    },
    {
        role: [],
        type: "nodisplay",
        name: "create campaign",
        key: "create-campaign",
        icon: <Shop size="12px" />,
        route: "/create-campaign",
        component: CreateCampaign,
    },
    {
        role: [],
        type: "nodisplay",
        name: "edit campaign",
        key: "edit-campaign",
        icon: <Shop size="12px" />,
        route: "/edit-campaign/:id",
        component: EditCampaign,
    },

    {
        role: [],
        type: "nodisplay",
        name: "Sign In",
        key: "sign-in",
        icon: <Shop size="12px" />,
        route: "/login",
        component: SignInBasic,
    },

    {
        role: [],
        type: "nodisplay",
        name: "Sign Up",
        key: "sign-up",
        icon: <Shop size="12px" />,
        route: "/signup",
        component: SignUpBasic,
    },


];

export default routes;
