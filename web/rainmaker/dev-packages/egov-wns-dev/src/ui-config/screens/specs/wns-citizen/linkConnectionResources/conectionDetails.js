import {
    getBreak,
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getCommonSubHeader,
    getTextField,
    getLabel,
    getDateField,
    getSelectField,
    getCommonContainer,
    getLabelWithValue,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
export const conectionDetails = () => {
   
  
    return getCommonCard({
      header: getCommonTitle(
        {
          labelName: "Employee Details",
          labelKey: "WS_COMMON_TABLE_COL_SERVICE_LABEL"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      break: getBreak(),
      conectiondetails: getCommonContainer({
       
       
        service: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_CITY"
      },
      {
        jsonPath: "applyScreen.property.address.service",
      }
    ),
    consumerno: getLabelWithValue(
      {
        labelKey: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL"
      },
      {
        jsonPath: "applyScreen.property.address.service",
      }
    ),
    ownername: getLabelWithValue(
      {
        labelKey: "WS_COMMON_TABLE_COL_OWN_NAME_LABEL"
      },
      {
        jsonPath: "applyScreen.property.address.service",
      }
    ),
    status: getLabelWithValue(
      {
        labelKey: "WS_COMMON_TABLE_COL_STATUS_LABEL"
      },
      {
        jsonPath: "applyScreen.property.address.service",
      }
    ),
    address: getLabelWithValue(
      {
        labelKey: "WS_COMMON_TABLE_COL_ADDRESS"
      },
      {
        jsonPath: "applyScreen.property.address.service",
      }
    ),
       
       
        
       
      }),
      break:getBreak(),
     
     
      
    });
    }