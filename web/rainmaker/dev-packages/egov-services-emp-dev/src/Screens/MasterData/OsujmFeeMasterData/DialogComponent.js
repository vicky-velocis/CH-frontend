import { Button,  TextField } from "components";
import { httpRequest } from "egov-ui-kit/utils/api";
import LoadingIndicator from "egov-ui-kit/components/LoadingIndicator";
import React, { Component } from 'react'
import { Toast } from "components";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
//import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
//import MenuItem from '@material-ui/core/MenuItem'
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";
import { connect } from "react-redux";


const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
  },
 
  palette: {
    primary:{
      main : "#fe7a51"
    },
    secondary:{
      main : "#fe7a51"
    },
    
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: "#e6e6e6"
  },

 
});



const useStyle= theme=>({
  dialogStyle: {
    minWidth: '960px',
  },
  
  [theme.breakpoints.down('sm')]: {

    
    dialogStyle: {
      minWidth: '0px',
      maxWidth: '960px'
    }
  }

})



class DialogComponent extends Component {


    async componentDidMount(){
      this.setState({sectorList: this.props.sectorList})

        if(this.props.updateData!=={})
        {
            this.setState({updateData: this.props.updateData})
        }else 
        {   
            this.setState({updateData: {}})
            
        }
    
     
    }

    componentDidUpdate(prevProps){
    
        
        if(this.props.updateData !== prevProps.updateData){

          this.setState({sectorList: this.props.sectorList})
            this.setState({updateData: this.props.updateData, errors: {}})

            if(Object.keys(this.props.updateData).length === 0){
                this.setState({create: true})
            }else{
                this.setState({create: false})
            }
        }

    }
    


    state={

        updateData: {}, 
        errors: {},
        create: true, 
        sectorList: [] 
      
    }


    validate (){

        let temp= {}
        const submitData= this.state.updateData
        temp.sector=submitData.sector? "": "This field is required"
        temp.slab=submitData.slab? "": "This field is required"
        temp.areaFrom=submitData.areaFrom? "": "This field is required"
        temp.areaTo=submitData.areaTo? "": "This field is required"
        temp.ratePerSqrFeetPerDay=submitData.ratePerSqrFeetPerDay? "": "This field is required"
        

        this.setState({errors: temp})

        return Object.values(temp).every(x => x=="")
    }

    async handleSubmit  (){
        if(this.validate()){

           if(this.state.create===true)
           {
            var reqBody =  {
              
              "OsujmFeeDetails":[
                {
                    "sector": this.state.updateData.sector,
                    "slab":this.state.updateData.slab,
                    "areaFrom":this.state.updateData.areaFrom,
                    "areaTo":this.state.updateData.areaTo,
                    "ratePerSqrFeetPerDay":this.state.updateData.ratePerSqrFeetPerDay
                    
                }
              ]
              }
            const responseStatus = await httpRequest(
                  
              "bookings/master/osujm/fee/_create",
              "_search",
              [],
              reqBody
            );
            if(responseStatus.status== '200'){
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Create Successfull",
                labelKey: `Create Successfull`} ,
                "success"
              );
              }else{
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Create Failed.Try Again",
                labelKey: `Create Failed.Try Again`} ,
                "error"
              );
              }
              this.props.fetchTableData()
              this.props.handleClose()

            console.log(responseStatus, "createresponse")
          
              

    
           }
           else
           
           {

              var reqBody =  {
              
                "OsujmFeeDetails": [

                  {

                    "id": this.state.updateData.id,
                    "sector": this.state.updateData.sector,
                    "slab":this.state.updateData.slab,
                    "areaFrom":this.state.updateData.areaFrom,
                    "areaTo":this.state.updateData.areaTo,
                    "ratePerSqrFeetPerDay":this.state.updateData.ratePerSqrFeetPerDay
                    
  
                  }
                 
                 ]
                }
              const responseStatus = await httpRequest(
                    
                "bookings/master/osujm/fee/_update",
                "_search",
                [],
                reqBody
              );
              if(responseStatus.status== '200'){
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Update Successfull",
                labelKey: `Update Successfull`} ,
                "success"
              );
              }else{
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Update Failed.Try Again",
                labelKey: `Update Failed.Try Again`} ,
                "error"
              );
              }
              this.props.fetchTableData()
              this.props.handleClose()
              console.log(responseStatus, "createresponse")
            }
  
           
        }
        
    }
    
    render() {
        
       
        const {classes} =this.props
        return (

      
          this.state.sectorList.length === 0 ?<LoadingIndicator status="loading" loadingColor="#fe7a51" /> :
        
        <MuiThemeProvider theme={theme}>
        <div> <LoadingIndicator status="hide" /> 
        <div>

        <Dialog
            classes={{ paper :classes.dialogStyle}}
            minWidth="md"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
         >
        <DialogTitle id="form-dialog-title">Edit Open Space Under MCC Juridiction Fee Master</DialogTitle>
         
        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
            Please fill the form to update fee master of Open Space Under MCC Juridiction
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
            <SelectField
           //id="villageCity"
            hintText={"Sector"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Sector"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.sector} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.sector= value
              let errors= {...this.state.errors}
              errors.sector=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.sector}
          >
            {this.state.sectorList.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          <TextField
                    id="slab"
                    name="slab"
                    type="string"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.slab}
                    hintText={"Slab"}
                    floatingLabelText={
                      <span style={{fontSize:12, fontWeight: 200}}>
                      {"Slab"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.slab=""
                      updateData.slab= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 12 }}
                    errorText={ this.state.errors && this.state.errors.slab}
                  />
          

                  
          <TextField
                    id="areaTo"
                    name="areaTo"
                    type="number"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.areaTo}
                    hintText={"Area To"}
                    floatingLabelText={
                      <span style={{fontSize:12, fontWeight: 200}}>
                      {"Area To"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.areaTo=""
                      updateData.areaTo= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 12 }}
                    errorText={ this.state.errors && this.state.errors.areaTo}
                  />


          
            </Grid>
            <Grid item sm={6} xs={12}>
            <TextField
                    id="areaFrom"
                    name="areaFrom"
                    type="number"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.areaFrom}
                    hintText={"Area From"}
                    floatingLabelText={
                      <span style={{fontSize:12, fontWeight: 200}}>
                      {"Area From"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.areaFrom=""
                      updateData.areaFrom= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 12 }}
                    errorText={ this.state.errors && this.state.errors.areaFrom}
                  />
          
        
          <TextField
                    id="ratePerSqrFeetPerDay"
                    name="ratePerSqrFeetPerDay"
                    type="number"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.ratePerSqrFeetPerDay}
                    hintText={"Rate"}
                    floatingLabelText={
                      <span style={{fontSize:12, fontWeight: 200}}>
                      {"Rate Per Sq Feet Per Day"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.ratePerSqrFeetPerDay=""
                      updateData.ratePerSqrFeetPerDay= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 12 }}
                    errorText={ this.state.errors && this.state.errors.ratePerSqrFeetPerDay}
                  />
          
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button label="Cancel" onClick={()=>{ this.props.handleClose()
            this.setState({errors : {}})}} color="secondary"/>
           
          <Button label={this.state.create===true? "Create":"Update"} onClick={()=>{ this.handleSubmit() }} primary={true} />
            
        </DialogActions>
    
      </Dialog>
                
            </div>
        
        </div>
       
        </MuiThemeProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
   
    toggleSnackbarAndSetText: (open, message, error) =>
      dispatch(toggleSnackbarAndSetText(open, message, error)),
    
  };
};



export default withStyles(useStyle)(connect(
  null,
  mapDispatchToProps
)( DialogComponent) )