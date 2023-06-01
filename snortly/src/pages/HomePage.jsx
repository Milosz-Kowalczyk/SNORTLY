import React, { useContext } from 'react';

import '../styles/globals.scss';
import classes from '../styles/HomePage.module.scss';
import { ContextPopups } from '../context/popupsContext';

function HomePage() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)

    // When user clicks on signin button on 'Hey you' container
    function handleSingupButtonClick() {
        setCurrentPopup("SIGNIN_FORM")
        setShowPopup(true);
    }

    return (

        // <Layout>

        <div className={'container ' + classes.mainContainer}>

            <div className={classes.leftSideContainer + ' ' + classes.sideContainer}>

                {/* Hello you box  */}
                <div className={classes.HeyYouBox}>
                    <h2 className={classes.HeyYouBoxTitle}> Hello You </h2>
                    <p className={classes.HeyYouBoxText}> Sign up now to see more content! </p>

                    <button onClick={handleSingupButtonClick} className='button btnPurple'>
                        Sign up
                    </button>
                </div>
            </div>

            <div className={classes.middleSideContainer + ' ' + classes.sideContainer}>
                aaqq
            </div>

            {/* We treat adBox as place to show best memes and also ads :)  */}
            <div className={classes.rightSideContainer + ' ' + classes.sideContainer}>
                <div className={classes.AdBox}>
                    <div className={classes.AdBoxTitleContainer}>
                        <h2 className={classes.AdBoxTitle}> Hottest meme </h2>
                    </div>

                    <div className={classes.AdBoxImageContainer}>
                        <img src="https://miro.medium.com/v2/resize:fit:1400/0*z1mm6izqSeDiKukb" alt="" />
                    </div>
                </div>

                <div className={classes.AdBox}>
                    <div className={classes.AdBoxTitleContainer}>
                        <h2 className={classes.AdBoxTitle}> Meme of the week </h2>
                    </div>

                    <div className={classes.AdBoxImageContainer}>
                        <img src="https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be7eedf8e1f31aabcec_BwENfmI0CU5dZGYlSyo142mpfG08-rYgTS-Qm47uMUXN6JXtmdZvtzVzTooUQdXTWmTD8uzF9N6XQJA2vUIMi53tunFyVtvOBJTNfOjHit2P_JkTmFzFsK7ep6Vb9781XZnRAryH.png" alt="" />
                    </div>
                </div>
            </div>

        </div>

        // </Layout>

    )
}

export default HomePage