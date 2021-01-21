import React, { Component } from "react";
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import CardContent from '@material-ui/core/CardContent';
// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
// import Dashboardtable from './Dashboardtable'
import data from './data.json';
import './index.css';

class DescriptionDashboard extends React.Component {
        constructor(props) {
        super(props);
        this.state ={
            checkData: null,
            allData : [],
            filterDataRoot: [],
            filterData : [],
            graphLabel: [],
            grahData: [],
            graphclicked: false,
            drildownGraphLabel : [],
            drildownGraphData: [],
            description: "",
            drilDownLevel : -1,
            columnData : [],
            rowData: [],
            graphOne: [],
            graphTwo: [],
            sortBy : "",
            graphOneData : {},
            graphTwoData : {},
            graphThreeData : {},
        }
        }
    
        // Not use
        handleBack = (e) => {
        e.preventDefault();
            this.setState({
                graphclicked: false,
            })
        }

        // Some Hard Code for graph
        graphSearchDataOption =(sortBy) =>{

        debugger;
        const propSortBy = sortBy;
        var JSONgraphOption = {
            "sortBy": "SORT BY",
            "msgX": "MSG X",
            "msgY": "MSG Y",
            "title": "TITLE",
        }


        var sortByList = [];
        var graphOneSortBy = propSortBy === "status" ? [
                {
                "sortBy": "status",
                "msgX": "Status",
                "msgY": "No of Complaints",
                "title": "Statuswise PGR Report",
                }, 
                {
                "sortBy": "department",
                "msgX": "No of Complaints",
                "msgY": "Department",
                "title": "Departmentwise PGR Status Report",
                },
                { 
                "sortBy": "locality",
                "msgX": "Location",
                "msgY": "No of Complaints",
                "title": "Locationwise PGR Status Report",
                }
            ] : 
            propSortBy === "source" ? [
                {
                "sortBy": "source",
                "msgX": "Source",
                "msgY": "No of Complaints",
                "title": "Sourcewise PGR Report",
                }, 
                {
                "sortBy": "status",
                "msgX": "No of Complaints",
                "msgY": "Status",
                "title": "Sourcewise PGR Status Report",
                },
                { 
                "sortBy": "department",
                "msgX": "Department",
                "msgY": "No of Complaints",
                "title": "Sourcewise PGR Department Report",
                }
            ] : 
            propSortBy === "department" ? [
                {
                "sortBy": "department",
                "msgX": "Department",
                "msgY": "No of Complaints",
                "title": "Departmentwise PGR Report",
                }, 
                {
                "sortBy": "status",
                "msgX": "No of Complaints",
                "msgY": "Status",
                "title": "Departmentwise PGR Status Report",
                },
                { 
                "sortBy": "locality",
                "msgX": "Location",
                "msgY": "No of Complaints",
                "title": "Departmentwise PGR Location Report",
                }
            ] : "";

            return graphOneSortBy;

        }
    
        // Column Sort for indexing react table
        customColumnSort = (colData) => {
            debugger
            const data = colData;
            var indexingData = []
            var indexCol = [2,3,0,4,5,7,11,16,15]
            for(var i=0; i<indexCol.length; i++){
                indexingData.push(colData[indexCol[i]])
            }
            return indexingData
        }

        // CamelCase Column Name 
        camelize = (str) =>  {
        var res = str.substr(0, 1);
        return str.replace(res, function(res)
        {
            return res.toUpperCase();
        });
        }

        componentDidMount(){
            
        debugger;
        const dataProps = this.props.data[0] ? this.props.data[0] : [];
        const sortByProp = this.props.data[1] ? this.props.data[1] : "";
        if((JSON.stringify(this.props.data) !== JSON.stringify(this.state.checkData)) &&
            dataProps.reportResponses !== undefined){
        const sortBy = sortByProp.value;
        // const sortBy = "source";
        // const sortBy = "department";
        const reportHeader = dataProps.reportResponses[0].reportHeader;
        const reportData = dataProps.reportResponses[0].reportData;
        const formatedData = [];

        var graphSearchOption = this.graphSearchDataOption(sortBy)

        for(var i=0; i<reportHeader.length ; i++){
            var singleData = {}
            var listData = []
            singleData[reportHeader[i].name] = listData;
            formatedData.push(singleData);
        }
        console.log("Before Group By Status :: ", reportData);

        // Dynamic Sorting
        debugger;
        var sortNo = null
        for(var i=0; i<reportHeader.length ; i++){
            if(reportHeader[i].name === graphSearchOption[0].sortBy){
                sortNo = i;
                break;
            }
        }

        var group = reportData.reduce((r, a) => {
            r[a[sortNo]] = [...r[a[sortNo]] || [], a];
            return r;
            }, {});
        console.log("Group By Status :: ", group);
        console.log("Header Status ::", reportHeader);

        var filteredGroupData = []
        var graphData = []
        for(var i=0; i<Object.keys(group).length ; i++){
            filteredGroupData.push(Object.values(group)[i]);
            graphData.push(Object.values(group)[i].length);
        }

        // Table Column 
        var columnData = []
        for(var i=0; i<reportHeader.length; i++){
            var col = {};
            col["Header"]= this.camelize(reportHeader[i].name);
            col["accessor"]= reportHeader[i].name
            col["show"]= (i === 0 || i === 2 || i === 3 || i === 4 || i === 5 || i === 7 || i === 11 || i === 15 || i ===16 ) ? true : false
            columnData.push(col)
        }


        const indexingColumn = this.customColumnSort(columnData);

        var rowData = []
        for(var i=0; i<reportData.length; i++){
            var singleRow = {}
            for(var j=0; j<reportHeader.length; j++){
                singleRow[reportHeader[j].name]= reportData[i][j] 
            }
            rowData.push(singleRow)
        }

        this.setState({
            checkData : this.props.data,
            allData : formatedData,
            reportHeader: reportHeader,
            filterDataRoot : filteredGroupData,
            filterData : filteredGroupData,
            graphLabel : Object.keys(group),
            grahData: graphData,
            drilDownLevel : 0,
            columnData : indexingColumn,
            rowData: rowData,
            sortBy: this.camelize(sortBy),
            graphOneData : graphSearchOption[0],
            graphTwoData : graphSearchOption[1],
            graphThreeData : graphSearchOption[2],
        })
        }
        }

        componentDidUpdate(){
            
        debugger;
        const dataProps = this.props.data[0] ? this.props.data[0] : [];
        const sortByProp = this.props.data[1] ? this.props.data[1] : "";
        if((JSON.stringify(this.props.data) !== JSON.stringify(this.state.checkData)) &&
            dataProps.reportResponses !== undefined){
        const sortBy = sortByProp.value
        // const sortBy = "source";
        // const sortBy = "department";
        const reportHeader = dataProps.reportResponses[0].reportHeader;
        const reportData = dataProps.reportResponses[0].reportData;
        const formatedData = [];

        var graphSearchOption = this.graphSearchDataOption(sortBy);

        for(var i=0; i<reportHeader.length ; i++){
            var singleData = {}
            var listData = []
            singleData[reportHeader[i].name] = listData;
            formatedData.push(singleData);
        }
        console.log("Before Group By Status :: ", reportData);

        // Dynamic Sorting
        debugger;
        var sortNo = null
        for(var i=0; i<reportHeader.length ; i++){
            if(reportHeader[i].name === graphSearchOption[0].sortBy){
                sortNo = i;
                break;
            }
        }

        var group = reportData.reduce((r, a) => {
            r[a[sortNo]] = [...r[a[sortNo]] || [], a];
            return r;
            }, {});
        console.log("Group By Status :: ", group);
        console.log("Header Status ::", reportHeader);

        var filteredGroupData = []
        var graphData = []
        for(var i=0; i<Object.keys(group).length ; i++){
            filteredGroupData.push(Object.values(group)[i]);
            graphData.push(Object.values(group)[i].length);
        }

        // Table Column 
        var columnData = []
        for(var i=0; i<reportHeader.length; i++){
            var col = {};
            col["Header"]= this.camelize(reportHeader[i].name);
            col["accessor"]= reportHeader[i].name
            col["show"]= (i === 0 || i === 2 || i === 3 || i === 4 || i === 5 || i === 7 || i === 11 || i === 15 || i ===16 ) ? true : false
            columnData.push(col)
        }


        const indexingColumn = this.customColumnSort(columnData);

        var rowData = []
        for(var i=0; i<reportData.length; i++){
            var singleRow = {}
            for(var j=0; j<reportHeader.length; j++){
                singleRow[reportHeader[j].name]= reportData[i][j] 
            }
            rowData.push(singleRow)
        }

        this.setState({
            checkData : this.props.data,
            allData : formatedData,
            reportHeader: reportHeader,
            filterDataRoot : filteredGroupData,
            filterData : filteredGroupData,
            graphLabel : Object.keys(group),
            grahData: graphData,
            drilDownLevel : 0,
            columnData : indexingColumn,
            rowData: rowData,
            sortBy: this.camelize(sortBy),
            graphOneData : graphSearchOption[0],
            graphTwoData : graphSearchOption[1],
            graphThreeData : graphSearchOption[2],
        })
        }
        }

  render() {

    // Pie Graph 
    var graphDatabyStatus = {
    labels: this.state.graphLabel,
    // labels : ["Label 1", "Label 2"],
    datasets: [
        {
        // label:  this.state.graphLabel,
        fill: false,
        lineTension: 0.1,
        hoverBorderWidth : 12,
        // backgroundColor : this.state.colorRandom,
        backgroundColor : ["#F77C15", "#385BC8", "", "#FFC300", "#348AE4", "#FF5733", "#9DC4E1", "#3A3B7F", "", "", "", "", "", ""],
        borderColor: "rgba(75,192,192,0.4)",
        borderCapStyle: "butt",
        barPercentage: 2,
        barThickness: 25,
        maxBarThickness: 25,
        minBarLength: 2,
        data: this.state.grahData
        // data: [10, 20]
        }
    ]
    }

    var graphOptionbyStatus = {
    responsive : true,
    // aspectRatio : 3,
    maintainAspectRatio: false,
    cutoutPercentage : 0,
    // circumference : 12,
    onClick: (e, element) => {
        if (element.length > 0) {
        var ind = element[0]._index;
        // Group By Department Function 
        const drildownData = this.state.filterDataRoot[ind];

        // Dynamic Sorting
        debugger;
        var sortNo = null
        for(var i=0; i<this.state.reportHeader.length ; i++){
            if(this.state.reportHeader[i].name === this.state.graphTwoData.sortBy){
                sortNo = i;
                break;
            }
        }

        var departmentWiseData = drildownData.reduce((r, a) => {
            // console.log("a", a);
            // console.log('r', r);
            r[a[sortNo]] = [...r[a[sortNo]] || [], a];
            return r;
            }, {});
        console.log("Complaint by status :: ", departmentWiseData);

        // Graph Setting
        var filteredGroupData = []
        var graphData = []
        for(var i=0; i<Object.keys(departmentWiseData).length ; i++){
            filteredGroupData.push(Object.values(departmentWiseData)[i]);
            graphData.push(Object.values(departmentWiseData)[i].length);
        }

        // Table Column 
        
        // var columnData = []
        // for(var i=0; i<this.state.reportHeader.length; i++){
        //     var col = {};
        //     col["Header"]= this.camelize(this.state.reportHeader[i].name);
        //     col["accessor"]= this.state.reportHeader[i].name
        //     columnData.push(col)
        // }

        
        var rowData = []
        var filterData = this.state.filterData === this.state.filterDataRoot ?  this.state.filterData[ind] : this.state.filterDataRoot[ind]
        for(var i=0; i<filterData.length; i++){
            var singleRow = {}
            for(var j=0; j<this.state.reportHeader.length; j++){
                singleRow[this.state.reportHeader[j].name]= filterData[i][j] 
            }
            rowData.push(singleRow)
        }

        this.setState({
        filterData: filteredGroupData,
        description: this.state.filterData[ind],
        graphclicked : true,
        drildownGraphLabel : Object.keys(departmentWiseData),
        drildownGraphData : graphData,
        drilDownLevel: 1,
        // columnData : columnData,
        rowData: rowData,
        graphOne: filteredGroupData
        });
        // this.demoFunc(ind);            
        }
    },
    datasets : [
        {
        backgroundColor : "rgba(0, 0, 0, 0.1)",
        weight: 0
        }
    ], 
    legend: {
        display: false,
        position: 'bottom',
        labels: {
        fontFamily: "Comic Sans MS",
        boxWidth: 20,
        boxHeight: 2
        }
    },
    tooltips: {
        enabled: true
    },
    title: {
        display: true,
        text: this.state.graphOneData.title
    },
    scales: {
        xAxes: [{
            gridLines: {
                display:true
            },
            scaleLabel: {
                display: true,
                labelString: this.state.graphOneData.msgX
              },
        }],
        yAxes: [{
            gridLines: {
                display:true
            },
            scaleLabel: {
                display: true,
                labelString: this.state.graphOneData.msgY
            },
            ticks: {
                // suggestedMin: 0,
                // suggestedMax: 100,
                stepSize: 10
            },
        }],
    },
    // animation: {
    //   duration: 1,
    //   onComplete: function () {
    //       var chartInstance = this.chart,
    //           ctx = chartInstance.ctx;
    //           ctx.textAlign = 'center';
    //           ctx.fillStyle = "rgba(0, 0, 0, 1)";
    //           ctx.textBaseline = 'bottom';
    //           // Loop through each data in the datasets
    //           this.data.datasets.forEach(function (dataset, i) {  
    //               var meta = chartInstance.controller.getDatasetMeta(i);
    //               meta.data.forEach(function (bar, index) {
    //                   var data = dataset.data[index];
    //                   ctx.fillText(data, bar._model.x, bar._model.y - (index * 5));
    //               });
    //           });
    //       }
    // }
    plugins: {
        datalabels: {
            color: 'white',
            backgroundColor: 'grey',
            labels: {
                title: {
                    font: {
                        weight: 'bold'
                    }
                }
            }}}
    }

    var graphDatabyDepartment = {
        labels: this.state.drildownGraphLabel,
        // labels : ["Label 1", "Label 2"],
        datasets: [
            {
            // label: this.state.drildownGraphLabel,
            fill: false,
            lineTension: 5,
            hoverBorderWidth : 12,
            // backgroundColor : this.state.colorRandom,
            backgroundColor : ["#F77C15", "#385BC8", "", "#FFC300", "#348AE4", "#FF5733", "#9DC4E1", "#3A3B7F", "", "", "", "", "", ""],
            borderColor: "rgba(75,192,192,0.4)",
            borderCapStyle: "butt",
            barPercentage: 2,
            barThickness: 25,
            maxBarThickness: 25,
            minBarLength: 2,
            data: this.state.drildownGraphData
            // data: [10, 20]
            }
        ]
    }

    var graphOptionbyDepartment = {
        responsive : true,
        // aspectRatio : 3,
        maintainAspectRatio: false,
        cutoutPercentage : 0,
        datasets : [
            {
            backgroundColor : "rgba(0, 0, 0, 0.1)",
            weight: 0
            }
        ], 
        legend: {
            display: false,
            position: 'bottom',
            labels: {
            fontFamily: "Comic Sans MS",
            boxWidth: 20,
            boxHeight: 2
            }
        },
        tooltips: {
            enabled: true
        },
        title: {
            display: true,
            text: this.state.graphTwoData.title
        },
        onClick: (e, element) => {
            if (element.length > 0) {
            var ind = element[0]._index;
            // Group By Department Function 
            const drildownData = this.state.filterData[ind];

            // Dynamic Sorting
            debugger;
            var sortNo = null
            for(var i=0; i<this.state.reportHeader.length ; i++){
                if(this.state.reportHeader[i].name === this.state.graphThreeData.sortBy){
                    sortNo = i;
                    break;
                }
            }

            var departmentWiseData = drildownData.reduce((r, a) => {
                // console.log("a", a);
                // console.log('r', r);
                r[a[sortNo]] = [...r[a[sortNo]] || [], a];
                return r;
                }, {});
            console.log("Complaint by status :: ", departmentWiseData);
    
            // Graph Setting
            var filteredGroupData = []
            var graphData = []
            for(var i=0; i<Object.keys(departmentWiseData).length ; i++){
                filteredGroupData.push(Object.values(departmentWiseData)[i]);
                graphData.push(Object.values(departmentWiseData)[i].length);
            }
    
            // Table Column 
            
            // var columnData = []
            // for(var i=0; i<this.state.reportHeader.length; i++){
            //     var col = {};
            //     col["Header"]= this.camelize(this.state.reportHeader[i].name);
            //     col["accessor"]= this.state.reportHeader[i].name
            //     columnData.push(col)
            // }

            
            var rowData = []
            var filterData = this.state.graphOne[ind]
            for(var i=0; i<filterData.length; i++){
                var singleRow = {}
                for(var j=0; j<this.state.reportHeader.length; j++){
                    singleRow[this.state.reportHeader[j].name]= filterData[i][j] 
                }
                rowData.push(singleRow)
            }
            
            this.setState({
            //   description: "YOu have clicked"+ind+"...!",
            description: this.state.filterData[ind],
            graphclicked : true,
            drildownGraphLabelThird : Object.keys(departmentWiseData),
            drildownGraphDataThird : graphData,
            drilDownLevel: 2,
            rowData: rowData,
            graphTwo: filteredGroupData
            });
            // this.demoFunc(ind);            
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    // suggestedMin: 0,
                    // suggestedMax: 100,
                    stepSize: 1
                },
                scaleLabel: {
                    display: true,
                    labelString: this.state.graphTwoData.msgX
                  }, 
            }],
            yAxes: [{
                gridLines: {
                    display: true
                },
                scaleLabel: {
                    display: true,
                    labelString: this.state.graphTwoData.msgY
                  }, 
            }]
        },
        // animation: {
        //     duration: 1,
        //     onComplete: function () {
        //         var chartInstance = this.chart,
        //             ctx = chartInstance.ctx;
        //             ctx.textAlign = 'center';
        //             ctx.fillStyle = "rgba(0, 0, 0, 1)";
        //             ctx.textBaseline = 'bottom';
        //             // Loop through each data in the datasets
        //             this.data.datasets.forEach(function (dataset, i) {  
        //                 var meta = chartInstance.controller.getDatasetMeta(i);
        //                 meta.data.forEach(function (bar, index) {
        //                     var data = dataset.data[index];
        //                     ctx.fillText(data, bar._model.x, bar._model.y - (index * 5));
        //                 });
        //             });
        //         }
        //   }
    }

    var graphDatabySector = {
        labels: this.state.drildownGraphLabelThird,
        // labels : ["Label 1", "Label 2"],
        datasets: [
            {
            // label: "Module Raised Complaints",
            fill: false,
            lineTension: 0.1,
            hoverBorderWidth : 12,
            // backgroundColor : this.state.colorRandom,
            backgroundColor : ["#F77C15", "#385BC8", "", "#FFC300", "#348AE4", "#FF5733", "#9DC4E1", "#3A3B7F", "", "", "", "", "", ""],
            borderColor: "rgba(75,192,192,0.4)",
            borderCapStyle: "butt",
            barPercentage: 2,
            borderWidth: 5,
            barThickness: 25,
            maxBarThickness: 25,
            minBarLength: 2,
            data: this.state.drildownGraphDataThird
            // data: [10, 20]
            }
        ]
    }

    var graphOptionbySector = {
        responsive : true,
        // aspectRatio : 3,
        maintainAspectRatio: false,
        cutoutPercentage : 0,
        datasets : [
            {
            backgroundColor : "rgba(0, 0, 0, 0.1)",
            weight: 0
            }
        ], 
        legend: {
            display: false,
            position: 'bottom',
            labels: {
            fontFamily: "Comic Sans MS",
            boxWidth: 20,
            boxHeight: 2
            }
        },
        tooltips: {
            enabled: true
        },
        title: {
            display: true,
            text: this.state.graphThreeData.title
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:true
                },
                scaleLabel: {
                    display: true,
                    labelString: this.state.graphThreeData.msgX
                  }, 
            }],
            yAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    // suggestedMin: 0,
                    // suggestedMax: 100,
                    stepSize: 1
                },
                scaleLabel: {
                    display: true,
                    labelString: this.state.graphThreeData.msgY
                  }, 
            }]
        },
        onClick: (e, element) => {
            if (element.length > 0) {
            var ind = element[0]._index;

            // Table Column 
            
            // var columnData = []
            // for(var i=0; i<this.state.reportHeader.length; i++){
            //     var col = {};
            //     col["Header"]= this.camelize(this.state.reportHeader[i].name);
            //     col["accessor"]= this.state.reportHeader[i].name
            //     columnData.push(col)
            // }

            
            var rowData = []
            var filterData = this.state.graphTwo[ind]
            for(var i=0; i<filterData.length; i++){
                var singleRow = {}
                for(var j=0; j<this.state.reportHeader.length; j++){
                    singleRow[this.state.reportHeader[j].name]= filterData[i][j] 
                }
                rowData.push(singleRow)
            }
            
            this.setState({
            //   description: "YOu have clicked"+ind+"...!",
            description: this.state.filterData[ind],
            graphclicked : true,
            drilDownLevel: 2,
            rowData: rowData,
            });
            // this.demoFunc(ind);            
            }
        },
    }
       
    return (
      <div>
        <div style={{display:"flex", height:"500px"}}> 
            {
                // Graph 1
                <React.Fragment>
                    {this.state.drilDownLevel >= 0 ?
                    <CardContent style={{width:"50%", borderStyle: "ridge"}}>
                        <React.Fragment>
                            <Bar
                            data={ graphDatabyStatus }
                            options={ graphOptionbyStatus } 
                            />
                        </React.Fragment>
                    </CardContent>
                    :null}
                 {/* Graph 2 */}
                    {this.state.drilDownLevel >= 1 ?
                    <CardContent style={{width:"50%", borderStyle: "ridge"}}>
                        <React.Fragment>
                            <HorizontalBar
                            data={ graphDatabyDepartment }
                            options={ graphOptionbyDepartment } 
                            />
                        </React.Fragment>
                    </CardContent>
                    :null}
                </React.Fragment>
            }
        </div>
        {this.state.drilDownLevel >= 2 ?
        <CardContent style={{width:"100%", height:"400px",borderStyle: "ridge"}}>
            <React.Fragment>
                <Line
                data={ graphDatabySector }
                options={ graphOptionbySector } 
                />
            </React.Fragment>
        </CardContent>
        :null}
        <br/><br/><br/><br/>
        {
            this.state.drilDownLevel >= 0 ?
            <ReactTable id="customReactTable"
            data={this.state.rowData}  
            columns={this.state.columnData}  
            defaultPageSize = {10}  
            pageSizeOptions = {[20,40,60]}  
            /> 
        :null 
        }

         {/* <Dashboardtable 
          colData = {this.state.columnData}
         /> */}
      </div>
    );
  }
}

export default DescriptionDashboard;