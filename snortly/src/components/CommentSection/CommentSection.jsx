import React, { Fragment, useState } from 'react'
import classes from './CommentSection.module.scss'
import '../../styles/globals.scss'
import { DisplayFormatedDate } from '../../components/SinglePost/SinglePost'
import TextareaAutosize from 'react-textarea-autosize';
import addCommentClasses from './AddCommentTextArea.module.scss'
import Alert from '../popups/Alert';

// File description:
// This is for displaying all comments and subcomments for specific post id 

// Components work in this order
// CommentSection
// - SingleComment
//  - SingleCommentSubComments
//      - SingleSubComment

// This is our standard addComment Component that you are using in add SubComment and add Comment for main Comment
export function AddCommentTextArea({ message, handleMessage, handleMessageCancelClick, isMainInput }) {

    // These variables are for controling, what image or video user added to comment!
    // selectedImage can be a video also
    // We allow for png, jpg, webp, gif, mp4
    const [selectedImage, setSelectedImage] = useState(null);   // Image object
    const [selectedImageType, setSelectedImageType] = useState("") // Image Type like png or jpg
    const [selectedImageSrc, setSelectedImageSrc] = useState("") // Image / Video src
    const MAX_KB_FILE_SIZE = 2000 // Max is 2000KB, 2MB;
    const allowed_extentions = ['png', 'jpeg', 'jpg', 'webp', 'gif']

    const [selectedImageError, setSelectedImageError] = useState("") // Here we store single error message

    // This checks if our input is "isMainInput"
    // If so, our AddCommentTextArea will behave a bit different, focus Click will work
    const [hideActions, setHideActions] = useState(isMainInput || false)

    const randomInputImageNumber = `${message}-${Math.random()}` // Adding unique value to prevent input image to be shown on wrong comment input

    const handleImageSelect = (event) => {
        const file = event.target.files[0];

        if (file) {

            let fileSizeInKB = parseInt(file.size / 1000)
            let fileUrl = URL.createObjectURL(file);
            let fileType = file.type.split("/")[1]
            fileType = fileType.toLowerCase();

            if (fileSizeInKB < MAX_KB_FILE_SIZE) {

                console.log("File size ok", fileSizeInKB)

                // If user added video
                if (fileType === "mp4") {
                    console.log("Video added")

                    setSelectedImageType(fileType)
                    setSelectedImageSrc(fileUrl)
                    setSelectedImage(file);
                }
                // if user added image
                else if (allowed_extentions.includes(fileType)) {
                    console.log("Image added")

                    setSelectedImageType(fileType)
                    setSelectedImageSrc(fileUrl)
                    setSelectedImage(file);

                }
                // DIfferent image type
                else {
                    console.log("file type not allowed")
                    setSelectedImageError("This file type is not allowed!")
                }

            }
            else {
                console.log("File size too big", fileSizeInKB)
                setSelectedImageError(`Max file size is: ${parseFloat(MAX_KB_FILE_SIZE / 1000)} MB`)
            }



            // Reset input value 
            event.target.value = null;
        }

    };

    function handleSelectedImageDelete() {
        setSelectedImage(null);
        setSelectedImageType("")
        setSelectedImageSrc("")
    }

    function onMainInputCancelHideBottom() {
        setHideActions(true)
        handleSelectedImageDelete()
    }

    function onMainInputShowBottomOnFocus() {
        setHideActions(false);
    }

    function onSubmitComment() {
        console.log("Comment submited!")
        console.log("File obj: ", selectedImage)
    }

    return (
        <div className={addCommentClasses.CommentReplyContainer} style={(isMainInput && { padding: "0" })}>

            {/* Show alert with error when we do something wrong! */}
            {selectedImageError && <Alert key={selectedImageError} message={selectedImageError} clearVariableState={setSelectedImageError} />}


            {/* Comment input */}
            <TextareaAutosize placeholder="Leave a comment... " onClick={isMainInput && onMainInputShowBottomOnFocus} spellCheck="false" maxLength={512} maxRows={5} value={message} onChange={(e) => { handleMessage(e) }} className={addCommentClasses.TitleTextArea + " " + (isMainInput ? "" : addCommentClasses.CommentExpanded)} />

            {/* Buttons like submit, add image ..  */}
            {(!hideActions) &&
                <div className={addCommentClasses.AddCommentActionsContainer}>

                    <div className={addCommentClasses.ActionsWrapper}>

                        {/* Hidden file input button */}
                        <label htmlFor={`imageInput-${randomInputImageNumber}`} className={addCommentClasses.FileInputLabel}>
                            <i className="far fa-image"></i>
                        </label>
                        <input id={`imageInput-${randomInputImageNumber}`} type="file" accept="image/*, video/mp4" onChange={(e) => { handleImageSelect(e) }} style={{ display: 'none' }} />
                        <i className="fa-solid fa-clapperboard"></i>

                    </div>
                    <div className={addCommentClasses.ActionsWrapperRight}>
                        <p onClick={() => {
                            handleMessageCancelClick()
                            if (isMainInput) {
                                onMainInputCancelHideBottom()
                            }
                        }
                        } className="CancelCommentText"> Cancel </p>
                        <button className='button btnPurple' onClick={onSubmitComment}> Comment </button>
                    </div>

                </div>
            }

            {(selectedImageType === "mp4" && selectedImageSrc) &&
                <div className={addCommentClasses.AddedFileContainer}>
                    {/* <Player style={{ width: '100px' }}>
                        <source style={{ width: '100px' }} src={selectedImageSrc} />
                    </Player> */}

                    <video controls >
                        <source src={selectedImageSrc} type="video/mp4" />
                    </video>

                    <div onClick={handleSelectedImageDelete}> <i className="fa-solid fa-trash-can"></i> </div>
                </div>
            }

            {(allowed_extentions.includes(selectedImageType) && selectedImageSrc) &&
                <div className={addCommentClasses.AddedFileContainer}>
                    <img src={selectedImageSrc} alt="" />
                    <div onClick={handleSelectedImageDelete}> <i className="fa-solid fa-trash-can"></i> </div>
                </div>

            }
        </div>
    )
}

// Helpers for dummy data 
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create random arrays
function createRandomSubarrays(mainArray, numArrays) {
    const randomArray = [];

    for (let i = 0; i < numArrays; i++) {
        const numElements = getRandomNumber(1, mainArray.length - 1);
        randomArray.push(mainArray[numElements]);
    }

    return randomArray;
}

export function SingleSubComment({ sub }) {

    const [subCommentReplyClicked, setSubCommentReplyClicked] = useState(false)

    // For Replays in subcomments 
    const [subCommentMessage, setSubCommentMessage] = useState("")

    function handleSubReplyClick(subOwner) {
        handleCommentMessageFocus(subOwner)
    }

    // We also add @username here 
    function handleCommentMessageFocus(ownerOfMainComment) {

        // console.log("Sub Comment clicked")

        if (ownerOfMainComment) {
            let startingCommentText = "@" + ownerOfMainComment + " "
            setSubCommentMessage(startingCommentText)
        }
        else {
            setSubCommentMessage("")
        }

        setSubCommentReplyClicked(true)
    }

    function handleSubCommentMessage(e) {
        let val = e.target.value;
        setSubCommentMessage(val)
    }

    function handleSubCommentMessageCancelClick() {
        setSubCommentReplyClicked(false)
        setSubCommentMessage("")
    }


    return (

        <Fragment >
            <div className={classes.SubCommentsContainer} >
                <div className={classes.SubCommentsAvatarContainer}>
                    <img src={sub.subCommentOwnerAvatar} alt="" />
                </div>

                <div className={classes.SubCommentUserInfo}>
                    <a className="SubCommentOwner" href="/"> {sub.subCommentOwner} </a>
                    <DisplayFormatedDate postCreationDate={sub.subCommentCreationDate} />

                    <div className={classes.CommentTextContainer}>
                        <p className='CommentText'> {sub.subCommentText} </p>

                        {/* subComment action buttons  */}
                        <div className={classes.CommentActionButtons}>
                            <p className={"CommentActionText"} onClick={() => handleSubReplyClick(sub.subCommentOwner)}> Reply </p>
                            <div className={classes.CommentReactionsWrapper}>
                                <i className="fa-regular fa-thumbs-up "></i>
                                <p> {sub.subCommentLikes} </p>
                            </div>
                            <div className={classes.CommentReactionsWrapper}>
                                <i className="fa-regular fa-thumbs-down "></i>
                                <p> {sub.subCommentDislikes} </p>
                            </div>

                            <div className={classes.CommentReactionsWrapper}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            {/* subComment replay comment input box  */}
            {
                (subCommentReplyClicked) &&
                <AddCommentTextArea message={subCommentMessage} handleMessage={handleSubCommentMessage} handleMessageCancelClick={handleSubCommentMessageCancelClick} />
            }
        </Fragment>
    )
}

// This display all subComments 
export function SingleCommentSubComments({ subCommentData, showReplies }) {

    return (
        <div className={classes.SubCommentContainer}>


            {(showReplies && subCommentData.length > 0) &&
                <div className={classes.SubCommentsWrapper}>

                    {subCommentData.map((sub, idx) => {
                        return (

                            // sub is single subComment object 
                            <SingleSubComment key={`${sub.commentId}-${idx}`} sub={sub} />

                        )
                    })}
                </div>

            }

        </div>


    )
}

// This is for displaying singleComment and its subTree of comments
export function SingleComment({ commentData, subCommentData }) {

    // Toggle show replies 
    const [showReplies, setShowReplies] = useState(false);

    // Message when we reply to main comment owner 
    const [subMainCommentMessage, setSubMainCommentMessage] = useState("")
    const [subMainReplyClicked, setSubMainReplyClicked] = useState(false)

    function toggleShowReplies() {
        setShowReplies(!showReplies);
    }

    function handleSubMainCommentMessage(e) {
        let val = e.target.value;
        setSubMainCommentMessage(val);
    }

    function handleSubCommentMessageCancelClick() {
        setSubMainCommentMessage("")
        setSubMainReplyClicked(false)
    }

    function handleMainReplyClick() {
        let startingCommentText = "@" + commentData.commentOwner + " "
        setSubMainCommentMessage(startingCommentText)
        setSubMainReplyClicked(true)

        // console.log("Main COmment clicked")
    }


    return (
        <Fragment key={`comment-${commentData.commentId}`} >

            <div className={classes.CommentWrapper}>

                {/* User Avatar  */}
                <div className={classes.CommentAvatarContainer}>
                    <img src={commentData.commentOwnerAvatar} alt="" />
                </div>

                <div className={classes.CommentContainer}>

                    <div className={classes.CommentUserInfoContainer}>

                        {/* Comment username and comment date  */}
                        <div className={classes.CommentUserInfo}>
                            <a className="PostOwner" href="/"> {commentData.commentOwner} </a>
                            <DisplayFormatedDate postCreationDate={commentData.commentCreationDate} />

                        </div>

                        {/* Comment text  */}
                        <div className={classes.CommentTextContainer}>
                            <p className='CommentText'> {commentData.commentText} </p>

                            {/* Comment action buttons  */}
                            <div className={classes.CommentActionButtons}>
                                <p className={"CommentActionText"} onClick={handleMainReplyClick}> Reply </p>
                                <div className={classes.CommentReactionsWrapper}>
                                    <i className="fa-regular fa-thumbs-up "></i>
                                    <p> {commentData.commentLikes} </p>
                                </div>
                                <div className={classes.CommentReactionsWrapper}>
                                    <i className="fa-regular fa-thumbs-down "></i>
                                    <p> {commentData.commentDislikes} </p>
                                </div>

                                <div className={classes.CommentReactionsWrapper}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </div>


                            </div>
                        </div>

                        {/* /* Button to display subComments  */}

                        {(subCommentData.length > 0) &&
                            <div className={classes.ViewSubCommentsContainer} onClick={toggleShowReplies}>
                                <div>
                                    {(showReplies)
                                        ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                    }

                                    <p className=''> {(showReplies) ? "Hide" : "View"} {subCommentData.length} replies </p>
                                </div>
                            </div>
                        }

                    </div>

                </div>

            </div>

            {
                (subMainReplyClicked) &&
                <div className={classes.SubCommentContainer}>
                    <AddCommentTextArea message={subMainCommentMessage} handleMessage={handleSubMainCommentMessage} handleMessageCancelClick={handleSubCommentMessageCancelClick} />
                </div>
            }


            <SingleCommentSubComments subCommentData={subCommentData} showReplies={showReplies} />


        </Fragment>
    )
}

function CommentSection() {

    // Data for posts 
    const DUMMY_DATA =
        [
            {
                commentOwner: 'Theboy271',
                commentId: '21',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
                commentCreationDate: '2023-06-04 14:30:00',
                commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit',
                commentLikes: '10421',
                commentDislikes: '102'
            },
            {
                commentOwner: 'User123',
                commentId: '22',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png',
                commentCreationDate: '2023-06-10 09:45:00',
                commentText: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
                commentLikes: '987',
                commentDislikes: '65'
            },
            {
                commentOwner: 'JohnDoe',
                commentId: '23',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/5678/5678901.png',
                commentCreationDate: '2023-06-12 18:15:00',
                commentText: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
                commentLikes: '245',
                commentDislikes: '10'
            },
            {
                commentOwner: 'JaneSmith',
                commentId: '24',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/9764/9764596.png',
                commentCreationDate: '2023-06-15 11:20:00',
                commentText: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
                commentLikes: '567',
                commentDislikes: '43'
            },
            {
                commentOwner: 'User456',
                commentId: '25',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/3456/3456789.png',
                commentCreationDate: '2023-06-16 16:50:00',
                commentText: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam',
                commentLikes: '789',
                commentDislikes: '25'
            },
            {
                commentOwner: 'SarahJohnson',
                commentId: '26',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/7890/7890123.png',
                commentCreationDate: '2023-06-17 09:10:00',
                commentText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
                commentLikes: '321',
                commentDislikes: '15'
            },
            {
                commentOwner: 'MarkWilson',
                commentId: '27',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/2345/2345678.png',
                commentCreationDate: '2023-06-18 14:20:00',
                commentText: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit',
                commentLikes: '543',
                commentDislikes: '30'
            },
            {
                commentOwner: 'EmilyJones',
                commentId: '28',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/6789/6789012.png',
                commentCreationDate: '2023-06-19 16:05:00',
                commentText: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit',
                commentLikes: '876',
                commentDislikes: '20'
            },
            {
                commentOwner: 'AlexBrown',
                commentId: '29',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/8901/8901234.png',
                commentCreationDate: '2023-06-20 10:30:00',
                commentText: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
                commentLikes: '432',
                commentDislikes: '5'
            },
            {
                commentOwner: 'LilyDavis',
                commentId: '30',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/6789/6789023.png',
                commentCreationDate: '2023-06-21 15:15:00',
                commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                commentLikes: '123',
                commentDislikes: '8'
            },
            {
                commentOwner: 'MichaelSmith',
                commentId: '31',
                commentOwnerAvatar: 'https://cdn-icons-png.flaticon.com/512/4567/4567890.png',
                commentCreationDate: '2023-06-22 11:40:00',
                commentText: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe',
                commentLikes: '765',
                commentDislikes: '42'
            },

        ]

    const SUB_COMMENTS = [
        {
            subCommentOwner: "Smith12",
            subCommentId: "31",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
            subCommentText: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe Temporibus. autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe",
            subCommentLikes: '765',
            subCommentDislikes: '42',
            subCommentCreationDate: '2023-06-22 11:10:00',
            subCommentTreeOwnerId: "27"
        },
        {
            subCommentOwner: "JohnDoe",
            subCommentId: "32",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/5678/5678901.png",
            subCommentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit",
            subCommentLikes: '200',
            subCommentDislikes: '5',
            subCommentCreationDate: '2023-06-22 15:30:00',
            subCommentTreeOwnerId: "27"
        },
        {
            subCommentOwner: "JaneSmith",
            subCommentId: "33",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/9764/9764596.png",
            subCommentText: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam",
            subCommentLikes: '50',
            subCommentDislikes: '3',
            subCommentCreationDate: '2023-06-22 18:45:00',
            subCommentTreeOwnerId: "31"
        },
        {
            subCommentOwner: "User456",
            subCommentId: "34",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/3456/3456789.png",
            subCommentText: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium",
            subCommentLikes: '100',
            subCommentDislikes: '10',
            subCommentCreationDate: '2023-06-23 09:20:00',
            subCommentTreeOwnerId: "31"
        },
        {
            subCommentOwner: "SarahJohnson",
            subCommentId: "35",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/7890/7890123.png",
            subCommentText: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam",
            subCommentLikes: '75',
            subCommentDislikes: '2',
            subCommentCreationDate: '2023-06-23 12:35:00',
            subCommentTreeOwnerId: "32"
        },
        {
            subCommentOwner: "MarkWilson",
            subCommentId: "36",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/2345/2345678.png",
            subCommentText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
            subCommentLikes: '300',
            subCommentDislikes: '8',
            subCommentCreationDate: '2023-06-23 14:50:00',
            subCommentTreeOwnerId: "32"
        },
        {
            subCommentOwner: "EmilyJones",
            subCommentId: "37",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/6789/6789012.png",
            subCommentText: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet",
            subCommentLikes: '150',
            subCommentDislikes: '6',
            subCommentCreationDate: '2023-06-23 16:15:00',
            subCommentTreeOwnerId: "33"
        },
        {
            subCommentOwner: "AlexBrown",
            subCommentId: "38",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/8901/8901234.png",
            subCommentText: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
            subCommentLikes: '50',
            subCommentDislikes: '1',
            subCommentCreationDate: '2023-06-24 09:40:00',
            subCommentTreeOwnerId: "33"
        },
        {
            subCommentOwner: "LilyDavis",
            subCommentId: "39",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/6789/6789023.png",
            subCommentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            subCommentLikes: '80',
            subCommentDislikes: '3',
            subCommentCreationDate: '2023-06-24 11:55:00',
            subCommentTreeOwnerId: "34"
        },
        {
            subCommentOwner: "MichaelSmith",
            subCommentId: "40",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/4567/4567890.png",
            subCommentText: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe",
            subCommentLikes: '250',
            subCommentDislikes: '12',
            subCommentCreationDate: '2023-06-24 13:20:00',
            subCommentTreeOwnerId: "34"
        },
        {
            subCommentOwner: "SophiaJohnson",
            subCommentId: "41",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/9012/9012345.png",
            subCommentText: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit",
            subCommentLikes: '120',
            subCommentDislikes: '4',
            subCommentCreationDate: '2023-06-24 15:45:00',
            subCommentTreeOwnerId: "35"
        },
        {
            subCommentOwner: "DanielWilson",
            subCommentId: "42",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
            subCommentText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
            subCommentLikes: '90',
            subCommentDislikes: '2',
            subCommentCreationDate: '2023-06-25 09:10:00',
            subCommentTreeOwnerId: "35"
        },
        {
            subCommentOwner: "EmmaBrown",
            subCommentId: "43",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/5678/5678901.png",
            subCommentText: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam",
            subCommentLikes: '70',
            subCommentDislikes: '1',
            subCommentCreationDate: '2023-06-25 11:35:00',
            subCommentTreeOwnerId: "36"
        },
        {
            subCommentOwner: "OliviaDavis",
            subCommentId: "44",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/9764/9764596.png",
            subCommentText: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium",
            subCommentLikes: '180',
            subCommentDislikes: '6',
            subCommentCreationDate: '2023-06-25 14:00:00',
            subCommentTreeOwnerId: "36"
        },
        {
            subCommentOwner: "NoahSmith",
            subCommentId: "45",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/3456/3456789.png",
            subCommentText: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam",
            subCommentLikes: '130',
            subCommentDislikes: '4',
            subCommentCreationDate: '2023-06-26 10:25:00',
            subCommentTreeOwnerId: "37"
        },
        {
            subCommentOwner: "MiaJohnson",
            subCommentId: "46",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/7890/7890123.png",
            subCommentText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
            subCommentLikes: '90',
            subCommentDislikes: '3',
            subCommentCreationDate: '2023-06-26 12:50:00',
            subCommentTreeOwnerId: "37"
        },
        {
            subCommentOwner: "JamesWilson",
            subCommentId: "47",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/2345/2345678.png",
            subCommentText: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
            subCommentLikes: '200',
            subCommentDislikes: '7',
            subCommentCreationDate: '2023-06-26 15:15:00',
            subCommentTreeOwnerId: "38"
        },
        {
            subCommentOwner: "AvaBrown",
            subCommentId: "48",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/6789/6789012.png",
            subCommentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            subCommentLikes: '70',
            subCommentDislikes: '2',
            subCommentCreationDate: '2023-06-27 09:40:00',
            subCommentTreeOwnerId: "38"
        },
        {
            subCommentOwner: "WilliamDavis",
            subCommentId: "49",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/8901/8901234.png",
            subCommentText: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe",
            subCommentLikes: '180',
            subCommentDislikes: '5',
            subCommentCreationDate: '2023-06-27 12:05:00',
            subCommentTreeOwnerId: "39"
        },
        {
            subCommentOwner: "SofiaSmith",
            subCommentId: "50",
            subCommentOwnerAvatar: "https://cdn-icons-png.flaticon.com/512/9012/9012345.png",
            subCommentText: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit",
            subCommentLikes: '120',
            subCommentDislikes: '3',
            subCommentCreationDate: '2023-06-27 14:30:00',
            subCommentTreeOwnerId: "39"
        }
        // ... continue with more elements
    ];



    return (
        <div className={classes.CommentSectionContainer}>

            {DUMMY_DATA.map((ele, idx) => {

                let randomSubArrayMax = getRandomNumber(0, 10)
                let randomSubArray = createRandomSubarrays(SUB_COMMENTS, randomSubArrayMax)

                return (
                    <SingleComment key={`comment-${idx}`} commentData={ele} subCommentData={randomSubArray} />
                )
            })}





        </div>
    )
}

export default CommentSection