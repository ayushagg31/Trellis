import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    clickable: {
        "&:hover": {
            opacity: 1.5,
            color: "black",
        },
        textDecoration: "none",
        marginLeft: "5px",
        color: "blue",
        fontWeight: "bold",
        opacity: 0.5,
    },
    footer: {
        zIndex: "3000",
        position: "fixed",
        width: "100%",
        bottom: 0,
        height: "2em",
        backgroundColor: "#adadad",
        textAlign: "center",
        fontWeight: "bold",
        paddingTop: "10px",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Helvetica",
        "@media only screen and (max-device-width: 425px)": {
            fontSize: "10px",
        },
        "@media only screen and (min-device-width: 2560px)": {
            fontSize: "28px",
        },
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div style={{ paddingLeft: "10px", color: "#414141" }}>
                Developed by -
                <a
                    href="https://ayushaggarwal.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.clickable}
                >
                    {" "}
                    Ayush Aggarwal
                </a>
            </div>
            <div
                style={{
                    paddingRight: "10px",
                    marginRight: "20px",
                    color: "#414141",
                    alignItems: "center",
                }}
            >
                Github Repo -
                <a
                    href="https://github.com/ayushagg31/Trellis"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.clickable}
                >
                    {" "}
                    Trellis{" "}
                </a>
            </div>
        </div>
    );
}
