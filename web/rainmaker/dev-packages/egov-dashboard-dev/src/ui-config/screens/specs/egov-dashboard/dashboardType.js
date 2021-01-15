
import { getBreak, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo, setapplicationType } from "egov-ui-kit/utils/localStorageUtils";
import { getDashboardDropdownData } from "../../../../ui-utils/commons";
import { FilterFormforEmployee } from "./searchResource/FilterFormaforEmployee";
import { dashboardTypeSearchResults } from "./searchResource/dashboardTypeSearchResults";
import { searchAPICall, allDashboardSearchAPICall } from "../egov-dashboard/searchResource/functions";

let role_name = JSON.parse(getUserInfo()).roles[0].code

const header = getCommonHeader(
  {
    labelName: "Dashboard 1",
    labelKey: "DASHBOARD_1"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const defaultDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const getDropDownData = async (action, state, dispatch) => {

  debugger
  let data = getDashboardDropdownData(state, dispatch, status)

  // Date default
  var fromDate = new Date()
  var formatDt = defaultDate(fromDate)
  dispatch(prepareFinalObject("dahsboardHome.defaultFromDate", formatDt));
  dispatch(prepareFinalObject("dahsboardHome.defaulttoDate", formatDt));
}

const DashboardType = {
  uiFramework: "material-ui",
  name: "dashboardType",
  beforeInitScreen: (action, state, dispatch) => {
    
    debugger
    getDropDownData(action, state, dispatch);
    allDashboardSearchAPICall(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "dashboardReportFilter"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              ...header
            },
            
          }
        },
        FilterFormforEmployee,
        breakAfterSearch: getBreak(),
        dashboardTypeSearchResults,
      }
    },
  }
};

export default DashboardType;