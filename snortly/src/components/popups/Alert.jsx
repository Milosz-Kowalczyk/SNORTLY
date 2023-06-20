import React, { useState, useEffect } from 'react';
import classes from './Alert.module.scss';

const Alert = ({ message, clearVariableState }) => {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        let timeout;

        if (visible) {
            timeout = setTimeout(() => {
                setHiding(true);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [visible]);

    const handleAlertClose = () => {
        setHiding(true);
        clearVariableStateIfPassed()
    };

    const handleAnimationEnd = () => {
        if (hiding) {
            setVisible(false);
            setHiding(false);
            clearVariableStateIfPassed()
        }
    };


    // IF we have some state variable from other component, we can clear it so when user do the same, it will work fine!
    const clearVariableStateIfPassed = () => {
        if (clearVariableState) {
            clearVariableState(null)
        }
    }

    return (
        <>
            {visible && (
                <div
                    className={`${classes.Alert} ${hiding ? classes.hide : classes.show}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <i onClick={handleAlertClose} className="fa-regular fa-circle-xmark hoverScale"></i>
                    <p> {message} </p>
                </div>
            )}
        </>
    );
};

export default Alert;
