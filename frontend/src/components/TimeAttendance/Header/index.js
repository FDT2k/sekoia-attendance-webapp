import React, { Component } from 'react';
import { PageHeader } from 'antd';
import Clock from 'components/Widgets/Clock';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="Sekoia"
                subTitle="Pointage pour la présence"
                extra={[
                    // <Button key="showPresents">Afficher les présents</Button>,
                    <Clock key="clock" />
                ]}
            />
        )
    }
}

export default Header;
