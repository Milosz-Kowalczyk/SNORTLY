import React, { useContext, useState } from 'react'
// import '~video-react/dist/video-react.css'; // import css
import TextareaAutosize from 'react-textarea-autosize';

import classes from './NewPost.module.scss';
import { ContextPopups } from '../../context/popupsContext';
import '../../styles/globals.scss';

function NewPost() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups);

    // Meme title (max 256 letters!)
    const MAX_TITLE_LENGTH = 256;
    const [postTitle, setPostTitle] = useState("")
    const [postTitleCount, setPostTitleCount] = useState(MAX_TITLE_LENGTH); // Here we count down from MAX_TITLE_LENGTH to 0 (max title length)

    // MEME file
    // We allow only for PNG, JPG, GIF, MP4
    const MAX_KB_FILE_SIZE = 2000 // Max is 2000KB, 2MB;
    const [uploadedFile, setUploadedFile] = useState("") // Stores file that was uploaded (can be image or video)
    const [fileUrl, setFileUrl] = useState(""); // Stores file URL
    const [postURL, setPostURL] = useState("");   // Stores URL that user passed in input (optional)
    const [fileType, setFileType] = useState(""); // Helper that stores information either "image" or "video"
    const [videoSrc, setVideoSrc] = useState("");
    const [showFilePreview, setShowFilePreview] = useState(false);
    const [isPostURLCorrect, setIsPostURLCorrect] = useState(false);

    // Select tags stuff 
    const MAX_TAGS = 5; // Max number of selected tags
    const [selectedTag, setSelectedTag] = useState("")  // Currently selected tag in select box
    const [selectedTags, setSelectedTags] = useState([]);

    // Errors 
    const [errorMessages, setErrorMessages] = useState([]); // We store errors in array
    const [fileErrors, setFileErrors] = useState([]) // Same thing but individually for file

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

    // When user clicks on blurry part of the website (not on form) or close button
    function handleClickOutsideNewPost() {
        setCurrentPopup("")
        setShowPopup(false);
    }

    // Closes New post popup
    function handleCloseClick() {
        setCurrentPopup("")
        setShowPopup(false);
    }

    // This is for controling meme title max letters 
    function handlepostTitleChange(e) {
        let val = e.target.value;

        // Updates postTitle and also postTitleCount is updated to go until it reaches 0
        if (val.length <= MAX_TITLE_LENGTH) {
            setPostTitle(val)
            setPostTitleCount(MAX_TITLE_LENGTH - val.length)
        }
    }

    // ## HANDLING TAGS 
    function handleSelectedTagChange(e) {
        let val = e.target.value;
        setSelectedTag(val);
    }

    // Handle when add tag button is clicked
    function handleAddTagClick() {
        if (selectedTag !== "" && selectedTags.indexOf(selectedTag) === -1 && selectedTags.length < MAX_TAGS) {

            let selectedTagsCopy = [...selectedTags];
            selectedTagsCopy.push(selectedTag);
            setSelectedTags(selectedTagsCopy)
        }
    }

    // Update array, delete tag that was clicked 
    function handleDeleteTagClick(tagName) {
        let selectedTagsCopy = [...selectedTags];
        let indexToDelete = selectedTagsCopy.indexOf(tagName)

        selectedTagsCopy[indexToDelete] = ""

        let updatedTags = [];
        for (let i = 0; i < selectedTagsCopy.length; i++) {
            if (selectedTagsCopy[i] !== "")
                updatedTags.push(selectedTagsCopy[i])
        }

        setSelectedTags(updatedTags)
    }

    // ## HANDLING FILE UPLOADING OR LINK 

    // This if for handling file change 
    function handleFileChange(e) {

        let file = e.target.files[0];
        let fileType = file.type;

        let fileSizeInKB = parseInt(file.size / 1000)

        let possible_errors = [];

        console.log("Hello", file)

        // Checking for errors
        if (fileType !== "image/jpeg" && fileType !== "image/png" && fileType !== "image/jpg" && fileType !== "image/gif" && fileType !== "image/webp" && fileType !== "video/mp4") {
            possible_errors.push("This file extension is not supported!")
        }
        if (fileSizeInKB > MAX_KB_FILE_SIZE) {
            possible_errors.push("Your file is too big, max file size is 2MB!")
        }

        if (possible_errors.length > 0) {
            setFileErrors([...possible_errors])
        }
        else {
            // Here we have correct file to add.. 

            setShowFilePreview(true);

            if (fileType === "video/mp4") {
                var url = URL.createObjectURL(file);

                // console.log("url", url)
                setVideoSrc(url);
                setFileType("video")

                setUploadedFile(file);
                setErrorMessages([])
            }
            else {
                let fileUrl = URL.createObjectURL(e.target.files[0])
                setFileType("image")
                setFileUrl(fileUrl);

                setUploadedFile(file)
                setErrorMessages([])
            }
        }
    }

    // Handle post url when it is passed
    function handlePostURL(e) {
        let url = e.target.value;
        const urlExtension = url.substring(url.lastIndexOf('.') + 1);
        let possibleExtensions = ["gif", "png", "jpg", "jpeg", "webp"]

        let possible_erros = [];

        // First we check is url has .mp4 
        if (urlExtension === 'mp4') {
            setVideoSrc(url);
            setFileType("video");
            setErrorMessages([]);
            setPostURL(url);
            setShowFilePreview(true);
            setIsPostURLCorrect(true);
        } else {
            if (!possibleExtensions.includes(urlExtension) && url.length > 0) {
                possible_erros.push("Url has wrong extension!")
            }

            if (possible_erros.length > 0) {
                setErrorMessages([...possible_erros])
            }
            else if (url.length <= 0) {
                setErrorMessages([])
            }
            else if (url.length > 0) {
                setFileType("image");
                setErrorMessages([])
                setIsPostURLCorrect(true);

                // We want delay to make image url copy a bit more realistic 
                setTimeout(() => {
                    setShowFilePreview(true);
                }, 1000);
            }

            setPostURL(url);
        }





    }

    // When user has uploaded image, he can still delete it which we handle here 
    // We allow user to delete image and try again
    function handleUploadedImageDelete() {
        setFileUrl("");
        setShowFilePreview(false);
        setPostURL("");
        setUploadedFile("")
        setIsPostURLCorrect(false);
    }


    // When we click 'Add post' button (main one)
    function handleAddPostClick() {

        let possible_errors = []; // Here we store errors and pass it to errorMessages

        if (postTitle === "" || postTitle.length < 3) {
            possible_errors.push("Title has to have at least 3 characters!")
        }

        if (selectedTags.length === 0) {
            possible_errors.push("There has to be at least one tag added!")
        }
        // Here we check two things
        // If user uploaded file instead of pasting image
        if (!postURL) {
            if ((uploadedFile === null || uploadedFile === "" || uploadedFile === undefined)) {
                possible_errors.push("File is required!")
            }
        }
        // If user passed image url (we check if it correct and exists)
        else if (!uploadedFile) {
            if ((postURL === null || postURL === "" || postURL === undefined)) {
                possible_errors.push("File is required!")
            }
        }

        else if (!postURL && !uploadedFile) {
            possible_errors.push("File is required!")
        }


        if (possible_errors.length > 0) {
            setErrorMessages([...possible_errors])
        }

        else {
            // Here we have everything, we can add post to db 
            console.log("All ready")
            setErrorMessages([])
            // console.log("File type: ", fileType)
            // console.log("File Name ", uploadedFile.name)
            // console.log("file size", uploadedFile.size)
            // console.log("Title", postTitle);
            // console.log("File", uploadedFile)
        }



    }

    return (
        <div onClick={handleClickOutsideNewPost} className={classes.BlurryContainer}>

            <div className={classes.ContainerWrapper}>

                <div onClick={(e) => e.stopPropagation()} className={classes.Container}>

                    {/* // Close window button */}
                    <i onClick={handleCloseClick} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                    {/* Popup Title  */}
                    {/* Add post or show preview buttons  */}
                    <div className={classes.PostActionsContainer}>
                        <h2 style={{ marginBottom: "0" }} className="PopupTitle"> New Post </h2> <button className='myButton btnPurple' onClick={handleAddPostClick}> <i className="fa-solid fa-location-arrow"></i>Publish Post </button>
                    </div>


                    {/* Error messages here  */}
                    {(errorMessages.length > 0 || fileErrors.length > 0) &&
                        <div style={{ marginTop: "0" }} className="errorMessageContainer">
                            <p className='errorMessageText'>
                                {
                                    errorMessages.map((ele, idx) => (
                                        <span key={`error-${idx}`}> - {ele} <br /> </span>
                                    ))
                                }

                                {
                                    fileErrors.map((ele, idx) => (
                                        <span key={`file-error-${idx}`}> - {ele} <br /> </span>
                                    ))
                                }
                            </p>
                        </div>
                    }

                    {/* // Here we count and display title length  */}
                    <div className={classes.TitleInputContainer}>
                        <h2 className="inputLabel">
                            <span className={"icon is-small is-left "}>
                                <i className="fa-solid fa-signature"></i>
                            </span>
                            Post Title
                        </h2>

                        {/* If we reach postTitleCount = 0, we display it with red color  */}
                        {(postTitleCount > 0)
                            ? < p className={classes.TitleCounter}> {postTitleCount} </p>
                            : < p className={classes.TitleCounter + ' ' + classes.TitleCounterLimit}> {postTitleCount} </p>
                        }
                    </div>

                    {/* Title Text area (Because we wanted to add new line when user reaches some input limit) */}
                    <div className={classes.TextAreaContainer}>
                        <TextareaAutosize spellCheck="false" maxRows={5} value={postTitle} onChange={(e) => { handlepostTitleChange(e) }} className={classes.TitleTextArea} />
                    </div>


                    {/* // Add tags section  */}
                    <div className={classes.AddTagsContainer}>

                        {/* Here we display max tags number  */}
                        <div className={classes.SelectTagsMaxTagsContainer}>
                            <h2 className="inputLabel">
                                <span> <i className="fa-solid fa-tags"></i> </span>
                                Add at least one tag
                            </h2>

                            {((MAX_TAGS - selectedTags.length) > 0)
                                ? <p className={classes.MaxTagsText}> {MAX_TAGS - selectedTags.length} </p>
                                : <p className={classes.MaxTagsText + " " + classes.MaxTagsTextLimit}> {MAX_TAGS - selectedTags.length} </p>
                            }

                        </div>

                        {/* Select box with possible tags  */}
                        <div className={classes.SelectTagsContainer}>

                            <select className="selectLight" defaultValue="" onChange={handleSelectedTagChange}>
                                <option value="" disabled>Select tag</option>
                                {DUMMY_CATEGORIES.map((ele, idx) => (
                                    <option key={`${ele.categoryTitle}-${idx}`} value={ele.categoryTitle}>
                                        {ele.categoryTitle}
                                    </option>
                                ))}
                            </select>

                            <button className='myButton btnPurple' onClick={handleAddTagClick}> <i className="fa-regular fa-square-plus"></i> </button>

                        </div>

                        {/* Here we display all added tags */}
                        <div className={classes.SelectedTagsContainer}>
                            {selectedTags.map((ele, idx) => {
                                return (
                                    <button key={`${ele.categoryTitle}-tag-${idx}`} className={'btnPurple'} onClick={() => { handleDeleteTagClick(ele) }}>
                                        {ele}
                                    </button>
                                )
                            })}

                        </div>
                    </div>

                    {/* Upload image container  */}
                    <div className={classes.UploadImageContainer}>

                        {/* Show upload container is image / video wasnt picked yet! */}
                        {(!showFilePreview) &&
                            <>
                                <div className={classes.UploadLinkContainer}>

                                    {/* // Upload via link */}
                                    <p className="inputLabel"> Enter link </p>
                                    <p className={"control has-icons-left"}>
                                        <input value={postURL} onChange={(e) => { handlePostURL(e) }} className="input" type="text" />
                                        <span className={"icon is-small is-left " + classes.myIcon}>
                                            <i className="fa-solid fa-link"></i>
                                        </span>
                                    </p>
                                </div>

                                <p className={classes.Divider}> Or </p>

                                {/* // Upload via file upload */}
                                <label className={'myButton btnPurple ' + classes.BtnUpload}>
                                    <input type="file" style={{ display: "none" }} accept="image/*, video/mp4" disabled={isPostURLCorrect} onChange={(e) => { handleFileChange(e) }} />
                                    <i className="fa fa-cloud-upload" /> Upload image
                                </label>

                                <p className="p5Text" style={{ marginTop: "0.75rem", textAlign: "left", alignSelf: "flex-start" }}> We support files and links with PNG, JPG, GIF or MP4 extensions. </p>
                            </>
                        }

                        {/* Show preview of file if this is image (or gif) */}
                        {(showFilePreview && fileType === "image")
                            &&
                            <div className={classes.UploadedImageContainer}>
                                <div className={classes.UploadedImageWrapper}>
                                    <div className={classes.DeleteUploadedImageContainer} onClick={handleUploadedImageDelete}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </div>

                                    {/* Display img depending if it is from file upload or direct link */}
                                    {(fileUrl) && <img src={fileUrl} alt="" />}
                                    {(postURL) && <img src={postURL} alt="" />}

                                </div>
                            </div>
                        }

                        {/* Show preview of file if this is video  */}
                        {(showFilePreview && fileType === "video" && videoSrc) &&
                            <div className={classes.VideoPreviewContainer}>
                                <div className={classes.VideoWrapper}>
                                    <div className={classes.DeleteUploadedImageContainer} onClick={handleUploadedImageDelete}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </div>

                                    {/* {console.log("yes", videoSrc)} */}

                                    <video controls>
                                        <source src={videoSrc} />
                                    </video>



                                </div>
                            </div>
                        }


                    </div>

                </div>

            </div>

        </div>
    )
}

export default NewPost