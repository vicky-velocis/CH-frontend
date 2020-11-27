import {
    getBreak,
    getCommonHeader,
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import set from "lodash/set";
  import { httpRequest } from "../../../../ui-utils";
  import { searchForm } from "./searchPayslipResource/searchForm";
  //import { searchResults } from "./searchPayslipResource/searchResults";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import commonConfig from '../../../../config/common';
  import {  
    samplePaySlip
    } from "../../../../ui-utils/sampleResponses";
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  //enableButton = hasButton && hasButton === "false" ? false : true;
  
  const header = getCommonHeader({
    labelName: "Search Pay Slip",
    labelKey: "INTIGRATION_PAYSLIP",
  });
  

  
  const getMDMSData = async (action, state, dispatch) => {

    const tenantId = getTenantId();
  
    let mdmsBody = {
      
    };
  
    try {
      const payload = await httpRequest(
        "post",
        "/integration-services/pt/v1/_getSectorList",
        "_search",
        [],
        mdmsBody
      );
      dispatch(prepareFinalObject("searchScreenMdmsData", payload.ResponseBody[0]));
    } catch (e) {
      console.log(e);
    }
  };


  
  const sepSearchAndResult = {
    uiFramework: "material-ui",
    name: "payslipsearch",
    beforeInitScreen: (action, state, dispatch) => {
            // fetching MDMS data
      //getMDMSData(action, state, dispatch);

      // set yaer current year with last 3 year
      let year =[]
      year.push(
        {
          code:Number(new Date().getFullYear()),
          name:Number(new Date().getFullYear())
        }
      )
      for (let index = 0; index < 3; index++) {        
        year.push(
          {
            code:Number(new Date().getFullYear())-(index+1),
            name:Number(new Date().getFullYear())-(index+1),
          }
        )
      }
      dispatch(prepareFinalObject("intigration.year", year));
      dispatch(prepareFinalObject("searchScreen", {}));
      let  APIData =samplePaySlip();
      dispatch(prepareFinalObject("APIData",APIData));
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "search",
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
  
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 6,
                },
                ...header,
              },

            },
          },
          searchForm,
          breakAfterSearch: getBreak(),
          payslipData: {
            uiFramework: "custom-containers-local",        
            componentPath: "PayslipContainer",
            moduleName: "egov-integration",
              props: {
                dataPath: "records",
                moduleName: "RTI",
                pageName:"INTIGRATION_PAYSLIP",
  
              }
          },
        },
      },
    },
  };
  
  export default sepSearchAndResult;
  