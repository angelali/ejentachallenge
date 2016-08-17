import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { User } from '../models/UserModel';
import { WeightData } from '../models/WeightModel';
import { ActivityData } from '../models/ActivityModel';

import { Homepage } from '../components/Homepage';

require('../styles/main.scss');

interface AppState {
    user: User;
    weightData: WeightData;
    activityData: ActivityData;
}

export class App extends React.Component<{}, AppState> {
    componentDidMount() {
        this.fetchServerData(this.processServerData.bind(this), function(){})
    }

    fetchServerData(onSuccess: (resp: any) => void, onError: (resp: any) => void) {
        var resp = require("json!../serverData.json");
        onSuccess(resp);

        /* Looks like the endpoint doesn't accept cross-origin requests :(

        const SERVER_ENDPOINT = 'https://interactionservice-staging.ejenta.com/challenge';

        return fetch(SERVER_ENDPOINT, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        }).then((resp: any) => {
            console.log(resp);
            onSuccess(resp)
        });

        */
    }

    processServerData(resp: any) {
        let state = {
            user: {
                firstName: resp.first_name,
                lastName: resp.last_name,
                startWeightLbs: resp.start_weight_in_lbs
            },
            weightData: {
                entries: resp.weights.map(function(w: any) {
                    return {
                        weightLbs: w.weight_in_lbs,
                        timestamp: w.timestamp
                    }
                }),
                alerts: resp.alerts.map(function(a: any) {
                    return {
                        category: a.category,
                        text: a.text,
                        timestamp: a.timestamp
                    }
                }),
            },
            activityData: {
                entries: resp.activities.map(function(a: any) {
                    return {
                        minutes: a.minutes,
                        date: a.date
                    }
                }),
            }
        };

        this.setState(state);
    }

    render() {
        if (!this.state) {
            return (<div className="loading"></div>)
        }

        // Some routing should live here!
        return (<Homepage {...this.state} />)
    }
}