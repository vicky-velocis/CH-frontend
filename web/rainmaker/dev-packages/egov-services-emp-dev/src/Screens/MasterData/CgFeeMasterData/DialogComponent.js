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
        this.setState({mdmsRes: this.props.mdmsResCg})

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

            this.setState({mdmsRes: this.props.mdmsResCg})
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
        mdmsRes: {}, 
      
    }


    validate (){

        let temp= {}
        const submitData= this.state.updateData
        temp.locality=submitData.locality? "": "This field is required"
        temp.category=submitData.category? "": "This field is required"
        temp.ratePerDay=submitData.ratePerDay? "": "This field is required"
        temp.bookingVenue=submitData.bookingVenue? "": "This field is required"
        

        this.setState({errors: temp})

        return Object.values(temp).every(x => x=="")
    }

    async handleSubmit  (){
        if(this.validate()){

           if(this.state.create===true)
           {
            var reqBody =  {
              
              "GfcpFeeDetails":[
                {
                    locality: this.state.updateData.locality,
                    category:this.state.updateData.category,
                    ratePerDay:this.state.updateData.ratePerDay,
                    bookingVenue:this.state.updateData.bookingVenue
                }
             ],
            }
            const responseStatus = await httpRequest(
                  
              "bookings/master/gfcp/fee/_create",
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
                "GfcpFeeDetails":[
                  {
                      id: this.state.updateData.locality,
                      locality: this.state.updateData.locality,
                      category:this.state.updateData.category,
                      ratePerDay:this.state.updateData.ratePerDay,
                      bookingVenue:this.state.updateData.bookingVenue
                  }
                ]
                }
              const responseStatus = await httpRequest(
                    
                "bookings/master/gfcp/fee/_update",
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
        console.log(this.state.mdmsRes, "owl")
       
        const {classes} =this.props
        return (

      
        Object.keys(this.state.mdmsRes).length === 0?<LoadingIndicator status="loading" loadingColor="#fe7a51" /> :
        
        <MuiThemeProvider theme={theme}>
        <div> <LoadingIndicator status="hide" /> 
        <div>

        <Dialog
            classes={{ paper :classes.dialogStyle}}
            maxWidth="md"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
         >
        <DialogTitle id="form-dialog-title">Edit Commercial Ground Fee Master</DialogTitle>
         
        <DialogContent>
          <DialogContentText>
            Please fill the form to update fee master of Commercial Ground
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item sm={6}>

            <SelectField
           //id="villageCity"
            hintText={"Booking Venue"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Booking Venue"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.bookingVenue} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.bookingVenue= value
              let errors= {...this.state.errors}
              errors.bookingVenue=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.bookingVenue}
          >
            {this.state.mdmsRes.Booking_Vanue.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          
          <TextField
                    id="ratePerDay"
                    name="ratePerDay"
                    type="number"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.ratePerDay}
                    hintText={"Rate Per Day"}
                    floatingLabelText={
                      <span style={{fontSize:14, fontWeight: 200}}>
                      {"Rate Per Day"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.ratePerDay=""
                      updateData.ratePerDay= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 14 }}
                    errorText={ this.state.errors && this.state.errors.ratePerDay}
                  />
          
                    
            </Grid>
            <Grid item sm={6}>
          
            <SelectField
           //id="villageCity"
            hintText={"Category"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Category"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.category} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.category= value
              let errors= {...this.state.errors}
              errors.category=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.category}
          >
            {this.state.mdmsRes.Commerical_Ground_Cat.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>  

                  
          <TextField
                    id="locality"
                    name="locality"
                    type="string"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.locality}
                    hintText={"Locality"}
                    floatingLabelText={
                      <span style={{fontSize:14, fontWeight: 200}}>
                      {"Locality"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.locality=""
                      updateData.locality= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 14 }}
                    errorText={ this.state.errors && this.state.errors.locality}
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