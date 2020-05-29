import React, { Component } from 'react';
import QueryRow from '../QueryRow/QueryRow';
import lessons from '../../lessons.json';


export default class QueryForm extends Component {
    state = {
        queryRows: [
            {
                series: "",
                lessonStart: "",
                lessonEnd: ""
            }
        ],
        size: []
    }

    seriesChangeHandler = (index, series) => {
        let newQueryRows = this.state.queryRows.slice();
        newQueryRows[index].series = series;
        this.setState({queryRows: newQueryRows});
    }

    lessonStartChangeHandler = (index, lessonStart) => {
        let newQueryRows = this.state.queryRows.slice();
        newQueryRows[index].lessonStart = lessonStart;
        this.setState({queryRows: newQueryRows});
    }

    lessonEndChangeHandler = (index, lessonEnd) => {
        let newQueryRows = this.state.queryRows.slice();
        newQueryRows[index].lessonEnd = lessonEnd;
        this.setState({queryRows: newQueryRows});
    }

    // Mimic loading of remote data
    getFile = async () => {
         let data = await lessons;
         return data;
    }

    localSubmitHandler = () => {
        this.getFile()
        .then(res => {
            let sizeArr = this.state.queryRows.map((lessonSet) => {
                let filteredObjects = res.filter(obj => {
                    return obj.series === Number(lessonSet.series);
                }).filter(obj => {
                    return obj.lesson >= Number(lessonSet.lessonStart);
                }).filter(obj => {
                    return obj.lesson <= Number(lessonSet.lessonEnd);
                });
                let data = [];
                filteredObjects.forEach(obj => {
                    data.push(obj.size);
                });
                let totalSize = data.reduce(function(sum, value) {
                    return sum + value;
                }, 0)/(1024*1024);
                return totalSize;
            })
            this.setState({size: sizeArr});
        });
    }

    addClickHandler =  () => {
        let newQueryRows = this.state.queryRows.slice();
        newQueryRows.push({
            series: "",
            lessonStart: "",
            lessonEnd: ""
        })
        this.setState({queryRows: newQueryRows})      
    }

    removeClickHandler = (index) => {
        let newQueryRows = this.state.queryRows.slice();
        newQueryRows.splice(index,1);
        this.setState({queryRows: newQueryRows});
    }

    totalAllRows = () => {
        if (this.state.size.length === 0) {return};
        return this.state.size.reduce(function(sum, value) {
            return sum + value;
        }).toFixed(2);
    }

    render() {
        let queryRowsToRender = [];
        for(let i=0; i < this.state.queryRows.length; i++) {
            queryRowsToRender.push(
                <div className="card seriesCard" key={i}>
                    <QueryRow
                        id={i}
                        series={this.state.queryRows[i].series}
                        seriesChange={this.seriesChangeHandler}
                        lessonStart={this.state.queryRows[i].lessonStart}
                        lessonStartChange={this.lessonStartChangeHandler}
                        lessonEnd={this.state.queryRows[i].lessonEnd}
                        lessonEndChange={this.lessonEndChangeHandler} />
                    <div className="close-btn">
                        <i
                            onClick={() => this.removeClickHandler(i)}
                            className="small material-icons">clear</i>
                    </div>
                </div>
            );
        };

        let submitBlock = [
            <div key="1" className="row">
                <div className="col s12">
                    <div className="card seriesCard">
                        <div className="col s6 font-black"><h3>{this.totalAllRows()} mb</h3></div>
                        <div className="col s6 font-black">
                            {this.totalAllRows() <=700 ? <i className="large material-icons font-green">check_circle</i> : <i className="large material-icons font-red">cancel</i>}
                        </div>
                    </div>
                </div>
            </div>
        ];

        return(
            <>
                <h3>Lesson Size Calculator</h3>
                <div className="row relative">
                    <div className="col s12">
                        {queryRowsToRender}
                        <div className=" add-btn">
                        <button 
                            className="btn-floating btn-large waves-effect waves-light green"
                            onClick={this.addClickHandler}>
                            <i className="material-icons">add</i>
                        </button>
                        </div>
                    </div>
                </div>
                <p>
                    <button 
                        className="btn-large cyan darken-1
                        waves-effect waves-light"
                        onClick={this.localSubmitHandler}>Submit</button>
                </p>
                {this.state.size.length !== 0 ? submitBlock : ''}
            </>
        )
    }
}