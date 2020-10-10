import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  wrapper: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginBottom: theme.spacing(32),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  text: {
    fontSize: '15px',
  },
  timestamp: {
    fontSize: '10px',
    marginTop: theme.spacing(0.5),
    color: '#637187',
  },
}))

export default function Activities() {
  const classes = useStyles()
  // eslint-disable-next-line
  const [dt, setDt] = useState(new Date().toLocaleString())
  const { activities } = useSelector((state) => state.activities)

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 60000)
    return () => clearInterval(secTimer)
  }, [])

  return (
    <div className={classes.wrapper}>
      {activities.map((intialActivity, index) => {
        const activity = activities[activities.length - 1 - index]
        const date = new Date(activity.createdAt)
        const str = moment(date).fromNow()
        var timestampString
        const userName = activity.text.split(' ')[0]
        const activityText = activity.text.replace(userName, '')
        if (
          str.includes('second') ||
          str.includes('minute') ||
          str.includes('hour')
        )
          timestampString = str
        else if (
          str.includes('day') &&
          (str.split(' ')[0] === 'a' || str.split(' ')[0] < 7)
        ) {
          if (str === 'a day ago') {
            const timeString = moment()
              .subtract(1, 'days')
              .calendar()
              .split(' at ')[0]
            timestampString = `${timeString} at ${moment(date).format('LT')}`
          } else {
            const timeString = moment()
              .subtract(str.split(' ')[0], 'days')
              .calendar()
              .split(' at ')[0]
            timestampString = `${timeString} at ${moment(date).format('LT')}`
          }
        } else timestampString = moment(date).format('LLL')
        return (
          <div key={activity._id} className={classes.text}>
            <strong>{userName}</strong>
            {activityText}
            <p className={classes.timestamp}>{timestampString}</p>
          </div>
        )
      })}
    </div>
  )
}
