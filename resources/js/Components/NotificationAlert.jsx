import { Alert } from "@material-tailwind/react";
import { forwardRef, useImperativeHandle, useState } from "react";

/**
 * JSX Component for displaying selected images in a fullscreen Modal
 * @param {object} props
 * @param {string} props.defaultColor
 * @param {int} props.defaultShowTime
 * @param {string} props.className
 * @param {object} props.animate
 * @param {Function} props.onClose
 * @param {object} ref - ref object for alert from parent component
 *
 * @returns
 */
function NotificationAlert(props, ref) {
    const defaultColor = props.defaultColor || "green";
    const defaultShowTime = props.defaultShowTime || 1000;

    const [alert, setAlert] = useState({
        open: false,
        color: defaultColor,
        message: "asd",
    });

    /**
     * @param {string} message
     * @param {string} bgColor - tailwindcss bg- class
     * @param {string} textColor - tailwindcss text- class
     */
    const show = (
        message,
        color = null,
        showTime = null
    ) => {
        setAlert({
            open: true,
            color: color || defaultColor,
            message,
        });

        setTimeout(() => {
            setAlert({
                open: false,
                color: defaultColor,
                message: "",
            });
        }, showTime || defaultShowTime);
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    return (
        <Alert
            open={alert.open}
            onClose={props.onClose}
            color={alert.color}
            className={props.className}
            animate={
                props.animate || {
                    mount: { opacity: 1, y: 0 },
                    unmount: { opacity: 0, y: 0 },
                }
            }
        >
            Lorem ipsum dolor sit.
            {alert.message}
        </Alert>
    );
}

export default forwardRef(NotificationAlert);
