import { ContextActions } from "../../context/actionsContext";
import { ContextPopups } from "../../context/popupsContext";

// Styles for this component are taken from HomePage module (Because they are related)
import classes from "../../styles/HomePage.module.scss";

import React, { Fragment, useContext } from 'react'

function CategoriesPanel() {

    const { showSidePanels } = useContext(ContextActions)
    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)

    // Data for categories 
    const DUMMY_CATEGORIES = [
        {
            fontAwesomeIcon: 'fa-solid fa-code',
            categoryTitle: 'Programming'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-masks-theater',
            categoryTitle: 'Humor'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-face-laugh-squint',
            categoryTitle: 'Funny'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-gamepad',
            categoryTitle: 'Gaming'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-car-rear',
            categoryTitle: 'Cars'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-newspaper',
            categoryTitle: 'Latest News'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-bomb',
            categoryTitle: 'WTF'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-motorcycle',
            categoryTitle: 'Motor'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-circle-question',
            categoryTitle: 'Ask'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-dice',
            categoryTitle: 'Random'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-gem',
            categoryTitle: 'Memes'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-paw',
            categoryTitle: 'Animals'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-rocket',
            categoryTitle: 'Science'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-comments',
            categoryTitle: 'Comic'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-volleyball',
            categoryTitle: 'Sport'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-dumbbell',
            categoryTitle: 'Gym'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-face-grin-hearts',
            categoryTitle: 'Wholesome'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-utensils',
            categoryTitle: 'Food'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-martini-glass-citrus',
            categoryTitle: 'Drink'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-tv',
            categoryTitle: 'Movies & TV'
        },
        {
            fontAwesomeIcon: 'fa-brands fa-bitcoin',
            categoryTitle: 'Crypto'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-virus-covid',
            categoryTitle: 'Covid-19'
        },
        {
            fontAwesomeIcon: 'fa-regular fa-star',
            categoryTitle: 'Celebrities'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-mars',
            categoryTitle: 'Men'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-venus',
            categoryTitle: 'Women'
        },
        {
            fontAwesomeIcon: 'fa-solid fa-coins',
            categoryTitle: 'Economy & business'
        },




    ]

    // When user clicks on signin button on 'Hey you' container
    function handleSingupButtonClick() {
        setCurrentPopup("SIGNIN_FORM")
        setShowPopup(true);
    }

    return (
        <Fragment>
            {/* Left side Panel - Categories / Hey You Box  */}
            < div style={{ visibility: showSidePanels ? "visible" : "hidden" }
            } className={classes.ContainerWrapper + ' ' + classes.LeftContainerWrapper} >

                <div className={classes.leftSideContainer}>

                    {/* Hello You box (When user is not logged in) */}
                    <div className={classes.HeyYouBox}>
                        <h2 className="h1Text"> Hello You </h2>
                        <p className="p3Text text-center"> Sign up now to see more content! </p>

                        <button onClick={handleSingupButtonClick} className='button btnPurple'>
                            Sign up
                        </button>
                    </div>

                    {/* Categories  */}
                    <div className={classes.CategoriesBox}>
                        <h2 className="h3Text"> Categories </h2>

                        {/* Display all categories here  */}
                        {
                            DUMMY_CATEGORIES.map((ele, idx) => {
                                return (
                                    <div key={`category-${idx}`} className={classes.CategoryBox} >
                                        <div className={classes.CategoryBoxIconContainer}> <i className={ele.fontAwesomeIcon}></i> </div>
                                        <p className="p4Text"> {ele.categoryTitle} </p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div >
        </Fragment>
    )
}

export default CategoriesPanel