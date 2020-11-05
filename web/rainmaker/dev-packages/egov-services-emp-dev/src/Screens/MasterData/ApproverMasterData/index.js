

import { httpRequest } from "egov-ui-kit/utils/api";
import { SortDialog, Screen } from "modules/common";
import TableUi from '../Table/index'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Paper } from '@material-ui/core';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "components";
import Typography from "@material-ui/core/Typography";
import LoadingIndicator from "egov-ui-kit/components/LoadingIndicator";
import Label from "egov-ui-kit/utils/translationNode";
import   DialogComponent from './DialogComponent'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '.3px',
    color: "#FF5733"

  },
 
  palette: {
    primary:{
      main : "#fe7a51"
    },
    secondary:{
      main : "#ffffff"
    },
    
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: "#e6e6e6"
  },

 
});



export default class SimpleTable extends React.Component {

  
  async componentDidMount(){
    
    let mdmsBody = {

        MdmsCriteria: {
            tenantId: "ch",
            moduleDetails: [
                {
                    moduleName: "tenant",
                    masterDetails: [
                        {
                            name: "tenants",
                        },
                    ],
                },
                {
                    moduleName: "Booking",
                    masterDetails: [
                      
                        {
                            name: "CityType",
                        },
                       
                        {
                          name: "Area",
                      },
                       
                        {
                            name: "Duration",
                        },
                        {
                            name: "VillageCity",
                        },
                        {
                            name: "Type_of_Construction",
                        },
                        
                    ],
                },
            ],
        },
    };
    
  
      
      const {MdmsRes:{Booking}} = await httpRequest(
            
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
  
    
       this.setState({mdmsResOsbm: Booking})
       console.log(this.state.mdmsResOsbm, "stateresponse")
  

    this.setState({updateData: {}})
    
    this.fetchTableData()
  
     
    }


  async fetchTableData(){

    this.setState({isLoading: true})

    let approverRes = await httpRequest(
      "bookings/master/approver/_fetch", 
      "_search",
      [],[]
    );
     this.setState({data: data})
     console.log(this.state.data, " data")

   
      let  approverData=this.state.data
      let approverDataRes=approverRes.data
      
     approverData.rows= approverDataRes.reverse()

  
      approverData.headers=[   
        "Id",
        "Sector",
        "Uuid",
        "Last Modified Date",
        "Created Date",
        "Role Code",
        
      ]
  
     

      this.setState({data: approverData})
      this.setState({isLoading: false})
      
  }
    

  state = {
    
    
    data:{
      rows: [],
      headers: []
    },
    mdmsRes: {}, 
    sectorList: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    updateData: {},
    isLoading: 'true', 
    columnHideIndex:[0],
    mdmsResOsbm: {},
    filterfun: {
      fn: (item) => {
        return item;
      }
    }

  };
  
  async handleEditClick (row) {
    await this.setState({updateData: row})
     this.handleClickOpen();
   }
  
 

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    this.setState({ updateData: {} });
    
  }

    
  handleSearch(e) {
    const target = e.target;
    let filterfun = this.state.filterfun;
    filterfun.fn = (item) => {
      if (target.value === "") return item;
      else {
        return item.filter(
          (x) =>
          x.villageCity.toLowerCase().includes(target.value.toLowerCase()) ||
          x.residentialCommercial.toLowerCase().includes(target.value.toLowerCase()) ||
          x.storage.toLowerCase().includes(target.value.toLowerCase()) ||
          x.durationInMonths.toString().includes(target.value) ||
          x.constructionType.toLowerCase().includes(target.value.toLowerCase()) ||
          x.amount.toString().includes(target.value) 
        );
      }
    };
    this.setState({ filterfun: filterfun });
  }

  render() {
    
const emptyRows =
this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);

    return (
      this.state.isLoading===true  ?<Screen  loading={"loading"}></Screen> :
      <MuiThemeProvider theme={theme}>
        <div align ="right"  >
         <Button primary={true}  label="Create New" style={{margin: '15px'}} onClick={()=>{ 
                  this.setState({updateData: {}})
                  this.setState({open: true})
                  }}/>
        
          
      </div>  
      
      
      
      
      <div class="col-xs-12 " style={{ wordBreak: "break-word"}}>

        <Paper>
        <div>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <TextField
            style={{ width: "75%", margin: "20px", marginLeft: '10px' }}
            id="outlined-search"
            label="Search field"
            type="search"
            placeholder="search any field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={(e) => this.handleSearch(e)}
            variant="outlined"
          />
        </div>
        <TableUi data={this.state.data}    columnHideIndex={this.state.columnHideIndex} filterfun={this.state.filterfun} handleEditClick={this.handleEditClick.bind(this)} />
        </div>
        
        </Paper>
        <div>
         <DialogComponent  mdmsResOsbm ={ this.state.mdmsResOsbm} open={this.state.open}    fetchTableData={this.fetchTableData.bind(this)}  handleClose={this.handleClose.bind(this)} updateData={this.state.updateData} /> 
        </div>
        </div> 
    
          
      </MuiThemeProvider>
    );
  }
}


