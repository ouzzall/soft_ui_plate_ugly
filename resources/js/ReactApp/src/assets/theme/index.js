/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Soft UI Dashboard PRO React base styles
import colors from "@uf/assets/theme/base/colors";
import breakpoints from "@uf/assets/theme/base/breakpoints";
import typography from "@uf/assets/theme/base/typography";
import boxShadows from "@uf/assets/theme/base/boxShadows";
import borders from "@uf/assets/theme/base/borders";
import globals from "@uf/assets/theme/base/globals";

// Soft UI Dashboard PRO React helper functions
import boxShadow from "@uf/assets/theme/functions/boxShadow";
import hexToRgb from "@uf/assets/theme/functions/hexToRgb";
import linearGradient from "@uf/assets/theme/functions/linearGradient";
import pxToRem from "@uf/assets/theme/functions/pxToRem";
import rgba from "@uf/assets/theme/functions/rgba";

// Soft UI Dashboard PRO React components base styles for @mui material components
import sidenav from "@uf/assets/theme/components/sidenav";
import list from "@uf/assets/theme/components/list";
import listItem from "@uf/assets/theme/components/list/listItem";
import listItemText from "@uf/assets/theme/components/list/listItemText";
import card from "@uf/assets/theme/components/card";
import cardMedia from "@uf/assets/theme/components/card/cardMedia";
import cardContent from "@uf/assets/theme/components/card/cardContent";
import button from "@uf/assets/theme/components/button";
import iconButton from "@uf/assets/theme/components/iconButton";
import inputBase from "@uf/assets/theme/components/form/inputBase";
import menu from "@uf/assets/theme/components/menu";
import menuItem from "@uf/assets/theme/components/menu/menuItem";
import switchButton from "@uf/assets/theme/components/form/switchButton";
import divider from "@uf/assets/theme/components/divider";
import tableContainer from "@uf/assets/theme/components/table/tableContainer";
import tableHead from "@uf/assets/theme/components/table/tableHead";
import tableCell from "@uf/assets/theme/components/table/tableCell";
import linearProgress from "@uf/assets/theme/components/linearProgress";
import breadcrumbs from "@uf/assets/theme/components/breadcrumbs";
import slider from "@uf/assets/theme/components/slider";
import avatar from "@uf/assets/theme/components/avatar";
import tooltip from "@uf/assets/theme/components/tooltip";
import appBar from "@uf/assets/theme/components/appBar";
import tabs from "@uf/assets/theme/components/tabs";
import tab from "@uf/assets/theme/components/tabs/tab";
import stepper from "@uf/assets/theme/components/stepper";
import step from "@uf/assets/theme/components/stepper/step";
import stepConnector from "@uf/assets/theme/components/stepper/stepConnector";
import stepLabel from "@uf/assets/theme/components/stepper/stepLabel";
import stepIcon from "@uf/assets/theme/components/stepper/stepIcon";
import select from "@uf/assets/theme/components/form/select";
import formControlLabel from "@uf/assets/theme/components/form/formControlLabel";
import formLabel from "@uf/assets/theme/components/form/formLabel";
import checkbox from "@uf/assets/theme/components/form/checkbox";
import radio from "@uf/assets/theme/components/form/radio";
import autocomplete from "@uf/assets/theme/components/form/autocomplete";
import input from "@uf/assets/theme/components/form/input";
import flatpickr from "@uf/assets/theme/components/flatpickr";
import swal from "@uf/assets/theme/components/swal";
import container from "@uf/assets/theme/components/container";
import popover from "@uf/assets/theme/components/popover";
import buttonBase from "@uf/assets/theme/components/buttonBase";
import icon from "@uf/assets/theme/components/icon";
import svgIcon from "@uf/assets/theme/components/svgIcon";
import link from "@uf/assets/theme/components/link";
import dialog from "@uf/assets/theme/components/dialog";
import dialogTitle from "@uf/assets/theme/components/dialog/dialogTitle";
import dialogContent from "@uf/assets/theme/components/dialog/dialogContent";
import dialogContentText from "@uf/assets/theme/components/dialog/dialogContentText";
import dialogActions from "@uf/assets/theme/components/dialog/dialogActions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...swal,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInputBase: { ...inputBase },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiFilledInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
