
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo, setapplicationMode, setapplicationNumber } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import store from "redux/store";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
import { httpRequest } from "./api";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";



export const commonConfig = {
  
  tenantId: "ch.chandigarh"
  // forgotPasswordTenant: "ch.chandigarh",
};
export const TypeOfServiceRequest = {
  
  PRUNLESSTHAN90: "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
  PRUNMORETHAN90: "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
  REMOVALOFGREEN: "REMOVAL OF GREEN TREES",
  REMOVALOFDEADDRY: "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
};
export const NumberOfTreesInPruning = {
  
  DefaultTrees: 1,
  
};


export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const getSearchResultsEmployeeRequestFilter = async (data) => {
  // debugger
  
  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "/hc-services/serviceRequest/_get",
      "",
      [],
      data
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

export const getSearchResults = async queryObject => {
  let data = {
    "iscitizen" : 1
  };
  try {
    const response = await httpRequest(
      "post",
      "/hc-services/serviceRequest/_get",
      "",
      [],
      data
    );
    store.dispatch(toggleSpinner())
    return response;

  } catch (error) {
    store.dispatch(toggleSpinner())
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const getCurrentAssigneeUserNameAndRole = async (dispatch,userId) => {
  var tenantIdCommonConfig
      if (getTenantId() != commonConfig.tenantId){
          tenantIdCommonConfig = JSON.parse(getUserInfo()).permanentCity
      }
      else{
        tenantIdCommonConfig = getTenantId()
      }
  
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      `/egov-hrms/employees/_search?ids=${userId}&tenantId=${tenantIdCommonConfig}`,
      "_search",  
      [],
      
    );
    return(payload)
   
  } catch (e) {
    console.log(e);
  }};

  export const getSearchResultsForFilters = async (filterdata) => {
    
    let data = filterdata
   
    try {
      store.dispatch(toggleSpinner());
      const response = await httpRequest(
        "post",
        "/hc-services/serviceRequest/_get",
        "",
        [],
        data
      );
      store.dispatch(toggleSpinner());
      return response;
  
    } catch (error) {
      store.dispatch(toggleSpinner());
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: error.message, labelCode: error.message },
          "error"
        )
      );
    }
  
  };

export const getSearchResultsView = async queryObject => {


  try {
    //debugger
    const response = await httpRequest(
      "post", "hc-services/serviceRequest/_getDetail", "",
      [],
      {
        "service_request_id": queryObject[1].value,
        "tenantId":queryObject[0].value
        }
      
    );
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true, { labelName: error.message, labelCode: error.message }, "error"
      )
    );
  }
  
};

export const setRadioButtonResponse =  (serviceRequestType, subType,  dispatch) => {

  if(serviceRequestType === TypeOfServiceRequest.REMOVALOFDEADDRY)
  {
    dispatch(handleField("apply",
    "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
    "props.buttons[0].disabled",
    false
  )
);
dispatch(handleField("apply",
    "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
    "props.buttons[1].disabled",
    false
  )
);
dispatch(handleField("apply",
    "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
    "props.buttons[2].disabled",
    false
  )
);
dispatch(handleField("apply",
    "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
    "props.value",
    subType
  )
);
  }
  else{
    dispatch(handleField("apply",
          "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
          "props.buttons[0].disabled",
          true
        )
      );
      dispatch(handleField("apply",
          "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
          "props.buttons[1].disabled",
          true
        )
      );
      dispatch(handleField("apply",
          "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
          "props.buttons[2].disabled",
          true
        )
      );
      dispatch(handleField("apply",
      "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.serviceRequestSubtype",
      "props.value",
      undefined
    )
  );
  }

  
  
};
export const setTreeCountFieldEnableDisable =  (serviceRequestType,  dispatch) => {
  
        if(serviceRequestType ===TypeOfServiceRequest.PRUNLESSTHAN90 || serviceRequestType ===TypeOfServiceRequest.PRUNMORETHAN90 ){
         
        dispatch(handleField("apply",
        "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.nooftrees",
        "props.disabled",
        true
      ))
      }
      else{
      
      dispatch(handleField("apply",
      "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.nooftrees",
      "props.disabled",
      false
      ))
      }
  
  
};

export const returnNameFromCodeMdmsorViceVersa = (JSonArrayFromWhichValueToBeFiltered, valueToBeFiltered,codeRequiredOrName) => {
  
 
  var nameArray = []
  var keyValuePairObtainedFromFilter = []
  var codeArray = []
  var codeString = ""
  var nameString = ""
  
  keyValuePairObtainedFromFilter = JSonArrayFromWhichValueToBeFiltered.filter(function (state) {
    if (valueToBeFiltered === state.code )
    return state 
  });
  //if name is required from code
    if(codeRequiredOrName == 1)
   {
     nameArray = keyValuePairObtainedFromFilter.map(element => element.name )
     nameString = nameArray.join(",") 
     return nameString
    
  }
  else
 {  
  codeArray = keyValuePairObtainedFromFilter.map(element => element.code )
  codeString = codeArray.join(",") 
  return codeString
}

};
export const prepareDocumentsUploadData = (state, dispatch, type) => {
  let documents = '';
  if (type == "serviceRequestIDProof") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData['eg-horticulture'].IDProofDocument",
      []
    );
  }
  
  else {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PetNOC.Documents",
      []
    );
  }

  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
   
     if (doc.code === "HORTICULTURE.ID_PROOF" && doc.hasMultipleRows && doc.options) {

      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData['eg-horticulture'].IDProofDocument",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    }
  
    else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "HC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
export const furnishServiceRequestDetailResponse = (state, response, dispatch) => {
  debugger
  let refurnishresponse = {};
  var serviceRequestType = []
  var sectorData = []
  serviceRequestTypeCodeFromResponse = []
  serviceRequestType = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData['eg-horticulture'].ServiceType")
  sectorData = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData['RAINMAKER-PGR'].Sector")

  //setting service request type data
  var serviceRequestTypeFromResponse = serviceRequestType.filter(function (state) {
    if (response.ResponseBody[0].service_type === state.code )
    return state 
  });
  var serviceRequestTypeCodeFromResponse = serviceRequestTypeFromResponse.map(element => element.code )
  var finalserviceRequestTypeCodeFromResponse = serviceRequestTypeCodeFromResponse.join(",")
  serviceRequestTypeFromResponse = serviceRequestTypeFromResponse.map(element => element.name )
  var serviceRequestTypeNameFromResponse = serviceRequestTypeFromResponse.join(",")

  // setting sector data 
  var sectorDataFromResponse = sectorData.filter(function (state) {
    if (response.ResponseBody[0].locality === state.code )
    return state 
  });
  var sectorDataNameFromResponse = sectorDataFromResponse.map(element => element.name )
   sectorDataNameFromResponse = sectorDataNameFromResponse.join(",") 
   var sectorDataCodeFromResponse = sectorDataFromResponse.map(element => element.code )
   sectorDataCodeFromResponse = sectorDataCodeFromResponse.join(",") 


  if(response.ResponseBody[0].servicerequestsubtype != null && response.ResponseBody[0].servicerequestsubtype != undefined && response.ResponseBody[0].servicerequestsubtype != ""  ){
    var serviceRequestSubtype =  response.ResponseBody[0].servicerequestsubtype
    serviceRequestSubtype = JSON.parse(serviceRequestSubtype)
    response.ResponseBody[0].servicerequestsubtype = serviceRequestSubtype.subservicetype
  }
  setRadioButtonResponse(finalserviceRequestTypeCodeFromResponse, response.ResponseBody[0].servicerequestsubtype, dispatch)
  setTreeCountFieldEnableDisable(finalserviceRequestTypeCodeFromResponse, dispatch)
  set(refurnishresponse, "contactNumber", response.ResponseBody[0].contact_number);
  set(refurnishresponse, "subType", response.ResponseBody[0].servicerequestsubtype);
  set(refurnishresponse, "description", response.ResponseBody[0].description);
  set(refurnishresponse, "ownerName", response.ResponseBody[0].owner_name);
  set(refurnishresponse, "tenantId", response.ResponseBody[0].tenant_id);
  set(refurnishresponse, "email", response.ResponseBody[0].email_id);
  set(refurnishresponse, "mohalla", {value:sectorDataCodeFromResponse, label:sectorDataNameFromResponse});
  set(refurnishresponse, "houseNoAndStreetName", response.ResponseBody[0].street_name);
  set(refurnishresponse, "landmark", response.ResponseBody[0].landmark);
  set(refurnishresponse, "latitude", response.ResponseBody[0].latitude);
  set(refurnishresponse, "longitude", response.ResponseBody[0].longitude);
  set(refurnishresponse, "address", response.ResponseBody[0].location);
  set(refurnishresponse, "serviceType", {value:finalserviceRequestTypeCodeFromResponse, label:serviceRequestTypeNameFromResponse});
  set(refurnishresponse, "treeCount", response.ResponseBody[0].tree_count);
  set(refurnishresponse, "service_request_id", response.ResponseBody[0].service_request_id);
  set(refurnishresponse, "media", JSON.parse(response.ResponseBody[0].service_request_document));
  
  set(refurnishresponse, "isEditState", 1);
  return refurnishresponse;
};
export const furnishServiceRequestDetailResponseForEdit = (response, state,dispatch)=> {
  debugger
  let refurnishresponse = {};
  var serviceRequestType = []
  var sectorData = []
  serviceRequestType = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData['eg-horticulture'].ServiceType")
  sectorData = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData['RAINMAKER-PGR'].Sector")

  //setting service request type data
  var serviceRequestTypeFromResponse = serviceRequestType.filter(function (state) {
    if (response.serviceType === state.code )
    return state 
  });
  var serviceRequestTypeCodeFromResponse = serviceRequestTypeFromResponse.map(element => element.code )
  var serviceRequestTypenameFromResponse = serviceRequestTypeFromResponse.map(element => element.name )
  var finalserviceRequestTypeCodeFromResponse = serviceRequestTypeCodeFromResponse.join(",")
  var finalServiceRequestTypeNameFromResponse = serviceRequestTypenameFromResponse.join(",")

  // setting sector data 
  var sectorDataFromResponse = sectorData.filter(function (state) {
    if ( response.mohalla === state.code )
    return state 
  });
  var sectorDataNameFromResponse = sectorDataFromResponse.map(element => element.name )
  var sectorDataCodeFromResponse = sectorDataFromResponse.map(element => element.code )
  var finalSectorDataNameFromResponse = sectorDataNameFromResponse.join(",")
  var finalSectorDataCodeFromResponse = sectorDataCodeFromResponse.join(",")
  
 

  set(refurnishresponse, "contactNumber", response.contactNumber);
  set(refurnishresponse, "description", response.description);
  set(refurnishresponse, "ownerName", response.ownerName);
  set(refurnishresponse, "tenantId", response.tenantId);
  set(refurnishresponse, "email", response.email);
  set(refurnishresponse, "mohalla", {value:finalSectorDataCodeFromResponse, label:finalSectorDataNameFromResponse});
  set(refurnishresponse, "houseNoAndStreetName", response.houseNoAndStreetName);
  set(refurnishresponse, "landmark", response.landmark);
  set(refurnishresponse, "latitude", response.latitude);
  set(refurnishresponse, "longitude", response.longitude);
  set(refurnishresponse, "address", response.address);
  set(refurnishresponse, "serviceType", {value:finalServiceRequestTypeNameFromResponse, label: finalserviceRequestTypeCodeFromResponse});
  set(refurnishresponse, "subType", response.subType);
  set(refurnishresponse, "treeCount", response.treeCount);
  set(refurnishresponse, "service_request_id", response.service_request_id);
  // set(refurnishresponse, "media", JSON.parse(response.media));
  
  set(refurnishresponse, "isEditState", 1);
  return refurnishresponse;
};
export const setApplicationNumberBox = (state, dispatch) => {

  let applicationNumber = get(state, "state.screenConfiguration.preparedFinalObject.SERVICEREQUEST.service_request_id", null);

  if (applicationNumber) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.service_request_id",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.service_request_id",
        "props.number",
        applicationNumber
      )
    );
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  // debugger
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};



export const EditServiceRequest = async (state, dispatch, status) => {
  let response = '';
  
  let method = "CREATE";

  try {
    
    let payload = get(state.screenConfiguration.preparedFinalObject, "SERVICEREQUEST", []);
    // console.log("payload"+payload)
   
    let service_request_id_for_edit
    try{
      service_request_id_for_edit = payload.service_request_id
    }
    catch(e){
      service_request_id_for_edit= "";
    }
    let response = '';
    setapplicationMode(status);
    let arraypayload=[]
    arraypayload.push(payload);

    if (method === "CREATE") {
      
      dispatch(toggleSpinner());
      response = await httpRequest("post", "hc-services/serviceRequest/_create", "", [], {services: arraypayload });

      if (response.ResponseInfo.status === 'successful') {
        dispatch(prepareFinalObject("SERVICES", response));
        setapplicationNumber(service_request_id_for_edit);

        setApplicationNumberBox(state, dispatch);
        dispatch(toggleSpinner());
        return { status: "successful", message: response };
      } else {
        dispatch(toggleSpinner());
        return { status: "fail", message: response };
      }
    } 

  } catch (error) {
    dispatch(toggleSpinner());
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

  }
};

export const createServiceRequest = async (state, dispatch, status) => {
let response = '';

let method = "CREATE";

try {
  
  let payload = get(state.screenConfiguration.preparedFinalObject, "SERVICEREQUEST", []);
  console.log("payload",payload)

  let response = '';
  setapplicationMode(status);
  let arraypayload=[]
  arraypayload.push(payload);

  if (method === "CREATE") {
    
    dispatch(toggleSpinner());

    response = await httpRequest("post", "hc-services/serviceRequest/_create", "", [], {services: arraypayload });
    
    
    if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
      dispatch(prepareFinalObject("SERVICES", response));
    
      setapplicationNumber(response.services[0].service_request_id);
      
    
      
      setApplicationNumberBox(state, dispatch);
      dispatch(toggleSpinner());
      return { status: "success", message: response };
    } else {
      dispatch(toggleSpinner());
      return { status: "fail", message: response };
    }
  } 

} catch (error) {
  dispatch(toggleSpinner());
  dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

  
  
  return { status: "failure", message: error };
}
};


// Demo API call

export const demoAPICall = async (state, dispatch, status) => {
  let response = '';
	let method = "CREATE";

	try {
	  let payload = "PAYLOAD_DEMO"
	  console.log("payload",payload)
	  let response = '';
	  // setapplicationMode(status);
	  let arraypayload=[]
	  arraypayload.push(payload);
	  if (method === "CREATE") {
		dispatch(toggleSpinner());
		response = await httpRequest("post", "DEMO/hc-services/serviceRequest/_create", "", [], {services: arraypayload });
		
		if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
		  dispatch(prepareFinalObject("SERVICES", response));
		  setapplicationNumber(response.services[0].service_request_id);
		  setApplicationNumberBox(state, dispatch);
		  dispatch(toggleSpinner());
		  return { status: "success", message: response };
		} else {
		  dispatch(toggleSpinner());
		  return { status: "fail", message: response };
		}
	  } 

	} catch (error) {
	  dispatch(toggleSpinner());
	  dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
	  return { status: "failure", message: error };
	}
};

export const previewWF = async (state, dispatch, status) => {
  let response = '';
	let method = "CREATE";

	try {
    debugger
    const serviceName =  get(state.screenConfiguration.preparedFinalObject, "dropDownData2", {});
	  let payload = "PAYLOAD_DEMO"
	  console.log("payload",payload)
	  let response = '';
	  // setapplicationMode(status);
	  let arraypayload=[]
	  arraypayload.push(payload);
	  if (method === "CREATE") {
		dispatch(toggleSpinner());
		response = await httpRequest("post", "egov-workflow-v2/egov-wf/businessservice/_search?businessServices="+ serviceName.value +"&tenantId=ch", "", [], {services: arraypayload });
    
    dispatch(prepareFinalObject("WF_PREVIEW", response));

    var data = get(
      state,
      "screenConfiguration.preparedFinalObject.WF_PREVIEW",
      {});

    // dispatch(
    //     handleField("review_petnoc",
    //     "components.div.children.body.children.cardContent.children.reportCardGraph",
    //     "props.data.demo",
    //     data
    //     )
    //     );

    dispatch(
      handleField("preview",
      "components.div.children.body.children.cardContent.children.reportCardGraph",
      "props.data.demo",
      data
      )
      );
       
    dispatch(toggleSpinner());
    return { status: "success", message: response };
  
    
		if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
		  dispatch(prepareFinalObject("SERVICES", response));
		  setapplicationNumber(response.services[0].service_request_id);
		  setApplicationNumberBox(state, dispatch);
		  dispatch(toggleSpinner());
		  return { status: "success", message: response };
		} else {
		  dispatch(toggleSpinner());
		  return { status: "fail", message: response };
		}
	  } 

	} catch (error) {
	  dispatch(toggleSpinner());
	  dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
	  return { status: "failure", message: error };
	}
};

export const getData = async (state, dispatch, status) =>  {
  let response = '';
	let method = "CREATE";

	try {
    
    debugger
    const serviceName =  get(state.screenConfiguration.preparedFinalObject, "dropDownData2", {});
	  let payload = "PAYLOAD_DEMO"
	  console.log("payload",payload)
	  let response = '';
	  // setapplicationMode(status);
	  let arraypayload=[]
	  arraypayload.push(payload);
	  if (method === "CREATE") {
		dispatch(toggleSpinner());
		response = await httpRequest("post", "egov-workflow-v2/egov-wf/businessservice/_search?businessServices="+ serviceName.value +"&tenantId=ch", "", [], {services: arraypayload });
    
    // dispatch(prepareFinalObject("WF_PREVIEW", response));
    debugger

    const allData = {
      "modulewiseWF" : [
        {
        "moduleName" : "OPMS",
        "wfName" : "PETNOC",
        "wfCode" : "PETNOC",
        "wfDesc" : "PETNOC Descripton"
        },
        {
        "moduleName" : "OPMS",
        "wfName" : "SELLMEATNOC",
        "wfCode" : "SELLMEATNOC",
        "wfDesc" : "SELLMEATNOC Descripton"
        },
        {
        "moduleName" : "OPMS",
        "wfName" : "ADVERTISEMENTNOC",
        "wfCode" : "ADVERTISEMENTNOC",
        "wfDesc" : "ADVERTISEMENTNOC Descripton"
        },
        {
        "moduleName" : "OPMS",
        "wfName" : "ROADCUTNOC",
        "wfCode" : "ROADCUTNOC",
        "wfDesc" : "ROADCUTNOC Descripton"
        },
        {
        "moduleName" : "RentedProperties",
        "wfName" : "OwnershipTransferRP",
        "wfCode" : "OwnershipTransferRP",
        "wfDesc" : "OwnershipTransfer Descripton"
        },
        {
        "moduleName" : "RentedProperties",
        "wfName" : "OwnershipTransferRP",
        "wfCode" : "OwnershipTransferRP",
        "wfDesc" : "OwnershipTransferRP Descripton"
        }
        ]
    }

    debugger
    
    const filterData = allData.modulewiseWF.filter(function (el) {
      return el.moduleName == serviceName.value ;
    });

    if(filterData.length > 0){
      dispatch(
        handleField("module_preview",
        "components.div.children.body.children.cardContent.children.moduleWiseWorkflow",
        "props.data",
        filterData
        )
        );
        
      dispatch(prepareFinalObject("WF_CHARTDATA", filterData));
    }else{
      const data =  get(state.screenConfiguration.preparedFinalObject, "WF_CHARTDATA", []);

      dispatch(
        handleField("module_preview",
        "components.div.children.body.children.cardContent.children.moduleWiseWorkflow",
        "props.data",
        data
        )
        );
    }   
    dispatch(toggleSpinner());
    return { status: "success", message: response };
  
    
		if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
		  dispatch(prepareFinalObject("SERVICES", response));
		  setapplicationNumber(response.services[0].service_request_id);
		  setApplicationNumberBox(state, dispatch);
		  dispatch(toggleSpinner());
		  return { status: "success", message: response };
		} else {
		  dispatch(toggleSpinner());
		  return { status: "fail", message: response };
		}
	  } 

	} catch (error) {
	  dispatch(toggleSpinner());
	  dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
	  return { status: "failure", message: error };
	}
};

export const getDashboardDropdownData = async (state, dispatch, status) =>  {
  let response = '';
	let method = "";

	try {
    
    debugger
    // const serviceName =  get(state.screenConfiguration.preparedFinalObject, "dropDownData2", {});
	  let payload = "PAYLOAD_DEMO"
	  console.log("payload",payload)
    let response = '';
    let response2 = '';
	  // setapplicationMode(status);
	  let arraypayload=[]
	  arraypayload.push(payload);
	  if (method === "") {
		dispatch(toggleSpinner());
		response = await httpRequest("post", "egov-workflow-v2/egov-wf/businessservice/_search?businessServices=DEMO&tenantId=ch", "", [], {services: arraypayload });
    
    // dispatch(prepareFinalObject("WF_PREVIEW", response));
    debugger
    var data =  [
      {
          "name" : "PGR",
          "code" : "rainmaker-pgr"
      },
      {
          "name" : "Module 2",
          "code" : "Module 2"
      }
      ]
    var selectedDefaultData = {value: "rainmaker-pgr", label: "PGR"}
    dispatch(prepareFinalObject("dahsboardHome.dropDownData", data));
    dispatch(prepareFinalObject("dahsboardHome.dropDownData2", selectedDefaultData));

    const dashboardModuleSelected =  get(state.screenConfiguration.preparedFinalObject, "dropDownData2", {});
	  response2 = await httpRequest("post", "egov-workflow-v2/egov-wf/businessservice/_search?businessServices="+dashboardModuleSelected.value+"&tenantId=ch", "", [], {services: arraypayload });
    
    var reportdata =  [
      {
          "name" : "Complaint Type",
          "code" : "ComplaintTypesReport"
      },
      {
          "name" : "Source Wise",
          "code" : "SourceWiseReport"
      },
      {
        "name" : "Department Wise",
        "code" : "DepartmentReport"
      }
      ]
    var selectedDefaultReportData = {value: "ComplaintTypesReport", label: "Complaint Type"}
    dispatch(prepareFinalObject("dahsboardHome.reportDropDownData", reportdata));
    dispatch(prepareFinalObject("dahsboardHome.reportdefaultDropDownData", selectedDefaultReportData));
    
    // Date dispatch to component
    const fromDate =  get(state.screenConfiguration.preparedFinalObject, "dahsboardHome.defaultFromDate", "");
    const toDate =  get(state.screenConfiguration.preparedFinalObject, "dahsboardHome.defaulttoDate", "");
    
    dispatch(
      handleField(
        "home",
        "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.fromDate",
        "props.value",
        fromDate
      )
    );

    dispatch(
      handleField(
        "home",
        "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.toDate",
        "props.value",
        toDate
      )
    );
    // const filterData = allData.modulewiseWF.filter(function (el) {
    //   return el.moduleName == serviceName.value ;
    // });

    // if(filterData.length > 0){
    //   dispatch(
    //     handleField("module_preview",
    //     "components.div.children.body.children.cardContent.children.moduleWiseWorkflow",
    //     "props.data",
    //     filterData
    //     )
    //     );
        
    //   dispatch(prepareFinalObject("WF_CHARTDATA", filterData));
    // }else{
    //   const data =  get(state.screenConfiguration.preparedFinalObject, "WF_CHARTDATA", []);

    //   dispatch(
    //     handleField("module_preview",
    //     "components.div.children.body.children.cardContent.children.moduleWiseWorkflow",
    //     "props.data",
    //     data
    //     )
    //     );
    // }
    dispatch(toggleSpinner());
    return { status: "success", message: response };
  
    
		if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
		  dispatch(prepareFinalObject("SERVICES", response));
		  setapplicationNumber(response.services[0].service_request_id);
		  setApplicationNumberBox(state, dispatch);
		  dispatch(toggleSpinner());
		  return { status: "success", message: response };
		} else {
		  dispatch(toggleSpinner());
		  return { status: "fail", message: response };
		}
	  } 

	}catch (error) {
	  dispatch(toggleSpinner());
	  dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
	  return { status: "failure", message: error };
	}
};

export const getDashboardResult = async ( dispatch, data ) => {
  debugger

  const payloadData = data
  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/"+ payloadData.moduleName +"/"+ payloadData.reportName +"/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );

    dispatch(prepareFinalObject("dashboardSearchData", response));

    dispatch(
      handleField("dashboardType",
      "components.div.children.dashboardTypeSearchResults.children.cardContent.children.dashboardResult.children.customGraph",
      "props.data",
      response
      )
      );

    dispatch(
      handleField("dashboardSource",
      "components.div.children.dashboardSourceSearchResults.children.cardContent.children.dashboardResult.children.customGraph",
      "props.data",
      response
        )
        );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

// All Complaint Types DAshboard Result
export const getAllDashboardResult = async ( dispatch, data ) => {
  debugger

  const moduleName = "rainmaker-pgr" 
  const reportName = ["ComplaintTypesReport", "SourceWiseReport", "DepartmentReport"]
  var payloadData = data
  payloadData["reportName"] = reportName[0];
  payloadData["moduleName"] = moduleName;
  
  try {
    store.dispatch(toggleSpinner());
    const ComplaintTypeResponse = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/rainmaker-pgr/ComplaintTypesReport/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );
    payloadData["reportName"] = reportName[1];
    const SourceWiseResponse = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/rainmaker-pgr/SourceWiseReport/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );
    payloadData["reportName"] = reportName[2];
    const DepartmentResponse = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/rainmaker-pgr/DepartmentReport/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );

    debugger
    var response = []
    response.push(ComplaintTypeResponse.reportResponses[0]);
    response.push(SourceWiseResponse.reportResponses[0]);
    response.push(DepartmentResponse.reportResponses[0]);

    dispatch(prepareFinalObject("allDashboardSearchData", response));

    dispatch(
      handleField("dashboardType",
      // "components.div.children.dashboardTypeSearchResults.children.cardContent.children.customGraph",
      "components.div.children.dashboardTypeSearchResults",
      "props.data",
      response
      )
      );
    
    dispatch(
      handleField("dashboardType",
      // "components.div.children.dashboardTypeSearchResults.children.cardContent.children.customGraph",
      "components.div.children.dashboardSearchResultHorizontalBar",
      "props.data",
      response
      )
      );

    dispatch(
      handleField("dashboardSource",
      "components.div.children.dashboardSourceSearchResults.children.cardContent.children.dashboardResult.children.customGraph",
      "props.data",
      response
        )
        );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

// Get Description Report
export const getDescriptionReport = async ( dispatch, data ) => {
  debugger

  const moduleName = "rainmaker-pgr" 
  const reportName = "DescriptionReport"
  var payloadData = data
  payloadData["reportName"] = reportName;
  payloadData["moduleName"] = moduleName;
  
  try {
    store.dispatch(toggleSpinner());
    const DescriptionReport = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/rainmaker-pgr/DescriptionReport/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );

    debugger
    var response = DescriptionReport
    dispatch(prepareFinalObject("allDashboardSearchData", response));

    // OK
    dispatch(
      handleField("PGRDashboard",
      "components.div.children.PGRDashboardResults",
      "props.data",
      response
      )
      );
      
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};


// Get Description Report New Function
export const getDescriptionReportDashboard = async ( dispatch, data ) => {
  
  debugger;
  const moduleName = "rainmaker-pgr" 
  const reportName = "DescriptionReport"
  var payloadData = data
  payloadData["reportName"] = reportName;
  payloadData["moduleName"] = moduleName;
  
  try {
    store.dispatch(toggleSpinner());
    const DescriptionReport = await httpRequest(
      "post",
      // "/hc-services/serviceRequest/_get_DEMO_DASHBOARD", 
      "/report/rainmaker-pgr/DescriptionReport/_get?tenantId=ch.chandigarh&pageSize=false&offset=0",
      "",
      [],
      payloadData
    );

    debugger
    var response = [ DescriptionReport, payloadData.reportSortBy ];
    dispatch(prepareFinalObject("allDashboardSearchData", response));

    // OK
    dispatch(
      handleField("PGRDashboard",
      "components.div.children.PGRDashboardResults",
      // "components.div.children.PGRDashboardResults.children.dashboardResult",
      "props.data",
      response
      )
      );
      
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

// Get Dashboard Data for Horticulture 
export const getHCDashboardData = async ( dispatch, data ) => {
  
  debugger;
  const moduleName = "rainmaker-pgr" 
  const reportName = "DescriptionReport"
  var payloadData = data
  payloadData["reportName"] = reportName;
  payloadData["moduleName"] = moduleName;

  var HCPayload = {
    "fromDate": payloadData.searchParams[0].input,
    "toDate": payloadData.searchParams[1].input,
    "sortBy": payloadData.reportSortBy.value,
    "dataPayload": {}
  }
  
  const HARDJSON = {
    "ResponseInfo": {
      "apiId": null,
      "ver": null,
      "ts": null,
      "resMsgId": null,
      "msgId": null,
      "status": "success"
    },
    "services": [
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "dddd",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-11-12-000063",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "1",
        "current_assignee": "512",
        "createdtime": "12/11/2020",
        "lastmodifiedtime": "1611728754163"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "INSPECTED",
        "service_request_id": "CH-HC-2021-01-20-000149",
        "servicerequestsubtype": "",
        "locality": "SECTOR-11",
        "offset_": "2",
        "current_assignee": "HC_JE",
        "createdtime": "20/01/2021",
        "lastmodifiedtime": "1611117351832"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "UpdatedType",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-20-000150",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "3",
        "current_assignee": "HC_EE",
        "createdtime": "20/01/2021",
        "lastmodifiedtime": "1611117280951"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Tanuj Mohanty Tanuj MohantyTanuj Mohanty Tanuj kumar Mohanty",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-19-000148",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "4",
        "current_assignee": "HC_SDO",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611074874613"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Ashwini",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-19-000145",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-3",
        "offset_": "5",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611065276378"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "xyz",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-19-000147_1",
        "servicerequestsubtype": "{\"subservicetype\": \"Pollarding of Trees\"}",
        "locality": "SECTOR-10",
        "offset_": "6",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611064839677"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000147",
        "servicerequestsubtype": "",
        "locality": "SECTOR-10",
        "offset_": "7",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611064570489"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "xyz",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-19-000146_1",
        "servicerequestsubtype": "{\"subservicetype\": \"Pollarding of Trees\"}",
        "locality": "SECTOR-12",
        "offset_": "8",
        "current_assignee": "510",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611063966214"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000146",
        "servicerequestsubtype": "",
        "locality": "SECTOR-12",
        "offset_": "9",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611063909933"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Ashwini",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000144",
        "servicerequestsubtype": "",
        "locality": "SECTOR-5",
        "offset_": "10",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611062705293"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Ashwini Hosmani",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-19-000141_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "11",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611060699132"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "type four",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2021-01-19-000143",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "12",
        "current_assignee": "HC_WA",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611059944981"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Owner",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000142_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-5",
        "offset_": "13",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611058322825"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Owner",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000142",
        "servicerequestsubtype": "",
        "locality": "SECTOR-5",
        "offset_": "14",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611058139328"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Ashwini Hosmani",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000141",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "15",
        "current_assignee": "",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611057904812"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Srinivas",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2021-01-19-000140",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-2",
        "offset_": "16",
        "current_assignee": "508",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611057185523"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "aqwww",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-19-000139_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "17",
        "current_assignee": "HC_EE",
        "createdtime": "19/01/2021",
        "lastmodifiedtime": "1611032347909"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "aqwww",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-19-000139",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "18",
        "current_assignee": "",
        "createdtime": "18/01/2021",
        "lastmodifiedtime": "1611032341608"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Owner",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-15-000134",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "19",
        "current_assignee": "510",
        "createdtime": "15/01/2021",
        "lastmodifiedtime": "1610710904914"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "Srinivas",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-15-000137",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "20",
        "current_assignee": "HC_EE",
        "createdtime": "15/01/2021",
        "lastmodifiedtime": "1610705257899"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Owner",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-15-000136",
        "servicerequestsubtype": "{\"subservicetype\": \"Pollarding of Trees\"}",
        "locality": "SECTOR-2",
        "offset_": "21",
        "current_assignee": "HC_EE",
        "createdtime": "15/01/2021",
        "lastmodifiedtime": "1610705084183"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Owner",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-15-000135",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "22",
        "current_assignee": "HC_EE",
        "createdtime": "15/01/2021",
        "lastmodifiedtime": "1610704641340"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Ashwiniiiiiiiiiiiiii",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-15-000133",
        "servicerequestsubtype": "{\"subservicetype\": \"Dead and Dry Trees\"}",
        "locality": "SECTOR-6",
        "offset_": "23",
        "current_assignee": "HC_EE",
        "createdtime": "15/01/2021",
        "lastmodifiedtime": "1610693860167"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "wdqdwqdw",
        "service_request_status": "EDITED",
        "service_request_id": "CH-HC-2021-01-14-000128_2",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-1",
        "offset_": "24",
        "current_assignee": "HC_EE",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610634728248"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "wdqdwqdw",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-14-000128_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "25",
        "current_assignee": "",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610627246224"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "wdqdwqdw",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-14-000128_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "25",
        "current_assignee": "",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610627246224"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "wdqdwqdw",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-14-000128",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "26",
        "current_assignee": "",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610626145080"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "aaa",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-13-000127",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "27",
        "current_assignee": "",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610625232550"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "aaa",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-13-000127_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "28",
        "current_assignee": "HC_EE",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610625050768"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "aaa",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-13-000127_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "29",
        "current_assignee": "HC_EE",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610624726490"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-14-000132",
        "servicerequestsubtype": "",
        "locality": "SECTOR-14",
        "offset_": "30",
        "current_assignee": "510",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610618705324"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "INSPECTED",
        "service_request_id": "CH-HC-2021-01-14-000131",
        "servicerequestsubtype": "",
        "locality": "SECTOR-18",
        "offset_": "31",
        "current_assignee": "HC_JE",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610616265764"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Srinivas",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-14-000130_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "32",
        "current_assignee": "",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610608634903"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "wdqdw",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-14-000129_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "33",
        "current_assignee": "HC_EE",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610608427412"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "wdqdw",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-14-000129",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "34",
        "current_assignee": "",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610608420114"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Srinivas",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-14-000130",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "35",
        "current_assignee": "",
        "createdtime": "14/01/2021",
        "lastmodifiedtime": "1610608216444"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "dwqdwq",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-13-000126",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "36",
        "current_assignee": "HC_EE",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610546441847"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "wdqdw",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2021-01-13-000125",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "37",
        "current_assignee": "HC_EE",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610545888945"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "NewType",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2021-01-13-000123",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "38",
        "current_assignee": "HC_WA",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610544496496"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Owner",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-13-000122",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-1",
        "offset_": "39",
        "current_assignee": "",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610542913837"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Owner",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-13-000121",
        "servicerequestsubtype": "{\"subservicetype\": \"Pollarding of Trees\"}",
        "locality": "SECTOR-1",
        "offset_": "40",
        "current_assignee": "",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610541168144"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-13-000120",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "41",
        "current_assignee": "508",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610536176762"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Nikunj mishra",
        "service_request_status": "INSPECTED",
        "service_request_id": "CH-HC-2020-09-25-000053_2",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "42",
        "current_assignee": "512",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610533422162"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Nikunj mishra",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-09-25-000053_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "43",
        "current_assignee": "",
        "createdtime": "06/01/2021",
        "lastmodifiedtime": "1610533412718"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "xyz",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-13-000119",
        "servicerequestsubtype": "{\"subservicetype\": \"Pollarding of Trees\"}",
        "locality": "SECTOR-2",
        "offset_": "44",
        "current_assignee": "",
        "createdtime": "13/01/2021",
        "lastmodifiedtime": "1610533368123"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "test",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000101",
        "servicerequestsubtype": "{\"subservicetype\": \"DEAD_AND_DRY\"}",
        "locality": "SECTOR-2",
        "offset_": "45",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1610472694373"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "xyz",
        "service_request_status": "INSPECTED",
        "service_request_id": "CH-HC-2021-01-12-000118",
        "servicerequestsubtype": "{\"subservicetype\": \"Dead and Dry Trees\"}",
        "locality": "SECTOR-2",
        "offset_": "46",
        "current_assignee": "HC_JE",
        "createdtime": "12/01/2021",
        "lastmodifiedtime": "1610450481671"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "dd",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2020-12-18-000080_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "47",
        "current_assignee": "HC_EE",
        "createdtime": "06/01/2021",
        "lastmodifiedtime": "1609928358372"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "dd",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-18-000080",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "48",
        "current_assignee": "",
        "createdtime": "18/12/2020",
        "lastmodifiedtime": "1609928354529"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2021-01-05-000117_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-32",
        "offset_": "49",
        "current_assignee": "",
        "createdtime": "05/01/2021",
        "lastmodifiedtime": "1609829973308"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2021-01-05-000117",
        "servicerequestsubtype": "",
        "locality": "SECTOR-32",
        "offset_": "50",
        "current_assignee": "",
        "createdtime": "05/01/2021",
        "lastmodifiedtime": "1609829021322"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2021-01-01-000116",
        "servicerequestsubtype": "",
        "locality": "SECTOR-7",
        "offset_": "51",
        "current_assignee": "510",
        "createdtime": "01/01/2021",
        "lastmodifiedtime": "1609487801122"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "ff",
        "service_request_status": "INSPECTED",
        "service_request_id": "CH-HC-2020-12-18-000081",
        "servicerequestsubtype": "{\"subservicetype\": \"DEAD_AND_DRY\"}",
        "locality": "SECTOR-4",
        "offset_": "52",
        "current_assignee": "HC_JE",
        "createdtime": "18/12/2020",
        "lastmodifiedtime": "1609236119067"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "bnbbnbn",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-23-000100",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-1",
        "offset_": "53",
        "current_assignee": "512",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1609236031624"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "esfdfs",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000104",
        "servicerequestsubtype": "{\"subservicetype\": \"Dead and Dry Trees\"}",
        "locality": "SECTOR-2",
        "offset_": "54",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1609155254168"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Service Request Additional Details",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2020-12-18-000075",
        "servicerequestsubtype": "",
        "locality": "MODERN_HOUSING_COMPLEX_MANIMAJRA",
        "offset_": "55",
        "current_assignee": "512",
        "createdtime": "18/12/2020",
        "lastmodifiedtime": "1609151646285"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "CCCCCCCC",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000115_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "56",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608814697087"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "CCCCCCCC",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000115",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "57",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608814645047"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "AAAAAAA",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000114_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "58",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608814236486"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "AAAAAAA",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000114",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "59",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608814174032"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "NearNew",
        "service_request_status": "EDITED",
        "service_request_id": "CH-HC-2020-12-24-000113",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-5",
        "offset_": "60",
        "current_assignee": "HC_SDO",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608812247379"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "dsads",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2020-12-24-000111_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "61",
        "current_assignee": "510",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608812198560"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "itsseven",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-24-000112",
        "servicerequestsubtype": "",
        "locality": "SECTOR-5",
        "offset_": "62",
        "current_assignee": "HC_WA",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608810982020"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Ownertype",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000110",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-9",
        "offset_": "63",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608810512059"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "dsads",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000111",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "64",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608809695084"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "mudu",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000109",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-5",
        "offset_": "65",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608808671056"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Tanuj Mohanty Tanuj MohantyTanuj Mohanty Tanuj kumar",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000107_2",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-3",
        "offset_": "66",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608807729515"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "AnyOne",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000108",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-5",
        "offset_": "67",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608807348368"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "NewT",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-24-000106_1",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-3",
        "offset_": "68",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608806040892"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Tanuj Mohanty Tanuj MohantyTanuj Mohanty Tanuj kumar",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000107_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "69",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608805573032"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Tanuj Mohanty Tanuj MohantyTanuj Mohanty Tanuj kumar",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000107",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-3",
        "offset_": "70",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608804377920"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "NewT",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000106",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-3",
        "offset_": "71",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608802190032"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "test",
        "service_request_status": "INITIATED",
        "service_request_id": "CH-HC-2020-12-24-000102_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "72",
        "current_assignee": "HC_EE",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608800210592"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "test",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000102",
        "servicerequestsubtype": "{\"subservicetype\": \"POLLARDINGOFTREES\"}",
        "locality": "SECTOR-1",
        "offset_": "73",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608800201432"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Testing",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000105",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "74",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608796099253"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "Negative",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-24-000103",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "75",
        "current_assignee": "",
        "createdtime": "24/12/2020",
        "lastmodifiedtime": "1608791562466"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "None",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-23-000099",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "76",
        "current_assignee": "HC_WA",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608741629717"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Tanuj",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-23-000097",
        "servicerequestsubtype": "{\"subservicetype\": \"POLLARDINGOFTREES\"}",
        "locality": "SECTOR-4",
        "offset_": "77",
        "current_assignee": "HC_COMMISSIONERMCC",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608741305330"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Temp",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-23-000098",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "78",
        "current_assignee": "",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608740850680"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Delhi",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-23-000096",
        "servicerequestsubtype": "{\"subservicetype\": \"DEAD_AND_DRY\"}",
        "locality": "SECTOR-4",
        "offset_": "79",
        "current_assignee": "",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608738687118"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "Ch Srinivas",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-23-000095",
        "servicerequestsubtype": "",
        "locality": "SECTOR-16",
        "offset_": "80",
        "current_assignee": "",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608736730038"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "Ashwiniii",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-23-000094",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "81",
        "current_assignee": "",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608733185815"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "xx",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2020-12-18-000082",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-3",
        "offset_": "82",
        "current_assignee": "536",
        "createdtime": "23/12/2020",
        "lastmodifiedtime": "1608730318213"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "xyz",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-22-000093",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "83",
        "current_assignee": "512",
        "createdtime": "22/12/2020",
        "lastmodifiedtime": "1608628974613"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "NewTypefour",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2020-12-21-000092",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-4",
        "offset_": "84",
        "current_assignee": "HC_SEHE",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608541326608"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "NewTypethree",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-21-000091",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-4",
        "offset_": "85",
        "current_assignee": "HC_COMMISSIONERMCC",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608539280147"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "UpdatedType",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-21-000090_2",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "86",
        "current_assignee": "",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608532921816"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "UpdatedType",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-21-000090_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "87",
        "current_assignee": "",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608532279837"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "UpdatedType",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-21-000090",
        "servicerequestsubtype": "",
        "locality": "SECTOR-4",
        "offset_": "88",
        "current_assignee": "",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608531899993"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "NewType",
        "service_request_status": "ASSIGNED",
        "service_request_id": "CH-HC-2020-12-21-000089_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "89",
        "current_assignee": "HC_SDO",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608531086048"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "NewType",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-21-000089",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "90",
        "current_assignee": "",
        "createdtime": "21/12/2020",
        "lastmodifiedtime": "1608531014522"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "Ram",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-20-000088_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-3",
        "offset_": "91",
        "current_assignee": "",
        "createdtime": "20/12/2020",
        "lastmodifiedtime": "1608451281912"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Ram",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-20-000088",
        "servicerequestsubtype": "{\"subservicetype\": \"POLLARDINGOFTREES\"}",
        "locality": "SECTOR-3",
        "offset_": "92",
        "current_assignee": "",
        "createdtime": "20/12/2020",
        "lastmodifiedtime": "1608446543891"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Ram",
        "service_request_status": "COMPLETED",
        "service_request_id": "CH-HC-2020-12-20-000087",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-4",
        "offset_": "93",
        "current_assignee": "",
        "createdtime": "20/12/2020",
        "lastmodifiedtime": "1608445411747"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "typetwo",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-19-000086_3",
        "servicerequestsubtype": "",
        "locality": "SECTOR-5",
        "offset_": "94",
        "current_assignee": "HC_EE",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608359801215"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "typetwo",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-19-000086_2",
        "servicerequestsubtype": "{\"subservicetype\": \"\"}",
        "locality": "SECTOR-5",
        "offset_": "95",
        "current_assignee": "",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608359011980"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS",
        "owner_name": "typetwo",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-19-000086_1",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "96",
        "current_assignee": "",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608358040623"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "typetwo",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-19-000086",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "97",
        "current_assignee": "",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608357633238"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "PRUNING OF TREES GIRTH GREATER THAN 90 CMS",
        "owner_name": "type two",
        "service_request_status": "REJECTED",
        "service_request_id": "CH-HC-2020-12-19-000085",
        "servicerequestsubtype": "",
        "locality": "SECTOR-1",
        "offset_": "98",
        "current_assignee": "",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608353917891"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF GREEN TREES",
        "owner_name": "type four",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-19-000084",
        "servicerequestsubtype": "",
        "locality": "SECTOR-2",
        "offset_": "99",
        "current_assignee": "HC_WA",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608352797686"
      },
      {
        "tenant_id": "ch.chandigarh",
        "service_type": "REMOVAL OF DEAD/DANGEROUS/DRY TREES",
        "owner_name": "Owner",
        "service_request_status": "APPROVED",
        "service_request_id": "CH-HC-2020-12-19-000083",
        "servicerequestsubtype": "{\"subservicetype\": \"DANGEROUS\"}",
        "locality": "SECTOR-3",
        "offset_": "100",
        "current_assignee": "HC_COMMISSIONERMCC",
        "createdtime": "19/12/2020",
        "lastmodifiedtime": "1608352102814"
      }
    ]
  }
  try {
    store.dispatch(toggleSpinner());
    const DescriptionReport = await httpRequest(
      "post",
      "egov-workflow-v2/egov-wf/businessservice/_desc?tenantId=ch.chandigarh", 
      // "/hc-services/serviceRequest/_get",
      "",
      [],
      HCPayload
    );

    // Working from here is pending
    debugger;
    var response = [ HARDJSON, HCPayload.sortBy ];
    dispatch(prepareFinalObject("allDashboardSearchData", response));

    // OK
    dispatch(
      handleField("HCDashboard",
      "components.div.children.HCDashboardResults",
      "props.data",
      response
      )
      );
      
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};