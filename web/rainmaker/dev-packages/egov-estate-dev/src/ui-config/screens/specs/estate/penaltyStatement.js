import {
    getCommonCard,getCommonHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject,handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults ,setXLSTableData } from "../../../../ui-utils/commons";
import {getReviewPayment} from './preview-resource/payment-details'
import {onTabChange, headerrow, tabs} from './estate-payment'
import { getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import {penaltyInfo} from "./preview-resource/preview-properties"
import {penaltyStatmentResult} from "./searchResource/functions"
const header = getCommonHeader({
  labelName: "Penalty",
  labelKey: "ES_PENALTY_STATEMENT"
});

const penaltySummary = getCommonCard(penaltyInfo(false))

const beforeInitFn = async (action, state, dispatch, fileNumber) => {
  if(fileNumber){
      let queryObject = [
          { key: "fileNumber", value: fileNumber }
        ];
   const response =  await getSearchResults(queryObject);
    if(!!response) {
      let properties = response.Properties
      const propertyId = properties[0].id;   
      let Criteria = {
        fromdate: properties[0].propertyDetails.auditDetails.createdTime || "",
        todate:   ""
      }
      Criteria = {...Criteria, propertyid: propertyId}
      await penaltyStatmentResult (state,dispatch, Criteria)
    }
  }
}


const penaltyStatementDetails = {
  uiFramework: "material-ui",
  name: "penaltyStatement",
  beforeInitScreen: (action, state, dispatch) => {
    const fileNumber = getQueryArg(window.location.href, "fileNumber");
    beforeInitFn(action, state, dispatch, fileNumber);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
             ...header
            },
            }
          },
          tabSection: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-estate",
            componentPath: "CustomTabContainer",
            props: {
              tabs,
              activeIndex: 1,
              onTabChange
            },
            type: "array",
          },
          breakAfterSearch: getBreak(),
         penaltySummary
      }
    }
  }
};

export default penaltyStatementDetails;