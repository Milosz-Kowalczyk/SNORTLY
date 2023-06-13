import React, { Fragment, useContext } from 'react'
import { ContextActions } from '../../context/actionsContext'

// Styles for this component are taken from HomePage module (Because they are related)
import classes from "../../styles/HomePage.module.scss"


function AdsPanel() {

    const { showSidePanels } = useContext(ContextActions)

    return (
        <Fragment>
            <div style={{ visibility: showSidePanels ? "visible" : "hidden" }} className={classes.ContainerWrapper + ' ' + classes.RightContainerWrapper}>

                <div className={classes.rightSideContainer}>

                    {/* We call it AdBox but it might change later ..  */}
                    <div className={classes.AdBox}>
                        <div className={classes.AdBoxTitleContainer}>
                            <h2 className="h3Text"> Hottest meme </h2>
                        </div>

                        {/* We do it also even tho we make this container visibility hidden because img will be hidden with delay
                            To prevent this, we need to add this check also
                        */}
                        {showSidePanels &&
                            <div className={classes.AdBoxImageContainer}>
                                <img src="https://miro.medium.com/v2/resize:fit:1400/0*z1mm6izqSeDiKukb" alt="" loading="lazy" />
                            </div>
                        }
                    </div>

                    <div className={classes.AdBox}>
                        <div className={classes.AdBoxTitleContainer}>
                            <h2 className="h3Text"> Meme of the week </h2>
                        </div>

                        {showSidePanels &&
                            <div className={classes.AdBoxImageContainer}>
                                <img src="https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be7eedf8e1f31aabcec_BwENfmI0CU5dZGYlSyo142mpfG08-rYgTS-Qm47uMUXN6JXtmdZvtzVzTooUQdXTWmTD8uzF9N6XQJA2vUIMi53tunFyVtvOBJTNfOjHit2P_JkTmFzFsK7ep6Vb9781XZnRAryH.png" alt="" />
                            </div>
                        }
                    </div>


                </div>
            </div>
        </Fragment>
    )
}

export default AdsPanel