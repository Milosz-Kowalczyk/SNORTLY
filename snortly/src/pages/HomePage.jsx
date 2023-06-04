import React, { useContext } from 'react';

import '../styles/globals.scss';
import classes from '../styles/HomePage.module.scss';
import { ContextPopups } from '../context/popupsContext';
import { convertDateToDayAndMonth, getDaysDifference } from '../utils/helpers';

function HomePage() {

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

    ]

    // Data for posts 
    const DUMMY_DATA =
        [
            {
                postOwner: 'Theboy271',
                postId: '21',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
                postCreationDate: '2023-06-02',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '10421',
                postDislikes: '102',
                postComments: '52',
                postTags: ['Programming', 'Funny', 'Breaking news'],
                postImage: 'https://miro.medium.com/v2/resize:fit:439/1*ZYyXvhYDGvELzYoXYpPLMg.png'
            },
            {
                postOwner: 'MyNig1',
                postId: '41',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/924/924915.png',
                postCreationDate: '2023-05-01',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '5201',
                postDislikes: '421',
                postComments: '11',
                postTags: ['Programming', 'WTF'],
                postImage: 'https://preview.redd.it/ptsqu8ii7po81.png?auto=webp&s=2d7078e7444fd01d2bb78714e7c1e1c59736904f'
            },

        ]



    // When user clicks on signin button on 'Hey you' container
    function handleSingupButtonClick() {
        setCurrentPopup("SIGNIN_FORM")
        setShowPopup(true);
    }

    return (

        // <Layout>

        <div className={'container ' + classes.mainContainer}>

            {/* Hello You box  */}
            {/* Categories  */}
            <div className={classes.leftSideContainer + ' ' + classes.sideContainer}>

                {/* Hello you box  */}
                {/* Left side, also categories are here  */}
                <div className={classes.HeyYouBox}>
                    <h2 className={classes.HeyYouBoxTitle}> Hello You </h2>
                    <p className={classes.HeyYouBoxText}> Sign up now to see more content! </p>

                    <button onClick={handleSingupButtonClick} className='button btnPurple'>
                        Sign up
                    </button>
                </div>

                {/* Categories  */}
                <div className={classes.CategoriesBox}>
                    <h2 className={classes.CategoriesBoxTitle}> Categories </h2>

                    {/* Display all categories here  */}
                    {
                        DUMMY_CATEGORIES.map((ele, idx) => {
                            return (
                                <div key={`category-${idx}`} className={classes.CategoryBox} >
                                    <div className={classes.CategoryBoxIconContainer}> <i class={ele.fontAwesomeIcon}></i> </div>
                                    <p className={classes.CategoryTitle}> {ele.categoryTitle} </p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>




            {/* Here, we display memes (middle section ) */}
            <div className={classes.middleSideContainer + ' ' + classes.sideContainer}>

                {
                    DUMMY_DATA.map((ele, idx) => {
                        let dateDifference = getDaysDifference(ele.postCreationDate);

                        return (
                            <div key={`meme-${idx}-${ele.postId}`} className={classes.PostContainer}>



                                {/* Post Info, Date + Username  */}
                                <div className={classes.PostInfoContainer}>
                                    <img className={classes.PostOwnerAvatar} src={ele.postOwnerAvatar} alt="" />
                                    <h2 className={classes.PostOwner}> {ele.postOwner} </h2>

                                    {(parseInt(dateDifference) > 7)
                                        ?
                                        <span className={classes.PostDate}> {convertDateToDayAndMonth(ele.postCreationDate)}</span>
                                        :
                                        <span className={classes.PostDate}> {dateDifference}d </span>
                                    }

                                </div>



                                {/* Post title  */}
                                <div className={classes.PostTitleContainer}>
                                    <h2 className={classes.PostTitle}> {ele.postTitle} </h2>
                                </div>



                                {/* Display tags  */}
                                <div className={classes.PostTagsContainer}>
                                    {
                                        ele.postTags.map((ele) => {
                                            return (
                                                <button className={classes.PostTag}>
                                                    {ele}
                                                </button>
                                            )
                                        })
                                    }
                                </div>


                                {/* Post image  */}
                                <div className={classes.PostImageContainer}>
                                    <img src={ele.postImage} alt="" />
                                </div>



                                {/* Post reactions, likes, dislikes and comments  */}
                                <div className={classes.PostReactionsContainer}>
                                    <button className={classes.reactionButton + ' ' + classes.reactionButtonLike}> <i class="fa-solid fa-thumbs-up"></i> {ele.postLikes} </button>
                                    <button className={classes.reactionButton + ' ' + classes.reactionButtonDislike}> <i class="fa-solid fa-thumbs-down"></i> {ele.postDislikes} </button>
                                    <button className={classes.reactionButton + ' ' + classes.reactionButtonComment}> <i class="fa-solid fa-comments"></i> {ele.postComments} </button>
                                </div>

                                {/* <div className={classes.PostEnd}>
                                    <hr className={classes.PostEndHr} />
                                </div> */}

                            </div>

                        )
                    })
                }

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