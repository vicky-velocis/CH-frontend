

import { httpRequest } from "egov-ui-kit/utils/api";


import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Paper } from '@material-ui/core';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';



import   DialogComponent from './DialogComponent'
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";


const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
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

    
    // let {data} = await httpRequest(
    //     "bookings/master/all/approver/_fetch",
    //     "_search",
    //     [],[]
    //   );
    //    this.setState({data: data})
    //     this.fetchApplicaionSector()
        
    //     let approver = await httpRequest(
    //       "bookings/master/approver/_fetch",
    //       "_search",
    //       [],[]
    //     );
    //     console.log(approver,"approver")
    

 
	let requestBody = {
		MdmsCriteria: {
			tenantId: "ch",
			moduleDetails: [
				{
					moduleName: "Booking",
					masterDetails: [
						{
							name: "Sector",
						},
					],
				},
			],
		},
	};

	try {
	  const payload = await httpRequest("egov-mdms-service/v1/_search", "_search", [], requestBody);
      console.log(payload, "payload")
      const {MdmsRes : {Booking: { Sector}}}= payload
      this.setState({sectorList: Sector})
			
	} catch (error) {
      alert("error")
	}

    this.setState({updateData: {}})
    
    let {data} = await httpRequest(
      "bookings/master/approver/_fetch", 
      "_search",
      [],[]
    );
     this.setState({data: data})
     console.log(this.state.data, " data")
  
     
    }
    

  state = {
    
    data:[],
    mdmsRes: {}, 
    page: 0,
    rowsPerPage: 5,
    open: false,
    updateData: {},
    sectorList: []


  };

  
  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage:parseInt(event.target.value, 10),
      page: 0
    });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    this.setState({ updateData: {} });
    
  }

  formatDate(date){

    if(date!=null){
    let value= new Date(date)
    let d=value.getDate()
    let m=value.getMonth()+1
    let y=value.getFullYear()
    
    return d+'/'+m+'/'+y
    }
    else{

    return "NA"    

    }
    
  }

  render() {
    
const emptyRows =
this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);

    return (
      <MuiThemeProvider theme={theme}>
       <div align ="right"  >
       <IconButton style={{marginTop:'15px'}} onClick={()=>{ 
                  this.setState({updateData: {}})
                  this.setState({open: true})
                  }}
        
                >
          <AddCircleOutlineIcon  style={{ fontSize: 30 , color : " black"}} />
        </IconButton>
      </div>  
      <div class="col-xs-12 " style={{ wordBreak: "break-word"}}>

        <Paper>
        <Table aria-label="simple table" >
          <TableHead style={{fontSize: "small"}} >
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Created Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Last Modified Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Role Code</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Sector</Typography>
              </TableCell>
              <TableCell >
              
              <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">{row.id}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">{this.formatDate(row.createdDate)}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">{this.formatDate(row.lastModifiedDate)}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">{row.roleCode}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">{row.sector}</Typography>
                </TableCell>
               
                <TableCell align="left">
                <IconButton onClick={async () => {
                     await this.setState({updateData: row})
                      this.handleClickOpen();
                    }}>
                  <EditIcon />
                  </IconButton>  

                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: (53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={(e,newPage) => {
            this.handleChangePage(e,newPage);
          }}
          onChangeRowsPerPage={(e) => {
            this.handleChangeRowsPerPage(e);
          }}
        />
        </Paper>
        <div>
         <DialogComponent open={this.state.open}  sectorList ={ this.state.sectorList} handleClose={this.handleClose.bind(this)} updateData={this.state.updateData} /> 
        </div>
        </div> 
    
          
      </MuiThemeProvider>
    );
  }
}


