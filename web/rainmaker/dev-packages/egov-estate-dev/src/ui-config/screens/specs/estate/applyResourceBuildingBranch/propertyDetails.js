import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
  displayDefaultErr,
  displayMaxLengthErr,
  _getPattern,
  getTodaysDateInYMD
} from "../../utils";

const possessionDateField = {
  label: {
    labelName: "Possession Date",
    labelKey: "ES_POSSESSION_DATE_LABEL"
  },
  placeholder: {
    labelName: "Enter Possession Date",
    labelKey: "ES_POSSESSION_DATE_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  required: true,
  jsonPath: "Properties[0].propertyDetails.owners[0].ownerDetails.possesionDate",
  // props: {
  //   inputProps: {
  //     max: getTodaysDateInYMD()
  //   }
  // }
}

const categoryField = {
  label: {
      labelName: "Category",
      labelKey: "ES_CATEGORY_LABEL"
  },
  placeholder: {
      labelName: "Select Category",
      labelKey: "ES_CATEGORY_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].category",
  sourceJsonPath: "applyScreenMdmsData.EstateServices.categories",
  gridDefination: {
      xs: 12,
      sm: 6
  },
  afterFieldChange: (action, state, dispatch) => {
      dispatch(
          handleField(
              "apply",
              `components.div.children.formwizardFirstStep.children.propertyInfoDetails.children.cardContent.children.detailsContainer.children.subCategory`,
              "props.value",
              ""
          )
      )
      
      if (action.value == "CAT.RESIDENTIAL" || action.value == "CAT.COMMERCIAL") {
          dispatch(
              handleField(
                  "apply",
                  `components.div.children.formwizardFirstStep.children.propertyInfoDetails.children.cardContent.children.detailsContainer.children.subCategory`,
                  "visible",
                  true
              )
          );

          const categories = get(
              state.screenConfiguration.preparedFinalObject,
              "applyScreenMdmsData.EstateServices.categories"
          )

          const filteredCategory = categories.filter(item => item.code === action.value);
          dispatch(
              handleField(
                  "apply",
                  `components.div.children.formwizardFirstStep.children.propertyInfoDetails.children.cardContent.children.detailsContainer.children.subCategory`,
                  "props.data",
                  filteredCategory[0].SubCategory
              )
          )
      } else {
          dispatch(
              handleField(
                  "apply",
                  `components.div.children.formwizardFirstStep.children.propertyInfoDetails.children.cardContent.children.detailsContainer.children.subCategory`,
                  "visible",
                  false
              )
          );
      }
  }
}

const subCategoryField = {
  label: {
      labelName: "Sub Category",
      labelKey: "ES_SUBCATEGORY_LABEL"
  },
  placeholder: {
      labelName: "Select Sub Category",
      labelKey: "ES_SUBCATEGORY_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].subCategory",
  visible: false,
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const siteNumberField = {
  label: {
      labelName: "Site Number/SCO/Booth",
      labelKey: "ES_SITE_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Enter Site Number",
      labelKey: "ES_SITE_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  pattern: _getPattern("fileNumber"),
  jsonPath: "Properties[0].siteNumber"
}