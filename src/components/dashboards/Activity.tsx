/// <reference path="../../../typings/index.d.ts"/>

import * as React from 'react';
import * as Highcharts from 'highcharts';
import * as Moment from 'moment';

var HighchartsMore = require('highcharts-more');
var HighchartsSolidGauge = require('highcharts-solid-gauge');
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

import { ActivityData } from '../../models/ActivityModel';

interface ActivityChartProps extends React.Props<ActivityChart> {
    activityData: ActivityData;
}

interface ActivityChartState {
    chart: HighchartsChartObject;
}

class ActivityChart extends React.Component<ActivityChartProps, ActivityChartState> {
    constructor(props: ActivityChartProps) {
        super(props);

        this.state = {
            chart: null,
        };
    }

    componentDidMount() {
        let options = this.getChartOptions();

        this.setState({
            chart: new Highcharts.Chart('activity-chart', options)
        });
    }

    componentWillUnmount() {
        this.state.chart.destroy();
    }

    getChartOptions() {
        let entries = this.props.activityData.entries;

        return {
            chart: {
                type: 'solidgauge',
                width: 600,
                height: 160,
                style: { fontFamily: 'Roboto' },
            },

            title: { text: '' },

            plotOptions: {
                dataLabels: { enabled: false },
                stickyTracking: false,
            },

            pane: entries.map(function(e, ind) {
                return {
                    startAngle: 0,
                    endAngle: 360,
                    size: 64,
                    center: [((100 / entries.length) * ind + 8).toString() + '%', '50%'],
                    background: {
                        backgroundColor: '#eee',
                        borderWidth: 0,
                        radius: '100%',
                        innerRadius: '90%',
                        shape: 'arc',
                    },
                }
            }),

            yAxis: entries.map(function(e, ind) {
                return {
                    min: 0,
                    max: 30,
                    pane: ind,
                    gridLineWidth: 0,
                    lineWidth: 0,
                    minorTickWidth: 0,
                    tickWidth: 0,
                    showFirstLabel: false,
                    labels: {
                        enabled: false,
                    },
                    title: {
                        text: Moment(e.date).format('ddd MMM D'),
                        y: 76,
                    },
                }
            }),

            series: entries.map(function(e, ind) {
                return {
                    name: e.date,
                    data: [{y: e.minutes, color: '#AEEA00'}],
                    yAxis: ind,
                    radius: '120%',
                    innerRadius: '90%',
                    dataLabels: {
                        borderWidth: 0,
                        y: -16,
                        style: {
                            fontSize: 14,
                            fontWeight: 'light',
                        },
                        format: '{y} m',
                    }
                }
            }),

            legend: { enabled: false },
            tooltip: { enabled: false },
            credits: { enabled: false }
        };
    }

    render() {
        return (<div className="activity-chart" id="activity-chart"></div>)
    }
}

interface ActivityProps extends React.Props<Activity> {
    activityData: ActivityData;
}

export class Activity extends React.Component<ActivityProps, {}> {
    render() {
        return (
            <div className="dashboard">
                <h2 className="dashboard__header">Activity</h2>
                <div className="dashboard__content">
                    <ActivityChart activityData={this.props.activityData} />
                    <div className="tips-pane">
                        <h3 className="tips-pane__header">Using your tracker</h3>
                        <ul className="tips-pane__list">
                            <li className="tips-pane__item">Be sure to wear your tracker every day so your doctor can identify changes in your activity level.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}