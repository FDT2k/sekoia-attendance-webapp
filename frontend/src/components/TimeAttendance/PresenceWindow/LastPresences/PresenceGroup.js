import { Icon, Timeline } from 'antd';
import React from 'react';
import FormattedDuration from './FormattedDuration';
import FormattedInOut from './FormattedInOut';

export default function PresenceGroup(props) {

    const { check_in, check_out, worked_hours, id } = props.item;

    return (
        <>
            {check_out &&
                <>
                    <Timeline.Item
                        className="ant-timeline-item-left"
                        dot={<Icon type="clock-circle-o" />}
                        color={worked_hours > 8 ? "red" : "green"}
                    >
                        <FormattedDuration decimalHours={worked_hours} />
                    </Timeline.Item>


                    <Timeline.Item
                        className="ant-timeline-item-left"
                        dot={<Icon type="logout" />}
                    >
                        <FormattedInOut value={check_out} />
                    </Timeline.Item>
                </>
            }

            <Timeline.Item
                className="ant-timeline-item-right"
                dot={<Icon type="login" />}
            >
                <FormattedInOut value={check_in} />
            </Timeline.Item>
        </>
    )
}
