import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { getAllDashboardResult } from "../../../../../ui-utils/commons";

export const searchAPICall = async (state, dispatch) =>{
  // debugger
  var flag_for_api_call = true

  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId()
    },
    { key: "offset", value: "0" }
  ];
  let dashboardFilterDAta = get(
    state.screenConfiguration.preparedFinalObject,
    "dahsboardHome",
    {}
  );
  
  var dateFromObject = new Date(dashboardFilterDAta["defaultFromDate"]);
  var dateToObject = new Date(dashboardFilterDAta["defaulttoDate"]);
  var fromDateNumeric = dateFromObject.getTime() 
  var toDateNumeric = dateToObject.getTime()
  var moduleName = get(state.screenConfiguration.preparedFinalObject,"dahsboardHome.dropDownData2",{});
  var reportName = get(state.screenConfiguration.preparedFinalObject,"dahsboardHome.reportdefaultDropDownData",{});

  var data = {"fromDate":fromDateNumeric,
  "toDate": toDateNumeric,
  "moduleName": moduleName,
  "reportName": reportName 
  }

  const payload = {
    "tenantId": getTenantId(),
    "moduleName": moduleName.value, // module name 
    "reportName": reportName.value, // report name 
    "searchParams": [
      {
        "name": "fromDate",
        "input": fromDateNumeric
      },
      {
        "name": "toDate",
        "input": toDateNumeric
      }
    ]
  }

  // debugger
  try {

    const response = await getAllDashboardResult( dispatch, payload );

  } catch (error) {

    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
};

// Dashboard 2 Reset Fields
export const resetFields = (state, dispatch) => {

  // Clear Dropdown
  dispatch(
    handleField(
      "dashboardSource",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.moduleDashboardDropdown",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "dashboardSource",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.reportDashboardDropdown",
      "props.value",
      ""
    )
  );

  // Clear Date Field
  dispatch(
    handleField(
      "dashboardSource",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.fromDate",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "dashboardSource",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.toDate",
      "props.value",
      ""
    )
  );

  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.dropDownData2", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.reportdefaultDropDownData", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.defaultFromDate", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.defaulttoDate", {});
};

// Dashboard 1 Reset Fields
export const dashboard1ResetFields = (state, dispatch) => {

  // Clear Dropdown
  dispatch(
    handleField(
      "dashboardType",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.moduleDashboardDropdown",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "dashboardType",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.reportDashboardDropdown",
      "props.value",
      ""
    )
  );

  // Clear Date Field
  dispatch(
    handleField(
      "dashboardType",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.fromDate",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "dashboardType",
      "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.toDate",
      "props.value",
      ""
    )
  );

  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.dropDownData2", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.reportdefaultDropDownData", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.defaultFromDate", {});
  set(state, "screenConfiguration.preparedFinalObject.dahsboardHome.defaulttoDate", {});
};

export const allDashboardSearchAPICall = async (state, dispatch) =>{
  debugger
  var flag_for_api_call = true

  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId()
    },
    { key: "offset", value: "0" }
  ];
  let dashboardFilterDAta = get(
    state.screenConfiguration.preparedFinalObject,
    "dahsboardHome",
    {}
  );
  
  var dateFromObject = new Date(dashboardFilterDAta["defaultFromDate"]);
  var dateToObject = new Date(dashboardFilterDAta["defaulttoDate"]);
  var fromDateNumeric = dateFromObject.getTime() 
  var toDateNumeric = dateToObject.getTime()
  var moduleName = get(state.screenConfiguration.preparedFinalObject,"dahsboardHome.dropDownData2",{});
  var reportName = get(state.screenConfiguration.preparedFinalObject,"dahsboardHome.reportdefaultDropDownData",{});

  var data = {"fromDate":fromDateNumeric,
  "toDate": toDateNumeric,
  "moduleName": moduleName,
  "reportName": reportName 
  }

  const payload = {
    "tenantId": getTenantId(),
    "moduleName": moduleName.value, // module name 
    "reportName": reportName.value, // report name 
    "searchParams": [
      {
        "name": "fromDate",
        "input": fromDateNumeric
      },
      {
        "name": "toDate",
        "input": toDateNumeric
      }
    ]
  }

  // debugger
  try {

    const response = await getAllDashboardResult( dispatch, payload );

  } catch (error) {

    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
};


