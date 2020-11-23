import {
  getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject,handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults ,setXLSTableData } from "../../../../ui-utils/commons";
import {onTabChange, headerrow, tabs} from './search-preview'
import { getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getReviewLicenseFee, getReviewInterest, getReviewSecurity, getReviewGroundRent, rentDetailsTable } from "./applyResource/reviewProperty";
import { getTextToLocalMapping } from "../utils"

const beforeInitFn = async (action, state, dispatch, fileNumber) => {
  if(fileNumber){
    let queryObject = [{ key: "fileNumber", value: fileNumber }];
    const response =  await getSearchResults(queryObject);
    if(!!response) {
      let properties = response.Properties;
      dispatch(prepareFinalObject("Properties[0]", properties[0]));
      let demandGenerationType = properties[0].propertyDetails.paymentConfig.isGroundRent;
      let rentInfo = properties[0].propertyDetails.paymentConfig.paymentConfigItems ? properties[0].propertyDetails.paymentConfig.paymentConfigItems : [];

      let data = rentInfo.map(item => ({
        [getTextToLocalMapping("Rent amount")]: item.groundRentAmount || 0,
        [getTextToLocalMapping("Start month")]: item.groundRentStartMonth || 0,
        [getTextToLocalMapping("End month")]: item.groundRentEndMonth || 0,
        [getTextToLocalMapping("Till")]: (item.groundRentEndMonth/12).toFixed(2) || 0,
      }));

      debugger

      let isInterestFixedLabel = properties[0].propertyDetails.paymentConfig.isIntrestApplicable ? "ES_FIXED_INTEREST_LABEL" : "ES_YEARLY_INTEREST_LABEL";

      dispatch(
        handleField(
          action.screenKey,
          "components.div.children.reviewRentInfo.children.cardContent.children.interestDetails.children.cardContent.children.viewInterest.children.percentageOfInterest.children.label.children.key",
          "props.labelKey",
          isInterestFixedLabel 
        )
      )
      dispatch(
        handleField(
          action.screenKey,
          "components.div.children.reviewRentInfo.children.cardContent.children.rentTable",
          "props.data",
          data
        )
      );

      dispatch(
        handleField(
          action.screenKey,
          "components.div.children.reviewRentInfo.children.cardContent.children.groundRentDetails",
          "visible",
          !!demandGenerationType
        )
      )
      dispatch(
        handleField(
          action.screenKey,
          "components.div.children.reviewRentInfo.children.cardContent.children.licenseFeeDetails",
          "visible",
          !demandGenerationType
        )
      )
    }
  }
}


const EstateRentInfo = {
uiFramework: "material-ui",
name: "rent-information",
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
          header1: {
            gridDefination: {
              xs: 12,
              sm: 8
            },
           ...headerrow
          },
          }
        },
        tabSection: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-estate",
          componentPath: "CustomTabContainer",
          props: {
            tabs,
            activeIndex: 7,
            onTabChange
          },
          type: "array",
        },
        breakAfterSearch: getBreak(),
        reviewRentInfo : getCommonCard({
          groundRentDetails: getReviewGroundRent(false, "apply"),
          breakAfterSearch: getBreak(),
          rentTable: rentDetailsTable,
          licenseFeeDetails: getReviewLicenseFee(false, "apply"),
          interestDetails: getReviewInterest(false, "apply"),
          securityDetails: getReviewSecurity(false, "apply")
        })
    }
  }
}
};

export default EstateRentInfo;