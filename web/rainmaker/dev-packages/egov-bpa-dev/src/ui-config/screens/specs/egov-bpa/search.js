import {
  getCommonHeader,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { BPAApplication } from "./searchResource/fireNocApplication";
import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { pendingApprovals } from "./searchResource/pendingApprovals";
import { searchResults } from "./searchResource/searchResults";
import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import {
  getTenantId,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import find from "lodash/find";
import set from "lodash/set";
import get from "lodash/get";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "BPA",
  labelKey: "BPA"
});

const pageResetAndChange = (state, dispatch) => {
  dispatch(
    prepareFinalObject("BPA's", [{ "bpaDetails.bpaType": "NEW" }])
  );
  // dispatch(setRoute("/tradelicence/apply"));
};

const startApplyFlow = (state, dispatch) => {
  dispatch(prepareFinalObject("BPAs", []));
  const applyUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? `/egov-ui-framework/egov-bpa/apply` : `/egov-bpa/apply`;
  dispatch(setRoute(applyUrl));
};

const NOCSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    resetFields(state, dispatch);
    const tenantId = getTenantId();
    const BSqueryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessServices", value: "BPA" }
    ];
    setBusinessServiceDataToLocalStorage(BSqueryObject, dispatch);
    const businessServiceData = JSON.parse(
      localStorageGet("businessServiceData")
    );
    const data = find(businessServiceData, { businessService: "BPA" });
    const { states } = data || [];
    if (states && states.length > 0) {
      const status = states.map((item, index) => {
        return {
          code: item.state
        };
      });
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.searchScreen.status",
          status.filter(item => item.code != null)
        )
      );
    }
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.BPA.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        getRequiredDocuments(documents)
      );
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: getLabel({
                  labelName: "NEW APPLICATION",
                  labelKey: "NOC_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  pageResetAndChange(state, dispatch);
                  showHideAdhocPopup(state, dispatch, "search");
                  startApplyFlow(state, dispatch);
                }
              },
              // roleDefination: {
              //   rolePath: "user-info.roles",
              //   roles: ["NOC_CEMP", "SUPERUSER"]
              // }
            }
          }
        },
        pendingApprovals,
        BPAApplication,
        breakAfterSearch: getBreak(),
        // progressStatus,
        searchResults
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default NOCSearchAndResult;
