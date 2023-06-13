import React, { Fragment } from 'react'
import classes from "../../styles/HomePage.module.scss";

function PopularTags() {

    const DUMMY_POPULAR_TAGS = ['Humor', 'WTF', 'Covid-19', 'Food', 'Drink', 'Economy & business', 'Crypto'];


    return (
        <Fragment>

            {/* Here we display popular tags  */}
            <div className={classes.middleSidePopularTagsContainer}>
                <h2 className="h3Text"> Popular tags right now </h2>
                <div className={classes.PopularTagsBox}>
                    {
                        DUMMY_POPULAR_TAGS.map((ele, idx) => (
                            <button className="btnPurple" key={`popular-tag-${ele}-${idx}`}>
                                {ele}
                            </button>
                        ))
                    }
                </div>
            </div>

        </Fragment>
    )
}

export default PopularTags