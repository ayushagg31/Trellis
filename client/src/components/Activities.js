import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import AddItem from './AddItem'
import { fetchActivitiesFromBoard } from '../actions/actionCreators/boardActions'
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

export default function Activities({ board }) {
  const classes = useStyles()
  // eslint-disable-next-line
  const [dt, setDt] = useState(new Date().toLocaleString())
  const { activities, activityCount } = useSelector((state) => state.activities)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.user)

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 60000)
    return () => clearInterval(secTimer)
  }, [])

  const loadMoreActivities = () => {
    const lastActivity = activities[activities.length - 1]
    dispatch(fetchActivitiesFromBoard(board.id, token, lastActivity._id, 10))
  }

  return (
    <div className={classes.wrapper}>
      {activities.map((activity) => {
        const date = new Date(activity.createdAt)
        const str = moment(date).fromNow()
        /* eslint-disable-next-line  */
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
      {activities.length < activityCount && (
        <AddItem
          btnText="Load more"
          handleClick={() => loadMoreActivities()}
          type="background"
          width="310px"
        />
      )}
    </div>
  )
}
