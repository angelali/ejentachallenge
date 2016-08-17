import * as React from "react";

import { User } from '../models/UserModel';
import { WeightData } from '../models/WeightModel';
import { ActivityData } from '../models/ActivityModel';

import { Weight } from '../components/dashboards/Weight';
import { Activity } from '../components/dashboards/Activity';

const careTeam = [
    {
        name: 'Matthew Park',
        role: 'Cardiologist',
        photo: require('../images/doctor.jpg'),
    },
    {
        name: 'Emily Watkins',
        role: 'Nurse Practitioner',
        photo: require('../images/nurse.jpg'),
    }
];

const tips = [
    {
        header: "Eat a Mediterranean diet",
        backgroundImage: 'url(' + require('../images/med-diet.jpg') + ')',
    },
    {
        header: "Don't add table salt to your food",
        backgroundImage: 'url(' + require('../images/never-add-salt.jpg') + ')',
    },
]

interface HomepageProps extends React.Props<Homepage> {
    user: User;
    weightData: WeightData;
    activityData: ActivityData;
}

export class Homepage extends React.Component<HomepageProps, {}> {
    renderHeader() {
        let notificationsStyle = { backgroundImage: 'url(' + require('../images/bell.png') + ')' }
        let photoStyle = { backgroundImage: 'url(' + require('../images/patient.jpg') + ')' }

        return (
            <div className="homepage__header">
                <h1>HealthyHeart ❤</h1>
                <div className="user-nav">
                    <a href="javascript:void(0)" className="user-nav__notifications" style={notificationsStyle}></a>
                    <a href="javascript:void(0)" className="user-nav__photo" style={photoStyle}></a>
                </div>
            </div>
        )
    }

    renderSidebar() {
        return (
            <div className="homepage__sidebar">
                <section className="team-list">
                    <h2>Care team</h2>

                    {(() => {
                        let t = careTeam.map(function(teamMember) {
                            return (
                                <div className="team-list__item" key={teamMember.name}>
                                    <div
                                        className="team-list__photo"
                                        style={{backgroundImage: 'url(' + teamMember.photo + ')'}}
                                    ></div>
                                    <div className="team-list__title">
                                        <div className="team-list__name">{teamMember.name}</div>
                                        <div className="team-list__role">{teamMember.role}</div>
                                    </div>
                                </div>)
                        });

                        return (<div>{t}</div>)
                    })()}
                </section>

                <section className="contact-info">
                    <h2 className="contact-info__header">Contact info</h2>

                    <p className="contact-info__body">Non-urgent: (703) 555-6789</p>
                    <p className="contact-info__body">Urgent: Call 911</p>
                </section>
            </div>
        )
    }

    renderTipsSection() {
        return (
            <div className="tips-section">
                <h2 className="tips-section__header">Healthy eating tips</h2>

                <div className="tips-section__row">
                    {(() => {
                        let t = tips.map(function(tip) {
                            return (
                                <div className="tips-section__item" key={tip.header}>
                                    <div
                                        className="tips-section__image"
                                        style={{backgroundImage: tip.backgroundImage}}
                                    ></div>
                                    <div className="tips-section__headline">{tip.header}</div>
                                    <a href="javascript:void(0)" className="tips-section__learn-more">Learn more →</a>
                                </div>
                            )
                        });

                        return (<div>{t}</div>)
                    })()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="homepage">
                <div className="">
                    {this.renderHeader()}
                </div>

                <div className="homepage__container">
                    {this.renderSidebar()}

                    <div className="homepage__content">
                        <div className="greeting">
                            <h2>Welcome back, {this.props.user.firstName}</h2>
                        </div>

                        <Weight user={this.props.user} weightData={this.props.weightData} />

                        <Activity activityData={this.props.activityData} />

                        {this.renderTipsSection()}
                    </div>
                </div>

            </div>
        )
    }
}