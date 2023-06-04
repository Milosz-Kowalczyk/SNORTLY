import React, { useContext, useEffect, useRef, useState } from 'react';

import '../styles/globals.scss';
import classes from '../styles/HomePage.module.scss';
import { ContextPopups } from '../context/popupsContext';
import { convertDateToDayAndMonth, convertDateToDayMonthYear, extractHourAndMinutes, getDaysDifference, isInCurrentYear } from '../utils/dateFormatHelper';


function DisplayFormatedDate({ dateDifference, postCreationDate }) {
    /*
    Here is our global function that displays date on comments, post etc. in every situation

    dateDifference: int, number of difference between today and creationDate 
    postCreationDate: String date in format: dd-mm-yyyy

    We want to:
        - Display 1d, 2d if post is max one week old
        - Display 01.02 (dd.mm) if post is in current year and is above week old
        - Display 01.02.2023 if post is not in current year 
    */

    let isDateInCurrentYear = isInCurrentYear(postCreationDate);

    // - Display 14:30 HH:mm format if post is from today
    if (parseInt(dateDifference) === 0) {
        return <span className={classes.PostDate}>{extractHourAndMinutes(postCreationDate)}</span>;
    }
    // - Display 1d, 2d if post is max one week old
    else if (parseInt(dateDifference) < 8) {
        return <span className={classes.PostDate}>{dateDifference}d</span>;
    }

    // - Display 01.02(dd.mm) if post is in current year and is above week old
    else if (parseInt(dateDifference) > 7 && isDateInCurrentYear) {
        return <span className={classes.PostDate}>{convertDateToDayAndMonth(postCreationDate)}</span>;
    }

    // - Display 01.02.2023 if post is not in current year 
    else if (!isDateInCurrentYear) {
        return <span className={classes.PostDate}>{convertDateToDayMonthYear(postCreationDate)}</span>;
    }

    console.log(dateDifference, postCreationDate);

    return <span className={classes.PostDate}>{dateDifference}d</span>;
}

function DisplayImageWithHeightCheckup({ imageSrc }) {

    /*
    This function runs when post image loads, checks for its height and decides whether we want to 
    add expand button or not
    */

    const imageRef = useRef(null);
    const MAX_IMAGE_HEIGHT = 1000;

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [wasImageExpandedOnce, setWasImageExpandedOnce] = useState(false);


    // Use Effect to change state with image will actually load and then we want to 
    // Run again, to add expand button if neccesasary
    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            setIsImageLoaded(true);
        }
    }, []);

    function handleExpandImageClick() {
        setIsExpanded(!isExpanded);
        setWasImageExpandedOnce(true);
    }

    if (isImageLoaded) {
        const imageHeight = imageRef.current.clientHeight;

        // If image is below MAX_IMAGE_HEIGHT, display normally 
        if (imageHeight < MAX_IMAGE_HEIGHT) {
            return (
                <div className={classes.PostImageContainer}>
                    <img ref={imageRef} src={imageSrc} alt="" />
                </div>
            );
        }
        // If image is higher than MAX_IMAHE_HEIGHT, display image with expand button 
        else if (imageHeight > MAX_IMAGE_HEIGHT) {
            return (
                <>
                    <div
                        className={
                            (!isExpanded)
                                ? classes.PostImageContainerNotExpanded
                                : classes.PostImageContainerExpanded
                        }
                    >
                        <img ref={imageRef} src={imageSrc} alt="" />
                    </div>

                    {!isExpanded &&
                        <div className={classes.PostImageExpandContainer}>
                            <button onClick={handleExpandImageClick} className={"btnPurple"}>
                                Expand image
                            </button>
                        </div>

                        // Here you can decide, if we want to display 'hide image' button 
                        // By default, i think it is better to not show it, so when user clicks it
                        // it will expand image and thats it

                        // :
                        // <div className={classes.PostImageExpandContainer}>
                        //     <button onClick={handleExpandImageClick} className={"btnPurple"}>
                        //         Hide image
                        //     </button>
                        // </div>
                    }
                </>
            );
        }
        // This is neccessary, because when we click hide and show once, we get image height at 1000 
        // which will return normal image without expand button, so this is our helper
        // to display expand button 
        else if (wasImageExpandedOnce) {
            return (
                <>
                    <div
                        className={
                            !isExpanded
                                ? classes.PostImageContainerNotExpanded
                                : classes.PostImageContainerExpanded
                        }
                    >
                        <img ref={imageRef} src={imageSrc} alt="" />
                    </div>

                    {!isExpanded ? (
                        <div className={classes.PostImageExpandContainer}>
                            <button onClick={handleExpandImageClick} className={"btnPurple"}>
                                Expand image
                            </button>
                        </div>
                    ) : (
                        <div className={classes.PostImageExpandContainer}>
                            <button onClick={handleExpandImageClick} className={"btnPurple"}>
                                Hide image
                            </button>
                        </div>
                    )}
                </>
            );
        }
    }

    return (
        <div className={classes.PostImageContainer}>
            <img ref={imageRef} src={imageSrc} alt="" onLoad={() => setIsImageLoaded(true)} />
        </div>
    );
}


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

    // Data for posts 
    const DUMMY_DATA =
        [
            {
                postOwner: 'Theboy271',
                postId: '21',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
                postCreationDate: '2023-06-04 14:30:00',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '10421',
                postDislikes: '102',
                postComments: '52',
                postTags: ['Programming', 'Funny', 'Breaking news'],
                postImage: 'https://miro.medium.com/v2/resize:fit:439/1*ZYyXvhYDGvELzYoXYpPLMg.png'
            },
            {
                postOwner: 'MyMan',
                postId: '212',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/3284/3284735.png',
                postCreationDate: '2023-06-04 15:30:00',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '212',
                postDislikes: '12',
                postComments: '1',
                postTags: ['Breaking news'],
                postImage: 'https://pbs.twimg.com/media/Enm7QC7XYAEO-4L.jpg'
            },
            {
                postOwner: 'MyMan1212',
                postId: '2221',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/3284/3284735.png',
                postCreationDate: '2023-06-04 16:30:00',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '212',
                postDislikes: '12',
                postComments: '1',
                postTags: ['Sport'],
                postImage: 'https://i.imgflip.com/6ywwha.jpg'
            },
            {
                postOwner: 'MyNig1',
                postId: '41',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/924/924915.png',
                postCreationDate: '2023-05-01 13:52:12',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '5201',
                postDislikes: '421',
                postComments: '11',
                postTags: ['Programming', 'WTF'],
                postImage: 'https://preview.redd.it/ptsqu8ii7po81.png?auto=webp&s=2d7078e7444fd01d2bb78714e7c1e1c59736904f'
            },
            {
                postOwner: 'MyNig1',
                postId: '42',
                postOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/924/924915.png',
                postCreationDate: '2021-05-01 14:20:11',
                postTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                postLikes: '2341',
                postDislikes: '2311',
                postComments: '9812',
                postTags: ['News', 'WTF'],
                postImage: 'https://i.pinimg.com/736x/4f/d7/6f/4fd76ff09d0dd0a629c12248aa624eca.jpg'
            },

        ]

    const DUMMY_POPULAR_TAGS = ['Humor', 'WTF', 'Covid-19', 'Food', 'Drink', 'Economy & business', 'Crypto'];

    // When user clicks on signin button on 'Hey you' container
    function handleSingupButtonClick() {
        setCurrentPopup("SIGNIN_FORM")
        setShowPopup(true);
    }

    return (

        <div className={'container ' + classes.mainContainer}>

            {/* Hello You box  */}
            {/* Categories  */}
            <div className={classes.ContainerWrapper + ' ' + classes.LeftContainerWrapper}>
                <div className={classes.leftSideContainer}>

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
                                        <div className={classes.CategoryBoxIconContainer}> <i className={ele.fontAwesomeIcon}></i> </div>
                                        <p className={classes.CategoryTitle}> {ele.categoryTitle} </p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>



            {/* Here, we display memes (middle section ) */}
            <div className={classes.ContainerWrapper + ' ' + classes.MiddleContainerWrapper}>

                <div className={classes.middleSideContainer}>

                    {/* Here we display popular tags  */}
                    <div className={classes.middleSidePopularTagsContainer}>
                        <h2 className={classes.PopularTagsTitle}> Popular tags right now </h2>
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

                    {
                        DUMMY_DATA.map((ele, idx) => {
                            let dateDifference = getDaysDifference(ele.postCreationDate);

                            return (
                                <div key={`meme-${idx}-${ele.postId}`} className={classes.PostContainer}>



                                    {/* Post Info, Date + Username  */}
                                    <div className={classes.PostInfoContainer}>
                                        <img className={classes.PostOwnerAvatar} src={ele.postOwnerAvatar} alt="" />
                                        <h2 className={classes.PostOwner}> {ele.postOwner} </h2>

                                        {/* Display post creation date with correct format */}
                                        <DisplayFormatedDate dateDifference={dateDifference} postCreationDate={ele.postCreationDate} />

                                    </div>



                                    {/* Post title  */}
                                    <div className={classes.PostTitleContainer}>
                                        <h2 className={classes.PostTitle}> {ele.postTitle} </h2>
                                    </div>



                                    {/* Display tags  */}
                                    <div className={classes.PostTagsContainer}>
                                        {
                                            ele.postTags.map((ele, idx) => {
                                                return (
                                                    <button key={`tag-${idx}-${ele}`} className={classes.PostTag}>
                                                        {ele}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>


                                    {/* Post image  */}
                                    {/* Here we also check if image is not too big in height */}
                                    {/* if so, we add box that says 'Extend image or something' */}

                                    <DisplayImageWithHeightCheckup imageSrc={ele.postImage} />



                                    {/* Post reactions, likes, dislikes and comments  */}
                                    <div className={classes.PostReactionsContainer}>
                                        <button className={classes.reactionButton + ' ' + classes.reactionButtonLike}> <i className="fa-solid fa-thumbs-up"></i> {ele.postLikes} </button>
                                        <button className={classes.reactionButton + ' ' + classes.reactionButtonDislike}> <i className="fa-solid fa-thumbs-down"></i> {ele.postDislikes} </button>
                                        <button className={classes.reactionButton + ' ' + classes.reactionButtonComment}> <i className="fa-solid fa-comments"></i> {ele.postComments} </button>
                                    </div>

                                    {/* <div className={classes.PostEnd}>
                                    <hr className={classes.PostEndHr} />
                                </div> */}

                                </div>

                            )
                        })
                    }

                </div>
            </div>




            {/* We treat adBox as place to show best memes and also ads :)  */}
            <div className={classes.ContainerWrapper + ' ' + classes.RightContainerWrapper}>
                <div className={classes.rightSideContainer}>
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

        </div>

    )
}

export default HomePage