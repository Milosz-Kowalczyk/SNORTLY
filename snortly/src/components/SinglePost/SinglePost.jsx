import React, { Fragment, useEffect, useState } from 'react'

// MAIN Styles for this component are taken from HomePage module (Because they are related)
import classes from "../../styles/HomePage.module.scss"
import { convertDateToDayAndMonth, convertDateToDayMonthYear, extractHourAndMinutes, getDaysDifference, isInCurrentYear } from '../../utils/dateFormatHelper';

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

    return (
        <Fragment>
            {
                (imageHeight > MAX_IMAGE_EXPAND_HEIGHT + MAX_IMAGE_SAFE_DIFFERENCE)
                    ?
                    // Here we display image that is a bit hidden and we can expand it (button)
                    <Fragment>
                        <div onClick={() => handlePostClick(postId, isPostClickable)} style={isExpanded ? { maxHeight: imageHeight + "px" } : { maxHeight: MAX_IMAGE_EXPAND_HEIGHT + "px" }} className={isExpanded ? classes.PostImageContainer : classes.PostImageContainerExpanded}>
                            <img src={imgSrc} alt="" />
                        </div>

                        {
                            (!isExpanded) && <button className={"button btnPurple " + classes.ExpandImageButton} onClick={toggleExpandImage}> Expand image </button>
                        }

                    </Fragment>
                    :
                    // Normal image here
                    <div onClick={() => handlePostClick(postId, isPostClickable)} className={classes.PostImageContainer}>
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

            <div key={`meme-${POST_DATA.postId}`} className={classes.PostContainer}>

                {/* Post Info, Date + Username  */}
                <div className={classes.PostInfoContainer}>
                    {/* Post Owner Avatar  */}
                    <img className={classes.PostOwnerAvatar} src={POST_DATA.postOwnerAvatar} alt="" />

                    {/* Post Owner Text  */}
                    <h4 className="PostOwner"> {POST_DATA.postOwner} </h4>

                    {/* Display post creation date with correct format */}
                    <DisplayFormatedDate postCreationDate={POST_DATA.postCreationDate} />

                </div>


                {/* Post title  */}
                <div className={classes.PostTitleContainer}>
                    <h2 onClick={() => handlePostClick(POST_DATA.postId, isPostClickable)} className="PostTitle"> {POST_DATA.postTitle} </h2>
                </div>


                {/* Display tags  */}
                <div className={classes.PostTagsContainer}>
                    {
                        POST_DATA.postTags.map((ele, idx) => {
                            return (
                                <button key={`tag-${idx}-${ele}`} className={classes.PostTag}>
                                    {ele}
                                </button>
                            )
                        })
                    }
                </div>


                {/* Post image  */}
                <DisplayPostImage isPostClickable={isPostClickable} postId={POST_DATA.postId} imgSrc={POST_DATA.postImage} />


                {/* Post reactions, likes, dislikes and comments  */}
                <div className={classes.PostReactionsContainer}>
                    <button className={classes.reactionButton + ' ' + classes.reactionButtonLike}> <i className="fa-solid fa-thumbs-up"></i> {POST_DATA.postLikes} </button>
                    <button className={classes.reactionButton + ' ' + classes.reactionButtonDislike}> <i className="fa-solid fa-thumbs-down"></i> {POST_DATA.postDislikes} </button>
                    {(!isPostPage) &&
                        < button className={classes.reactionButton + ' ' + classes.reactionButtonComment}> <i className="fa-solid fa-comments"></i> {POST_DATA.postComments} </button>
                    }
                </div>

                {/* <div className={classes.PostEnd}>
                                    <hr className={classes.PostEndHr} />
                                </div> */}

            </div>



        </Fragment >
    )
}

export default SinglePost