import React, { Fragment, useEffect, useState } from 'react'

// MAIN Styles for this component are taken from HomePage module (Because they are related)
import homePageClasses from "../../styles/HomePage.module.scss"
import { convertDateToDayAndMonth, convertDateToDayMonthYear, extractHourAndMinutes, getDaysDifference, isInCurrentYear } from '../../utils/dateFormatHelper';


// Dropdown component for single Post page
export function DropdownButton() {

    return (
        <div className="dropdown is-hoverable is-right">
            <div className="dropdown-trigger">
                <button className={homePageClasses.reactionButton} aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span> <i className="fa-solid fa-up-right-from-square"></i> Share </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className={`dropdown-content ${homePageClasses.DropDownMenu}`}>
                    <div>
                        <i className="fa-solid fa-link"></i> <p> Copy link </p>
                    </div>
                    <div>
                        <i className="fa-solid fa-download"></i> <p> Download image </p>
                    </div>
                    <div>
                        <i className="fa-solid fa-paper-plane"></i> <p> Email </p>
                    </div>
                    <div>
                        <i className="fa-brands fa-facebook-messenger"></i><p> Messenger </p>
                    </div>
                    <div>
                        <i className="fa-brands fa-square-facebook"></i><p> Facebook </p>
                    </div>
                    <div>
                        <i className="fa-brands fa-square-whatsapp"></i> <p> Whatsapp </p>
                    </div>
                </div>
            </div>
        </div>
    );


}



export function DisplayFormatedDate({ postCreationDate }) {
    /*
    Here is our global function that displays date on comments, post etc. in every situation

    postCreationDate: String date in format: dd-mm-yyyy

    We want to:
        - Display 1d, 2d if post is max one week old
        - Display 01.02 (dd.mm) if post is in current year and is above week old
        - Display 01.02.2023 if post is not in current year 
    */

    let dateDifference = getDaysDifference(postCreationDate);
    let isDateInCurrentYear = isInCurrentYear(postCreationDate);

    // - Display 14:30 HH:mm format if post is from today
    if (parseInt(dateDifference) === 0) {
        return <span className="PostDate">{extractHourAndMinutes(postCreationDate)}</span>;
    }
    // - Display 1d, 2d if post is max one week old
    else if (parseInt(dateDifference) < 8) {
        return <span className="PostDate">{dateDifference}d</span>;
    }

    // - Display 01.02(dd.mm) if post is in current year and is above week old
    else if (parseInt(dateDifference) > 7 && isDateInCurrentYear) {
        return <span className="PostDate">{convertDateToDayAndMonth(postCreationDate)}</span>;
    }

    // - Display 01.02.2023 if post is not in current year 
    else if (!isDateInCurrentYear) {
        return <span className="PostDate">{convertDateToDayMonthYear(postCreationDate)}</span>;
    }

    // console.log(dateDifference, postCreationDate);

    return <span className="PostDate">{dateDifference}d</span>;
}

export function DisplayMaximizedImage({ imgSrc, setImageShow }) {

    // Displays Maximized Image when clicked in single post 

    function handleClickOutsideLoginForm() {
        setImageShow(false);
    }

    function handleImageCloseIcon() {
        setImageShow(false);
    }

    return (
        <div onClick={handleClickOutsideLoginForm} className={homePageClasses.BlurryContainer}>

            <div className={homePageClasses.ContainerWrapper}>

                <div className={homePageClasses.ContainerClose}>
                    {/* // Close window button */}
                    <i onClick={handleImageCloseIcon} className={"fa-solid fa-xmark " + homePageClasses.closeIcon}></i>
                </div>

                <div onClick={(e) => e.stopPropagation()} className={homePageClasses.Container}>

                    <img src={imgSrc} alt="" />

                </div>

                <div className={homePageClasses.ContainerActions}>
                    <div>
                        <button className='myButton btnMildBlack'> <i className="fa-solid fa-link"></i> Copy to clipboard </button>
                        <button className='myButton btnMildBlack'> <i className="fa-solid fa-download"></i> Download image </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DisplayPostImage({ imgSrc, postId = null, isPostClickable = false }) {

    /*
    Displaying image depending on its size, we want to hide image above 1500 px in height
    
    Fixed : Now It wont re render at every scroll, we found better solution that triggers
    only when expand button was clicked, awesome
    */

    const [isExpanded, setIsExpanded] = useState(false);
    const [imageHeight, setImageHeight] = useState(null);
    const MAX_IMAGE_EXPAND_HEIGHT = 1150; // Remeber to match variable in variables.scss
    const MAX_IMAGE_SAFE_DIFFERENCE = 100; // This is for very rare situation where image is like 1159px and we hide it, we dont want that, we want to hide image that is at least 100px+ above Max expand height

    const [imageShow, setImageShow] = useState(false); // This is for showing zoomed image (maximized) on single post page

    useEffect(() => {
        const image = new Image();
        image.src = imgSrc;
        image.onload = () => {
            setImageHeight(image.height);
        };
    }, [imgSrc]);

    const toggleExpandImage = () => {
        setIsExpanded(!isExpanded);
    };

    // When we are on sing post page, we can show image zoomed (or on new page, maybe?)
    const handleImageShow = () => {
        if (postId && isPostClickable === false) {
            setImageShow(true);
        }
    }

    return (
        <Fragment>

            {(imageShow) && <DisplayMaximizedImage imgSrc={imgSrc} setImageShow={setImageShow} />}

            {
                (imageHeight > MAX_IMAGE_EXPAND_HEIGHT + MAX_IMAGE_SAFE_DIFFERENCE)
                    ?
                    // Here we display image that is a bit hidden and we can expand it (button)
                    <Fragment>
                        <div onClick={() => {
                            handleImageShow()
                            handlePostClick(postId, isPostClickable)
                        }
                        } style={isExpanded ? { maxHeight: imageHeight + "px" } : { maxHeight: MAX_IMAGE_EXPAND_HEIGHT + "px" }} className={isExpanded ? homePageClasses.PostImageContainer : homePageClasses.PostImageContainerExpanded}>
                            <img src={imgSrc} alt="" />
                        </div>

                        {
                            (!isExpanded) && <button className={"button btnPurple " + homePageClasses.ExpandImageButton} onClick={toggleExpandImage}> Expand image </button>
                        }

                    </Fragment>
                    :
                    // Normal image here
                    <div onClick={() => {
                        handleImageShow()
                        handlePostClick(postId, isPostClickable)
                    }} className={homePageClasses.PostImageContainer}>
                        <img src={imgSrc} alt="" />
                    </div>
            }
        </Fragment>

    )
}

function handlePostClick(postId, isPostClickable) {
    /*
    When we clicked on post image or title, we want to open post in new page (current or new window)
    
    isPostClickable is boolean helper, so we can make post clickable on homepage but not on singlePostPage
    */

    // We want to switch to new page only if postId exists and was passed
    // it we got null (it might be intentional, then no page will be openned)
    if (postId && isPostClickable) {
        window.open("http://localhost:3000/post/" + postId, "_blank")
    }
    // else if (postId && isPostClickable === false) {
    //     console.log("We are on single post page, we can only zoom into image")
    // }
    else {
        console.log("clicked, got null or false")
        console.log(postId, isPostClickable)
    }
}

function SinglePost({ POST_DATA, isPostClickable = false, isPostPage = false }) {

    /*
    POST_DATA is object that stores all data about single post

    isPostPage is a boolean that give us information whether we are on main home page or single post like /post/12 
    if so we want to hide comment button and also we want to click on image to be displayed bigger instead of opening copy of that page!
    */

    return (
        <Fragment>


            {/* Here we display all posts  */}

            <div key={`meme-${POST_DATA.postId}`} className={homePageClasses.PostContainer}>

                {/* Post Info, Date + Username  */}
                <div className={homePageClasses.PostInfoContainer}>
                    {/* Post Owner Avatar  */}
                    <img className={homePageClasses.PostOwnerAvatar} src={POST_DATA.postOwnerAvatar} alt="" />

                    {/* Post Owner Text  */}
                    <h4 className="PostOwner"> {POST_DATA.postOwner} </h4>

                    {/* Display post creation date with correct format */}
                    <DisplayFormatedDate postCreationDate={POST_DATA.postCreationDate} />

                </div>


                {/* Post title  */}
                <div className={homePageClasses.PostTitleContainer}>
                    <h2 onClick={() => handlePostClick(POST_DATA.postId, isPostClickable)} className="PostTitle"> {POST_DATA.postTitle} </h2>
                </div>


                {/* Display tags  */}
                <div className={homePageClasses.PostTagsContainer}>
                    {
                        POST_DATA.postTags.map((ele, idx) => {
                            return (
                                <button key={`tag-${idx}-${ele}`} className={homePageClasses.PostTag}>
                                    {ele}
                                </button>
                            )
                        })
                    }
                </div>


                {/* Post image  */}
                <DisplayPostImage isPostClickable={isPostClickable} postId={POST_DATA.postId} imgSrc={POST_DATA.postImage} />


                {/* Post reactions, likes, dislikes and comments  */}
                <div className={homePageClasses.PostReactionsContainer}>
                    <div className={homePageClasses.PostReactionsLeft}>
                        <button className={homePageClasses.reactionButton + ' ' + homePageClasses.reactionButtonLike}> <i className="fa-solid fa-thumbs-up"></i> {POST_DATA.postLikes} </button>
                        <button className={homePageClasses.reactionButton + ' ' + homePageClasses.reactionButtonDislike}> <i className="fa-solid fa-thumbs-down"></i> {POST_DATA.postDislikes} </button>
                        {(!isPostPage) &&
                            < button className={homePageClasses.reactionButton + ' ' + homePageClasses.reactionButtonComment}> <i className="fa-solid fa-comments"></i> {POST_DATA.postComments} </button>
                        }
                    </div>



                    <div className={homePageClasses.PostReactionsRight}>
                        <DropdownButton />
                    </div>

                </div>

                {/* <div className={homePageClasses.PostEnd}>
                                    <hr className={homePageClasses.PostEndHr} />
                                </div> */}

            </div>



        </Fragment >
    )
}

export default SinglePost