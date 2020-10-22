import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { searchApiCall, searchApplicationApiCall} from "./functions";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { get } from "lodash";

const fileNameField = {
  label: {
      labelName: "File Name",
      labelKey: "ES_FILE_NAME_LABEL"
  },
  placeholder: {
      labelName: "Enter File Name",
      labelKey: "ES_FILE_NAME_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: false,
  jsonPath: "searchScreen.fileNumber"
}

const statusField = {
  label: {
    labelName: "Status",
    labelKey: "ES_STATUS_LABEL"
  },
  placeholder: {
    labelName: "Select Status",
    labelKey: "ES_STATUS_PLACEHOLDER"
  },
  required: false,
  jsonPath: "searchScreen.state",
  data:[],
  optionValue: "code",
  optionLabel: "label",
  gridDefination: {
    xs: 12,
    sm: 6
  }
}

const sectorNumberField = {
  label: {
      labelName: "Sector Number",
      labelKey: "ESTATE_SECTOR_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Enter Sector Number",
      labelKey: "ESTATE_SECTOR_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: false,
  jsonPath: "searchScreen.sectorNumber"
}

const buttonItem = {
  firstCont: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  },
  searchButton: {
    componentPath: "Button",
    gridDefination: {
      xs: 12,
      sm: 4
    },
    props: {
      variant: "contained",
      style: {
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
        borderRadius: "2px",
        width: "80%",
        height: "48px"
      }
    },
    children: {
      buttonLabel: getLabel({
        labelName: "Search",
        labelKey: "ES_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
      })
    }
  }
}

export const estateApplication = getCommonCard({
  subParagraph: getCommonParagraph({
    labelName: "Please provide atleast one parameter to search Property",
    labelKey: "ES_PLEASE_PROVIDE_ONE_PARAMETER_TO_SEARCH_PROPERTY_LABEL"
  }),
  searchContainer: getCommonContainer({
    fileNumber: getTextField(fileNameField),
    status: getSelectField(statusField),
    sectorNumber: getTextField(sectorNumberField),
  }),
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      ...buttonItem, 
      searchButton: {
        ...buttonItem.searchButton, 
        onClickDefination: {
        // action: "condition",
        // callBack: searchApiCall
        }
      }, 
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }
    })
  })
});