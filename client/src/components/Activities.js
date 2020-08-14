import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Activities({ activities }) {

    const [dt, setDt] = useState(new Date().toLocaleString());

    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 60000)
        return () => clearInterval(secTimer);
    }, []);

    return (
        <div>
            {
                activities.map((intialActivity, index) => {
                    const activity = activities[activities.length - 1 - index]
                    const date = new Date(activity.createdAt)
                    const str = moment(date).fromNow();
                    var timestampString
                    if (str.includes('second') || str.includes('minute') || str.includes('hour'))
                        timestampString = str
                    else if (str.includes('day') && (str.split(' ')[0] === 'a' || str.split(' ')[0] < 7)) {
                        if (str === 'a day ago') {
                            const timeString = moment().subtract(1, 'days').calendar().split(' at ')[0]
                            timestampString = timeString + ' a =t ' + moment(date).format('LT')
                        }
                        else {
                            const timeString = moment().subtract(str.split(' ')[0], 'days').calendar().split(' at ')[0]
                            timestampString = timeString + ' at ' + moment(date).format('LT')
                        }
                    }
                    else
                        timestampString = moment(date).format('LLL')
                    return (<div key={activity._id}>
                        {activity.text}
                        <p>{timestampString}</p>
                    </div>)
                })
            }
        </div>
    )
}
