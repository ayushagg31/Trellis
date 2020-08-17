import React, { useState, useEffect } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import Hr from './Hr'
import MenuHeader from './MenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages } from '../actions/actionCreators/imageActions'
import { updateBoardById } from '../actions/actionCreators/boardActions'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#EBECF0',
        width: '321px',
        float: 'right',
        height: '100vh',
        right: theme.spacing(0),
        top: theme.spacing(5.63),
        borderRadius: theme.spacing(0),
        position: 'fixed',
        padding: theme.spacing(1),
        zIndex: '1200',
    },
    card: {
        height: '90px',
        width: '45%',
        margin: theme.spacing(0.7),
        borderRadius: theme.spacing(1),
        '&:hover': {
            opacity: 0.7,
            cursor: 'pointer'
        }
    },
    menuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}))

const colors = ['rgb(0, 121, 191)', 'rgb(210, 144, 52)', 'rgb(81, 152, 57)', 'rgb(176, 70, 50)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)', 'rgb(75, 191, 107)', 'rgb(0, 174, 204)', 'rgb(131, 140, 145)']
export default function Background({ closeHandler, setColorBackground }) {
    const classes = useStyles()
    const [showColor, setShowColor] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const { images } = useSelector(state => state.images)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch])
    return (
        <Paper className={classes.container}>
            <MenuHeader text='Change Background' closeHandler={closeHandler} />
            <Hr />
            <div className={classes.menuContainer} >
                <div className={classes.card}
                    style={{
                        backgroundImage: `url('https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.48948499e309aef794d7.jpg')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                    onClick={() => {
                        setShowColor(false)
                        setShowImage(true)
                    }} />
                <div className={classes.card}
                    style={{
                        backgroundImage: `url('https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                    onClick={() => {
                        setShowColor(true)
                        setShowImage(false)
                    }} />
            </div>
            {showColor &&
                <div className={classes.menuContainer}>
                    {colors.map(color => {
                        return (<div className={classes.card}
                            key={color}
                            style={{ backgroundColor: color }}
                            onClick={setColorBackground.bind(null, color)}
                        />)
                    })}
                </div>
            }
            {showImage &&
                <div className={classes.menuContainer}>
                    {images.map((image, index) => {
                        return (<div className={classes.card}
                            key={index}
                            style={{ backgroundImage: `url(${image.thumb})`, positon: 'relative' }}
                            onClick={setColorBackground.bind(null, image)}
                        >
                            <span style={{
                                position: 'absolute',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                width: '100px',
                                marginTop: '68px',
                                marginRight: '10px',
                                textDecoration: 'underline',
                                lineHeight: '1.5em',
                                height: '1.5em',
                            }}>
                                <a style={{ display: 'block', textDecoration: 'none', color: 'white' }}
                                    href={image.user.link} target='blank'>{image.user.username}</a>

                            </span>
                        </div>)
                    })}
                </div>}
        </Paper >
    )
}
