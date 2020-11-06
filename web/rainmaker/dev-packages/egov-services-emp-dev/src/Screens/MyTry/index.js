import React, { Component } from "react";
import { Button, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import SuccessMessage from "../../modules/SuccessMessage";
import { connect } from "react-redux";
import { createWaterTankerApplication, downloadBWTApplication } from "../../redux/bookings/actions";
import jp from "jsonpath";
import {
	getQueryArg,
	setBusinessServiceDataToLocalStorage,
	getFileUrlFromAPI,
	setDocuments
} from "egov-ui-framework/ui-utils/commons";

import "./index.css";
import { SortDialog, Screen } from "modules/common";
import isEmpty from "lodash/isEmpty";
class CreateWBTApplicationSuccess extends Component {

  render() {

    <h1>Hello MY Try Components</h1>
    return (
      <Screen>
      <div className="success-message-main-screen resolve-success">

            <Label
                label="BK_MYBK_CITIZEN_MOBILENO_PLACEHOLDER"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
                
              />


             <Label
                label="BK_MYBK_NAME_CITIZEN_PLACEHOLDER"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
               
              />
        
      <TextField
            id="name"
            name="name"
            type="text"
            hintText={
              <Label
                label="BK_MYBK_APPLY_SPECIAL_REQUEST_HEADER"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
              />
            }
          />

    <TextField
            id="name"
            name="name"
            type="text"
            hintText={
              <Label
                label="BK_ES_APPLICATION_CREATED_SUCCESS_MESSAGE"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
              />
            }
          />
  <Label
                label="BK_ES_APPLICATION_CREATED_SUCCESS_MESSAGE"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
        
              />
              <Label
                label="BK_MYBK_NAME_CITIZEN_PLACEHOLDER"
                color="rgba(0, 0, 0, 0.3799999952316284)"
                fontSize={16}
              
              />
      <Label label={"BK_MYBK_PCC_APPLICATION_REQUEST"} />
      <Label label={"BK_MYBK_PCC_APPLICATION_REQUEST"} />
      <Label label={"BK_CS_COMMON_SEND_MESSAGE"} />
      <Label label={"BK_ES_APPLICATION_CREATED_SUCCESS_MESSAGE"} /> 
         </div>
      </Screen>
    );
  }
}




export default CreateWBTApplicationSuccess;