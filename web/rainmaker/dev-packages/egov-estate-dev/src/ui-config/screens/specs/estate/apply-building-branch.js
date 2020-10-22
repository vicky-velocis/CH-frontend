import {
  getCommonHeader,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  stepper,
  formwizardFirstStep,
  formwizardSecondStep,
  formwizardThirdStep,
  formwizardFourthStep
} from "./applyResourceBuildingBranch/applyConfig";
import {
  footer
} from "./applyResourceBuildingBranch/footer"

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Add Property",
    labelKey: "ES_COMMON_ADD_PROPERTY"
  }),
  fileNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-estate",
    componentPath: "FileNumberContainer",
    props: {
      number: ""
    },
    visible: false
  }
})

const getData = (action, state, dispatch) => {
  
}

const createProperty = {
  uiFramework: "material-ui",
  name: "apply-building-branch",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch)
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        footer
      }
    }
  }
}

export default createProperty;