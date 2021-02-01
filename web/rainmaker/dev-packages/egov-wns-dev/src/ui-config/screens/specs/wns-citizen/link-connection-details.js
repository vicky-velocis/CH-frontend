import {
    getCommonHeader,
    getLabel,
    getBreak,
    getCommonApplyFooter
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getSearchPensioner } from "../../../../ui-utils/commons";
  import { conectionDetails} from "./linkConnectionResources/conectionDetails"  
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import {
    getTenantId
  } from "egov-ui-kit/utils/localStorageUtils";
  import find from "lodash/find";
  import set from "lodash/set";
  import get from "lodash/get";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { footer } from "./linkConnectionResources/footer";
  
  export const prepareEditFlow = async (
    state,
    dispatch,
    applicationNumber,
    tenantId
  ) => {
   
    
    if (applicationNumber) {
  
      let queryObject = [
        {
          key: "pensionerNumber",
        value: applicationNumber
         
        }];
      queryObject.push({
        key: "tenantId",
        value: tenantId
      });
      
       
       //export const pmsfooter = footer(response) ;
       //dispatch(prepareFinalObject("ProcessInstances", get(response, "Pensioners", [])));
       const ActionItem = [
        { action: "WS_COMMON_BUTTON_SUBMIT" }, 
      
      ];
  
       set(state, "screenConfiguration.preparedFinalObject.ProcessInstances[0].state.actions", ActionItem);
  
     
    }
  };
  
  const header = getCommonHeader({
    labelName: "Death of an Pensioner",
    labelKey: "PENSION_DEATH_OF_AN_PENSIONER"
  });
  const LinkConnectionResult = {
    uiFramework: "material-ui",
    name: "applydop",
    beforeInitScreen: (action, state, dispatch) => {
    //  resetFields(state, dispatch);
      const tenantId = getTenantId();
      const id = getQueryArg(
        window.location.href,
        "id"
      );
     
     //get Eployee details data
  prepareEditFlow(state, dispatch, id, tenantId).then(res=>
    {
  
    }
  );
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "applydop"
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
              
            }
          },
          conectionDetails:conectionDetails(),
          break:getBreak(),         
          footer:footer()
  
         
        }
      },
     
    }
  };
  
  export default LinkConnectionResult;
  