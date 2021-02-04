import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import set from "lodash/set";
import Label from "egov-ui-kit/utils/translationNode";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import "./index.scss";

class EawasContainer extends Component {

  state = {
    open: false,
    action: ""
  };

 
    componentDidMount = async () => {
      const { prepareFinalObject, toggleSnackbar } = this.props;
      
    };
    render() {
        const {  ProcessInstances,
          state,
          APIData, 
          pageName,        
          moduleName } = this.props;

          if(pageName ==="INTIGRATION_EAWAS")
          {
            return  ( <div>
              {
                 APIData&&(
                 
                  <div>
 {
               
               <div style={{ overscrollBehaviorX:"overlay",overflow:"overlay"}}>
                 
              <table  id="reportTable"
                 style={{
                   width: "100%",
                   marginBottom:"20px"
                 }}
                 className="table table-striped table-bordered">
                  
                 <thead>
                 <tr className="report-table-header">
                 <th   style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="2">
                  <Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_EOFFICE_STATE_HEADING"
                  />
                  </th>
                 
                 </tr>
                 {/* <tr className="report-table-header">
                 <th   style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="1">

                  </th>
                  <th   style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="1">
                  <Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_EOFFICE_COUNT_HEADING"
                  />
                  </th>
                 
                 </tr> */}
                 
                 </thead>
                 {
                    APIData&&(
                      <tbody>
                         {
                            <tr>
                          <th><Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_TOTAL_ACCOMMODATION_CNT"
                  /></th>                            
                            <th>{get(APIData.eofficestat, `totalAccommodation`, "-") || "-"}</th>                                            
                            
                           
                          </tr>
                         }
                         {
                           <tr>
                             <th><Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_TOTAL_ALLOTED_ACC0MM0DATION_CNT"
                  /></th>                            
                            <th>{get(APIData.eofficestat, `AllottedAccommodations`, "-") || "-"}</th> 
                           </tr>
                         }
                          {
                           <tr>
                             <th><Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_TOTAL_VACANT_ACC0MMODATION_CNT"
                  /></th>                            
                            <th>{get(APIData.eofficestat, `vacantAccommodation`, "-") || "-"}</th> 
                           </tr>
                         }
                          {
                           <tr>
                             <th><Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_TOTAL_BID_SUBMITTED_CNT"
                  /></th>                            
                            <th>{get(APIData.eofficestat, `totalBidSubmitted`, "-") || "-"}</th> 
                           </tr>
                         }
                          {
                           <tr>
                             <th><Label
                    className="report-header-row-label"
                    labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                    label="INTIGRATION_TOTAL_ONLINE_ALLOTMENT_CNT"
                  /></th>                            
                            <th>{get(APIData.eofficestat, `totalOnlineAllotment`, "-") || "-"}</th> 
                           </tr>
                         }
    
                    </tbody>
                    )                
                  }
                 </table>
                
                  </div>
               
            }
                  </div>
                 
               
                 )
              }         
            
               
               </div>);

          }
         

      }
  }
  const mapStateToProps = state => {
    const { auth, app } = state;
    const { menu } = app;
    const { userInfo } = auth;
    const name = auth && userInfo.name;
    let APIData = get(
      state,
      "screenConfiguration.preparedFinalObject.APIData",
      []
    );
    return { name, menu,state,APIData };
  };


  const mapDispacthToProps = dispatch => {
    return {
      prepareFinalObject: (path, value) =>
        dispatch(prepareFinalObject(path, value)),
      toggleSnackbar: (open, message, variant) =>
        dispatch(toggleSnackbar(open, message, variant)),dispatch
    };
  };
  export default connect(
    mapStateToProps,
    mapDispacthToProps
    
  )(EawasContainer);