import get from "lodash/get";
import { convertEpochToDate, convertDateToEpoch,epochToYmd } from "../../utils/index";

import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
//import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { httpRequest } from "../../../../../ui-utils/api";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
const moveToSuccess = async(Action, dispatch) => {
  
  const employeeID = getQueryArg(
    window.location.href,
    "employeeID"
  );
  
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const purpose = Action;
  const status = "success";
  dispatch(
    setRoute(
      `/pms/acknowledgementInitiate?purpose=${purpose}&status=${status}&employeeID=${employeeID}`
    )
  );
  
};
export const addConnectionMappingApiCall = async (state, dispatch) => {  
 
  let id = getQueryArg(window.location.href, "id");
  let WFBody = {
    WaterConnection: [
      {
        id: id,
        tenantId: tenantId,
          
      }       
  ]
  };

  try {
    let payload = null;     
    payload = await httpRequest(
      "post",
      "/ws-services/wc/_addConnectionMapping",
      "",
      [],
      WFBody
    );

    
    dispatch(toggleSnackbar(
      true,
      { labelName: "succcess ", labelKey: "WS_SUCCESS" },
      "success"
    ))

  } catch (error) {      
    
      dispatch(toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      ));
     // moveToSuccess("INITIATED",dispatch)
  }

  }


