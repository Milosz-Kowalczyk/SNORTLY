import React, { useEffect, useRef, useState } from 'react'
import CategoriesPanel from '../components/CategoriesPanel/CategoriesPanel'
import homePageClasses from '../styles/HomePage.module.scss';
import SinglePost from '../components/SinglePost/SinglePost';
import AdsPanel from '../components/AdsPanel/AdsPanel';
import { useParams } from 'react-router-dom';

import '../styles/globals.scss';
import classes from '../styles/PostPage.module.scss';
import CommentSection, { AddCommentTextArea } from '../components/CommentSection/CommentSection';

function CommentContainer() {
    const [commentMessage, setCommentMessage] = useState("");

    function handleCommentMessageChange(e) {
        let val = e.target.value;
        setCommentMessage(val);
    }

    function handleCommentMessageCancelClick() {
        setCommentMessage("");
    }

    return (
        <div className={classes.AddCommentContainer}>
            <p className={"p4Text color-lightDark " + classes.RespectRulesText}>
                Remember to keep comments respectful and to follow
                <span className="linkText"> our Community Guidelines. </span>
            </p>

            <AddCommentTextArea
                message={commentMessage}
                handleMessage={handleCommentMessageChange}
                handleMessageCancelClick={handleCommentMessageCancelClick}
                isMainInput={true}
            />
        </div>
    );
}

function PostPage() {

    // HERE WE SHOULD FETCH DATA ABOUT POST AND COMMENTS and then pass it down!

    const { postId } = useParams();

    const [postData, setPostData] = useState("") // We fetch this for specific postId

    const commentSectionRef = useRef(null); // this is for smoothScroll to commentSection

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

    useEffect(() => {
        if (postId) {
            let data = DUMMY_DATA.filter(ele => ele.postId === postId)
            setPostData(...data);
        }
    }, [postId])


    function handleScrollToCommentSection() {
        commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={'container ' + homePageClasses.mainContainer}>

            {/* Left side Panel - Categories / Hey You Box  */}
            <CategoriesPanel />


            {/* Here, we display memes (middle section ) */}
            <div className={homePageClasses.ContainerWrapper + ' ' + homePageClasses.MiddleContainerWrapper}>
                <div className={homePageClasses.middleSideContainer} style={{ paddingTop: "2rem", gap: "0" }}>

                    {(postData) &&
                        <SinglePost key={`post-${postData.postId}`} POST_DATA={postData} isPostClickable={false} isPostPage={true} />
                    }

                    <div className={classes.CommentSectionFilterContainer}>
                        <button onClick={handleScrollToCommentSection} className={"myButton btnPurple"}> Comments 281 </button>
                        {/* Later you can add other buttons for filtering or something */}
                    </div>

                    {/* Add comment container  */}
                    <CommentContainer />

                    {/* Render Comment Section (with ref to scroll to it when comment button clicked)  */}
                    <div>
                        <CommentSection commentSectionRef={commentSectionRef} />
                    </div>

                </div>

            </div>


            {/* Right side Panel - Best memes, authors, top users, maybe ads? */}
            <AdsPanel />

        </div >
    )
}

export default PostPage