/// <reference path="../../../typings/index.d.ts"/>

import * as React from "react";
import * as Highcharts from "highcharts";
import * as Moment from "moment";

import { User } from '../../models/UserModel';
import { WeightData } from '../../models/WeightModel';

interface WeightChartProps extends React.Props<WeightChart> {
    user: User;
    weightData: WeightData;
}

interface WeightChartState {
    chart: HighchartsChartObject;
}

class WeightChart extends React.Component<WeightChartProps, WeightChartState> {
    constructor(props: WeightChartProps) {
        super(props);

        this.state = {
            chart: null,
        };
    }

    componentDidMount() {
        let options = this.getChartOptions();

        this.setState({
            chart: new Highcharts.Chart('weight-chart', options)
        });
    }

    componentWillUnmount() {
        this.state.chart.destroy();
    }


    getChartOptions() {
        let entries = this.props.weightData.entries;

        // HERE THERE BE MONSTERS!!!
        // Some seriously questionable material ahead
        // (This logic would probably live where the API client would be if this were a real app)

        // Process alert data
        let alertData: any = [];
        this.props.weightData.alerts.forEach((a) => {
            // Find the matching datum in the daily weight dataset
            for (var i = 0; i < entries.length; i++) {
                if (a.timestamp == entries[i].timestamp) {
                    alertData.push({
                        xIndex: i,
                        value: entries[i].weightLbs,
                        category: a.category,
                        text: a.text,
                    });
                }
            }
        });

        let alertSeries = alertData.map((a: any) => {
            let data = this.props.weightData.entries.map(() => { return null });
            data[a.xIndex] = a.value;

            return {
                type: 'scatter',
                data: data,
                marker: {
                    radius: 10,
                    fillColor: 'rgba(0, 0, 0, 0)',
                    symbol: 'circle',
                    lineColor: 'rgba(255, 0, 0, 0.2)',
                    lineWidth: 12,
                },
                tooltip: {
                    headerFormat: '<strong>' + (a.category == 'weight_change' ? 'Weight change' : a.category) + '</strong><br/><br/>',
                    pointFormat: a.text + '<br/><br/>',
                },
                showInLegend: false,
            }
        });

        return {
            chart: {
                width: 600,
                style: { fontFamily: 'Roboto' },
            },
            title: { text: '' },
            legend: {
                itemDistance: 60,
                itemStyle: { fontWeight: 'light' },
            },

            xAxis: {
                categories: entries.map(function(e) { return Moment(e.timestamp).format('ddd MMM D') }),
                labels: { padding: 25 },
                tickWidth: 0,
            },
            yAxis: {
                title: { text: '' },
            },

            series: alertSeries.concat([{
                name: 'Weight',
                data: entries.map(function(e) { return e.weightLbs }),
                color: '#29B6F6',
                stickyTracking: false,
            }, {
                name: 'Start weight',

                // Hack! There was some wonkiness going on with TypeScript arrays and .fill() ...
                data: entries.map((e) => { return this.props.user.startWeightLbs }),

                enableMouseTracking: false,
                color: '#AEEA00',
                dashStyle: 'ShortDash',
                marker: {
                    enabled: false,
                },
            }]),

            credits: { enabled: false }
        };
    }

    render() {
        return (<div className="weight-chart" id="weight-chart"></div>)
    }
}

interface WeightProps extends React.Props<Weight> {
    user: User;
    weightData: WeightData;
}

export class Weight extends React.Component<WeightProps, {}> {
    render() {
        return (
            <div className="dashboard">
                <h2 className="dashboard__header">Weight</h2>
                <div className="dashboard__content">
                    <WeightChart user={this.props.user} weightData={this.props.weightData} />
                    <div className="tips-pane">
                        <h3 className="tips-pane__header">Using your scale</h3>
                        <ul className="tips-pane__list">
                            <li className="tips-pane__item">Step on the scale every morning before you have breakfast.</li>
                            <li className="tips-pane__item">Place the scale somewhere you walk past every day</li>
                            <li className="tips-pane__item">Make sure your scale is on a flat surface -- wood or tile is better than carpet.</li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}