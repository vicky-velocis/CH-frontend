import {
  getCommonApplyFooter,
  validateFields
} from "../../utils";
import {
  getLabel,
  dispatchMultipleFieldChangeAction,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  toggleSnackbar,
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
  setRoute
} from "egov-ui-framework/ui-redux/app/actions";
import {
  some,
  set
} from "lodash";
import "./index.css";
import { WF_ALLOTMENT_OF_SITE } from "../../../../../ui-constants";

export const DEFAULT_STEP = -1;
export const PROPERTY_DETAILS_STEP = 0;
export const OWNER_DETAILS_STEP = 1;
export const OWNER_DOCUMENTS_STEP = 2;
export const SUMMARY_STEP = 3;

export const moveToSuccess = (data, dispatch, type) => {
  const id = get(data, "id");
  const tenantId = get(data, "tenantId");
  const fileNumber = get(data, "fileNumber");
  const applicationNumber = get(data, "applicationNumber")
  const purpose = "apply";
  const status = "success";
  let path = "";
  switch(type) {
    case WF_ALLOTMENT_OF_SITE : 
      path = `/estate/acknowledgement?purpose=${purpose}&status=${status}&fileNumber=${fileNumber}&tenantId=${tenantId}&type=${type}`;
      break;
    default : {
      const {branchType, moduleType, applicationType} = data;
      type = `${branchType}_${moduleType}_${applicationType}`;
      path = `/estate/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNumber}&tenantId=${tenantId}&type=${type}`
    }
  }
  dispatch(
    setRoute(path)
  );
};

const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  let isFormValid = true;
  let hasFieldToaster = true;

  if (activeStep === PROPERTY_DETAILS_STEP) {
    /* const isPropertyInfoValid = validateFields(
      "components.div.children.formwizardFirstStep.children.propertyInfoDetails.children.cardContent.children.detailsContainer.children",
      state,
      dispatch,
      "apply"
    )

    if (isPropertyInfoValid) {
      const res = await applyEstates(state, dispatch, activeStep);
      if (!res) {
        return
      }
    } else {
      isFormValid = false;
    } */
  }

  if (activeStep === OWNER_DETAILS_STEP) {
    /* let isOwnerDetailsValid = true;

    if (isOwnerDetailsValid) {
      const res = await applyEstates(state, dispatch, activeStep);
      if (!res) {
        return
      }
    } else {
      isFormValid = false;
    } */
  }

  if (activeStep === OWNER_DOCUMENTS_STEP) {
    /* const propertyOwners = get(
      state.screenConfiguration.preparedFinalObject,
      "Properties[0].propertyDetails.owners"
    );

    const propertyOwnersTemp = get(
      state.screenConfiguration.preparedFinalObject,
      "PropertiesTemp[0].propertyDetails.owners"
    );

    for (var i = 0; i < propertyOwnersTemp.length; i++) {
      const uploadedDocData = get(
        state.screenConfiguration.preparedFinalObject,
        `Properties[0].propertyDetails.owners[${i}].ownerDetails.ownerDocuments`,
        []
      );

      const uploadedTempDocData = get(
        state.screenConfiguration.preparedFinalObject,
        `PropertiesTemp[0].propertyDetails.owners[${i}].ownerDetails.ownerDocuments`,
        []
      );

      for (var y = 0; y < uploadedTempDocData.length; y++) {
        if (
          uploadedTempDocData[y].required &&
          !some(uploadedDocData, {
            documentType: uploadedTempDocData[y].name
          })
        ) {
          isFormValid = false;
        }
      }
      if (isFormValid) {
        const reviewDocData =
          uploadedDocData &&
          uploadedDocData.map(item => {
            return {
              title: `ES_${item.documentType}`,
              link: item.fileUrl && item.fileUrl.split(",")[0],
              linkText: "View",
              name: item.fileName
            };
          });
        dispatch(
          prepareFinalObject(`PropertiesTemp[0].propertyDetails.owners[${i}].ownerDetails.reviewDocData`, reviewDocData)
        );

        const reviewDocuments = getReviewDocuments(true, "apply", `PropertiesTemp[0].propertyDetails.owners[${i}].ownerDetails.reviewDocData`);
        set(
          reviewDocuments,
          "children.cardContent.children.headerDiv.children.header.children.key.props.labelKey",
          `Documents - ${propertyOwners ? propertyOwners[i] ? propertyOwners[i].ownerDetails.ownerName : "" : ""}`
        )
        set(
          state.screenConfiguration.screenConfig,
          `apply.components.div.children.formwizardNinthStep.children.reviewDetails.children.cardContent.children.reviewDocuments_${i}`,
          reviewDocuments
        )
      }
    } */
  }

  if (activeStep === SUMMARY_STEP) {
    /* isFormValid = await applyEstates(state, dispatch, activeStep);
    if (isFormValid) {
      const estatesData = get(
        state.screenConfiguration.preparedFinalObject,
        "Properties[0]"
      );
      moveToSuccess(estatesData, dispatch, WF_ALLOTMENT_OF_SITE);
    } */
  }

  if (activeStep !== SUMMARY_STEP) {
    if (isFormValid) {
      changeStep(state, dispatch, "apply");
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents !",
        labelKey: "ES_ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
      };
      switch (activeStep) {
        case PROPERTY_DETAILS_STEP:
        case OWNER_DETAILS_STEP:
        case OWNER_DOCUMENTS_STEP:
          errorMessage = {
            labelName: "Please upload all the required documents !",
            labelKey: "ES_ERR_UPLOAD_REQUIRED_DOCUMENTS"
          };
          break;
      }
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
}

export const changeStep = (
  state,
  dispatch,
  screenName,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig[screenName],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === DEFAULT_STEP) {
    if (activeStep === SUMMARY_STEP && mode === "next") {
      activeStep = SUMMARY_STEP
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > PROPERTY_DETAILS_STEP ? true : false;
  const isNextButtonVisible = activeStep < SUMMARY_STEP ? true : false;
  const isSubmitButtonVisible = activeStep === SUMMARY_STEP ? true : false;
  const actionDefination = [{
    path: "components.div.children.stepper.props",
    property: "activeStep",
    value: activeStep
  },
  {
    path: "components.div.children.footer.children.previousButton",
    property: "visible",
    value: isPreviousButtonVisible
  },
  {
    path: "components.div.children.footer.children.nextButton",
    property: "visible",
    value: isNextButtonVisible
  },
  {
    path: "components.div.children.footer.children.submitButton",
    property: "visible",
    value: isSubmitButtonVisible
  }
  ];
  dispatchMultipleFieldChangeAction(screenName, actionDefination, dispatch);
  renderSteps(activeStep, dispatch, screenName);
};

export const renderSteps = (activeStep, dispatch, screenName) => {
  switch (activeStep) {
    case PROPERTY_DETAILS_STEP:
      dispatchMultipleFieldChangeAction(
        screenName,
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case OWNER_DETAILS_STEP:
      dispatchMultipleFieldChangeAction(
        screenName,
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case OWNER_DOCUMENTS_STEP:
      dispatchMultipleFieldChangeAction(
        screenName,
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        screenName,
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [{
    path: "components.div.children.formwizardFirstStep",
    property: "visible",
    value: true
  },
  {
    path: "components.div.children.formwizardSecondStep",
    property: "visible",
    value: false
  },
  {
    path: "components.div.children.formwizardThirdStep",
    property: "visible",
    value: false
  },
  {
    path: "components.div.children.formwizardFourthStep",
    property: "visible",
    value: false
  }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "apply", "previous");
};

export const previousButton = {
  componentPath: "Button",
  props: {
    variant: "outlined",
    color: "primary",
    style: {
      minWidth: "180px",
      height: "48px",
      marginRight: "16px",
      borderRadius: "inherit"
    }
  },
  children: {
    previousButtonIcon: {
      uiFramework: "custom-atoms",
      componentPath: "Icon",
      props: {
        iconName: "keyboard_arrow_left"
      }
    },
    previousButtonLabel: getLabel({
      labelName: "Previous Step",
      labelKey: "ES_COMMON_BUTTON_PREV_STEP"
    })
  },
  visible: false
}

export const nextButton = {
  componentPath: "Button",
  props: {
    variant: "contained",
    color: "primary",
    style: {
      minWidth: "180px",
      height: "48px",
      marginRight: "45px",
      borderRadius: "inherit"
    }
  },
  children: {
    nextButtonLabel: getLabel({
      labelName: "Next Step",
      labelKey: "ES_COMMON_BUTTON_NXT_STEP"
    }),
    nextButtonIcon: {
      uiFramework: "custom-atoms",
      componentPath: "Icon",
      props: {
        iconName: "keyboard_arrow_right"
      }
    }
  },
}

export const submitButton = {
  componentPath: "Button",
  props: {
    variant: "contained",
    color: "primary",
    style: {
      minWidth: "180px",
      height: "48px",
      marginRight: "45px",
      borderRadius: "inherit"
    }
  },
  children: {
    submitButtonLabel: getLabel({
      labelName: "Submit",
      labelKey: "ES_COMMON_BUTTON_SUBMIT"
    }),
    submitButtonIcon: {
      uiFramework: "custom-atoms",
      componentPath: "Icon",
      props: {
        iconName: "keyboard_arrow_right"
      }
    }
  },
  visible: false,
}

export const footer = getCommonApplyFooter({
  previousButton: {
    ...previousButton,
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
  },
  nextButton: {
    ...nextButton,
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  submitButton: {
    ...submitButton,
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
  }
});