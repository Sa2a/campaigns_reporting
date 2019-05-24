import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import * as Integer from "lodash";

export default class ReportChart extends Component {
    constructor(props) {
        super(props);

        if (props.results) {
            const firstDimension = [];
            const secondDimension = [];
            //1st row
            let dimensionName_1 = props.dimensions[1] != null ? props.dimensions[1].name : ' ';
            //1st col
            let dimensionName_2 = props.dimensions[0].name;
            let myData = Array(props.results.length + 1)
                .fill(0).map(() => Array(dimensionName_1 === ' ' ? 2 : props.results.length + 1).fill(0));
            myData[0][0] = (dimensionName_2);
            props.results.forEach(result => {
                //get Column number
                let col = firstDimension.indexOf(result[dimensionName_1]);
                if (col < 0) {
                    firstDimension.push(result[dimensionName_1]);
                    col = firstDimension.length - 1;
                }
                let row = secondDimension.indexOf(result[dimensionName_2]);
                if (row < 0) {
                    secondDimension.push(result[dimensionName_2]);
                    row = secondDimension.length - 1;
                }
                myData[row + 1][col + 1] = Integer.parseInt(result['Count']);

            });

            console.log(firstDimension);
            console.log(secondDimension);
            let i = 0;
            for (; i < firstDimension.length; i++) {
                myData[0][i + 1] = firstDimension[i];
            }

            if (dimensionName_1 === ' ') {
                myData[0][1] = dimensionName_1;
            }
            let j = 0;
            i+=1;
            for (; j < secondDimension.length; j++) {
                myData[j + 1][0] = secondDimension[j];
                //remove the extra cols
                myData[j].splice(i, myData.length -i);
            }
            myData[j].splice(i, myData.length -i);

            //remove the extra rows
            j+=1;
            myData.splice(j, myData.length -j);


            console.log(myData);
            this.state = {
                data: myData
            };
        }

    }


    render() {
        return (
            <div>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    /*{[
                        ['Country',''],
                        ['Egypt', 1],
                        ['US', 2]
                    ]}*/
                    /*{[
                    ['Country', 'Sports', 'Technology'],
                    ['Egypt', 1, 1],
                    ['US', 2, 1]
                ]}*/
                    options={{
                        // Material design options
                        chart: {
                            title: 'Company Performance',
                            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        },
                    }}
                    // For tests
                    rootProps={{'data-testid': '2'}}
                />
            </div>
        );
    }
}