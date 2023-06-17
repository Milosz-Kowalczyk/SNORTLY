import React from 'react'
import classes from './CommentSection.module.scss'
import '../../styles/globals.scss'
import { DisplayFormatedDate } from '../../components/SinglePost/SinglePost'


// This is for displaying all comments and subcomments for specific post id 

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
        "aa"
    ]

    return (
        <div className={classes.CommentSectionContainer}>

            {DUMMY_DATA.map((ele, idx) => {
                return (
                    <div key={`comment-${ele.commentId}`} className={classes.CommentWrapper}>

                        {/* User Avatar  */}
                        <div className={classes.CommentAvatarContainer}>
                            <img src={ele.commentOwnerAvatar} alt="" />
                        </div>

                        <div className={classes.CommentContainer}>

                            <div className={classes.CommentUserInfoContainer}>

                                {/* Comment username and comment date  */}
                                <div className={classes.CommentUserInfo}>
                                    <a className="PostOwner" href="/"> {ele.commentOwner} </a>
                                    <DisplayFormatedDate postCreationDate={ele.commentCreationDate} />

                                </div>

                                {/* Comment text  */}
                                <div className={classes.CommentTextContainer}>
                                    <p className='CommentText'> {ele.commentText} </p>

                                    {/* Comment action buttons  */}
                                    <div className={classes.CommentActionButtons}>
                                        <p className={"CommentActionText"}> Reply </p>
                                        <div className={classes.CommentReactionsWrapper}>
                                            <i class="fa-regular fa-thumbs-up "></i>
                                            <p> {ele.commentLikes} </p>
                                        </div>
                                        <div className={classes.CommentReactionsWrapper}>
                                            <i class="fa-regular fa-thumbs-down "></i>
                                            <p> {ele.commentDislikes} </p>
                                        </div>

                                        <div className={classes.CommentReactionsWrapper}>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >
                )
            })}





        </div>
    )
}

export default CommentSection