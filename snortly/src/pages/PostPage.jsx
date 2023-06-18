import React, { useEffect, useState } from 'react'
import CategoriesPanel from '../components/CategoriesPanel/CategoriesPanel'
import homePageClasses from '../styles/HomePage.module.scss';
import SinglePost from '../components/SinglePost/SinglePost';
import AdsPanel from '../components/AdsPanel/AdsPanel';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import '../styles/globals.scss';
import classes from '../styles/PostPage.module.scss';
import CommentSection from '../components/CommentSection/CommentSection';


function PostPage() {

    const { postId } = useParams();

    const [postData, setPostData] = useState("") // We fetch this for specific postId

    const [commentMessage, setCommentMessage] = useState("");
    const [commentMessageBoxClicked, setCommentMessageBoxClicked] = useState(false);


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

    // When we write something in comment box
    function handleCommentMessageChange(e) {
        let val = e.target.value;
        setCommentMessage(val);
    }

    // When we click on comment box 
    // We want to increase height and show action buttons when we click on that input 
    function handleCommentMessageFocusClick() {
        setCommentMessageBoxClicked(true);
    }

    function handleCommentMessageCancelClick() {
        setCommentMessageBoxClicked(false);
        setCommentMessage("");
    }

    return (
        <div className={'container ' + homePageClasses.mainContainer}>

            {/* Left side Panel - Categories / Hey You Box  */}
            <CategoriesPanel />


            {/* Here, we display memes (middle section ) */}
            <div className={homePageClasses.ContainerWrapper + ' ' + homePageClasses.MiddleContainerWrapper}>
                <div className={homePageClasses.middleSideContainer} style={{ paddingTop: "2rem", gap: "0" }}>

                    {(postData) &&
                        <SinglePost key={`post-${postData.postId}`} POST_DATA={postData} isPostClickable={false} />
                    }

                    {/* Add comment container  */}
                    <div className={classes.AddCommentContainer} >

                        <p className={"p4Text color-lightDark " + classes.RespectRulesText}> Remember to keep comments respectful and to follow <span className="linkText"> our Community Guidelines. </span> </p>

                        {/* Comment input */}
                        <TextareaAutosize placeholder="Leave a comment... " spellCheck="false" maxRows={5} value={commentMessage} onClick={handleCommentMessageFocusClick} onChange={(e) => { handleCommentMessageChange(e) }} className={classes.TitleTextArea + " " + (commentMessageBoxClicked ? classes.CommentExpanded : "")} />


                        {/* Buttons like submit, add image ..  */}
                        {(commentMessageBoxClicked) &&
                            <div className={classes.AddCommentActionsContainer}>

                                <div className={classes.ActionsWrapper}>
                                    <i className="fa-regular fa-image"></i>
                                    <i className="fa-solid fa-clapperboard"></i>
                                </div>
                                <div className={classes.ActionsWrapper}>
                                    <p onClick={handleCommentMessageCancelClick} className="CancelCommentText"> Cancel </p>
                                    <button className='button btnPurple'> Post </button>

                                </div>

                            </div>
                        }

                    </div>

                    <CommentSection />

                </div>

            </div>


            {/* Right side Panel - Best memes, authors, top users, maybe ads? */}
            <AdsPanel />

        </div >
    )
}

export default PostPage