import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAllBoards,
    createNewBoard,
} from "../actions/actionCreators/boardActions";
import { createNewActivity } from "../actions/actionCreators/activityActions";
import { makeStyles, InputBase, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

const imageUrls = {
    thumb:
        "https://images.unsplash.com/photo-1433477155337-9aea4e790195?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
    full:
        "https://images.unsplash.com/photo-1433477155337-9aea4e790195?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
};
const useStyles = makeStyles((theme) => ({
    card: {
        height: "90px",
        "@media only screen and (min-device-width:2560px)": {
            fontSize: "20px",
            height: "7.5em",
        },
        width: "12.8%",
        "@media (max-width: 768px)": {
            width: "20.8%",
        },
        "@media (max-width: 430px)": {
            width: "40.8%",
        },
        margin: theme.spacing(1),
        borderRadius: theme.spacing(0.7),
        "&:hover": {
            opacity: 0.7,
            cursor: "pointer",
        },
        position: "relative",
        paddingRight: "5px",
    },
    newBoardText: {
        textAlign: "center",
        margin: "auto",
        "@media only screen and (min-device-width: 2560px)": {
            fontSize: "24px",
        },
    },
    menuContainer: {
        margin: "auto",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",

        marginBottom: "100px",
        "@media only screen and (max-device-width:425px)": {
            marginLeft: 0,
            alignItems: "center",
            justifyContent: "center",
        },
    },
    title: {
        position: "absolute",
        top: theme.spacing(0),
        left: theme.spacing(0),
        width: "90%",
        wordWrap: "break-word",
        overflow: "hidden",
        lineHeight: "1.5em",
        height: "3em",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px gray",
        paddingLeft: theme.spacing(1),
    },
    allBoards: {
        paddingTop: "80px",
        display: "flex",
        marginLeft: theme.spacing(25),
        marginRight: theme.spacing(25),
        "@media only screen and (min-device-width : 768px) and (max-device-width : 1024px)": {
            marginLeft: theme.spacing(10),
            marginRight: theme.spacing(10),
        },
        "@media (max-width: 768px)": {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
        },
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
}));

export default function Boards() {
    const classes = useStyles();
    const [boardTitle, setBoardTitle] = useState("");
    const { boards, newBoard } = useSelector((state) => state.boards);
    const { token, isValid, user, tokenRequest } = useSelector(
        (state) => state.user
    );
    const [showInput, setShowInput] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Home | Trellis`;
    }, []);

    useEffect(() => {
        if (isValid) {
            dispatch(fetchAllBoards(token));
        }
    }, [token, isValid, dispatch]);

    const handleChange = (e) => {
        e.preventDefault();
        setBoardTitle(e.target.value);
    };

    useEffect(() => {
        if (newBoard) {
            dispatch(
                createNewActivity(
                    {
                        text: `${user.username} created this board`,
                        boardId: newBoard._id,
                    },
                    token
                )
            );
        }
    }, [newBoard, dispatch, token, user]);

    const submitHandler = () => {
        if (boardTitle === "") return;

        const postBoardReq = {
            name: boardTitle,
            userId: user.id,
            image: {
                color: "white",
                thumb: imageUrls.thumb,
                full: imageUrls.full,
            },
        };
        dispatch(createNewBoard(postBoardReq));
        setBoardTitle("");
        setShowInput(false);
    };

    return (
        <>
            {isValid || tokenRequest ? (
                <div style={{ backgroundColor: "#FAFBFC" }}>
                    <Header loggedIn />
                    <div className={classes.allBoards}>
                        <div className={classes.menuContainer}>
                            {boards.map((board) => {
                                return (
                                    <div
                                        className={classes.card}
                                        key={board._id}
                                        style={{
                                            backgroundColor: `${board.image.color}`,
                                            backgroundImage: `url(${board.image.thumb})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // window.location.href = `/b/${board._id}/${board.name}`
                                            history.push(
                                                `/b/${board._id}/${board.name}`
                                            );
                                        }}
                                    >
                                        <div className={classes.title}>
                                            {board.name}
                                        </div>
                                    </div>
                                );
                            })}

                            <div
                                className={classes.card}
                                style={{ backgroundColor: "#E7E9ED" }}
                                onClick={() => setShowInput((prev) => !prev)}
                            >
                                <div
                                    style={{
                                        fontSize: "14px",
                                        opacity: 0.8,
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        fontWeight: "500",
                                    }}
                                >
                                    <p className={classes.newBoardText}>
                                        Create new board
                                    </p>
                                </div>
                            </div>
                            {showInput ? (
                                <div className={classes.backdrop}>
                                    <div
                                        style={{
                                            width: "260px",
                                            marginLeft: "45%",
                                            marginTop: "10%",
                                            height: "100px",
                                            borderRadius: 5,
                                            zIndex: 50,
                                            backgroundColor: "white",
                                            backgroundImage: `url(${imageUrls.full})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        <InputBase
                                            autoFocus
                                            // multiline
                                            fullWidth
                                            value={boardTitle}
                                            onChange={handleChange}
                                            onBlur={() => {
                                                submitHandler();
                                                setShowInput(false);
                                                setBoardTitle("");
                                            }}
                                            placeholder="Add board title..."
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                width: "240px",
                                                margin: "10px",
                                                padding: "2px",
                                                paddingLeft: "10px",
                                                borderRadius: 5,
                                                backgroundColor:
                                                    "hsla(0,0%,100%,.24)",
                                                zIndex: 200,
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: "#61BD4F",
                                                textTransform: "none",
                                                color: "#F2FAF1",
                                                padding: "0.65px",
                                                marginLeft: "20px",
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
}
