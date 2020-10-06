import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/actionCreators/userActions";
import AddItem from "./AddItem";
import { FullscreenExit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(0.3, 0.3, 0.3, 0.3),
        marginBottom: theme.spacing(1),
        backgroundColor: (props) =>
            props.loggedIn ? "hsla(0,0%,100%,.24)" : "rgba(0,0,0,.32)",
        color: "black",
        fontWeight: "bold",
        fontSize: "23px",
        textAlign: "center",
        fontFamily: "Pacifico",
        top: "0",
        position: "relative",
        width: "100%",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "2.4em",

        "@media only screen and (min-device-width: 2560px)": {
            fontSize: "36px",
        },
    },
    trellis: {
        color: "black",
        textShadow: "2px 2px white",
        zIndex: 100,
        opacity: 0.7,
        color: "black",
        display: "inline-block",
        "&:hover": {
            opacity: 1,
            cursor: "pointer",
        },
    },
    username: {
        textShadow: "2px 2px white",
        fontFamily: "Pacifico",
        zIndex: 500,
        overflowX: "hidden",
        overflowY: "hidden",
        fontWeight: "bold",
        color: "black",
        textAlign: "right",
        textShadow: "2px 2px white",
        margin: "auto",
        fontSize: "20px",
        "@media (max-width: 768px)": {
            display: "none",
        },
        "@media only screen and (min-device-width: 2560px)": {
            fontSize: "36px",
        },
    },
    headerNavigation: {
        height: "100%",
        width: "20%",
        display: "flex",
        position: "absolute",
        right: "0.8em",
    },
    logoutBtn: {
        color: "#ffffff",
        backgroundColor: "hsla(0,0%,100%,.24)",
        borderRadius: "5px",
        fontWeight: "bold",
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        textShadow: "2px 2px black",
        transition: "0.2s ease-in-out",
        fontSize: "12px",

        "&:hover": {
            transition: "0.2s ease-in-out",
            backgroundColor: "rgba(9,30,66,.08)",
        },

        "@media only screen and (max-device-width: 425px)": {
            fontSize: "10px",
        },

        "@media only screen and (min-device-width: 2560px)": {
            fontSize: "24px",
        },
    },
}));

export default function Header({ loggedIn, btnText, path, icon }) {
    const classes = useStyles();
    const { user } = useSelector((state) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <>
            <div className={classes.header}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className={classes.trellis}>Trellis</div>
                </Link>
                {loggedIn ? (
                    <div className={classes.headerNavigation}>
                        <p className={classes.username}>{user.username}</p>
                        <div className={classes.logoutBtn}>
                            <Button
                                className={classes.logoutBtn}
                                onClick={() => {
                                    dispatch(logoutUser());
                                    localStorage.setItem("auth-token", "");
                                    history.push("/");
                                }}
                            >
                                <ExitToAppIcon fontSize="small" /> Logout
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
            {!loggedIn ? (
                <div
                    style={{ display: "flex", float: "right", margin: "10px" }}
                >
                    <div
                        style={{
                            marginTop: "-5px",
                            zIndex: 200,
                            marginLeft: "10px",
                        }}
                    >
                        <AddItem
                            btnText={btnText}
                            type="menu"
                            icon={icon}
                            width="85px"
                            color="white"
                            handleClick={() => {
                                history.push(`${path}`);
                            }}
                            noshadow
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}
