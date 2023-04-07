import user from '../../assets/avatar/user.jpg'
import {HOST} from '../../common/routes';
import {CommentType} from '../../common/types';
import {RatingForModal} from '../rating';

import styles from './comment.module.scss'

type CommentComponentType =  {
    comment: CommentType
}

export const Comment = ({comment}: CommentComponentType) => {

    const formatDate = (date: string) => new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.comment} data-test-id='comment-wrapper'>
            <div className={styles.userData}>
                <div className={styles.avaBox}>
                    <img src={comment.user.avatarUrl?`${HOST}${comment.user.avatarUrl}`:user} alt="user" className={styles.userAva}/>
                </div>
                <div className={styles.userBox}>
                    <div className={styles.name} data-test-id='comment-author'>
                        {`${comment.user.firstName} ${comment.user.lastName}`}
                    </div>
                    <div data-test-id='comment-date'>{formatDate(comment.createdAt)}</div>
                </div>
            </div>
            <div className={styles.rating}>
                <RatingForModal count={comment.rating}/>
            </div>
            <div className={styles.commentText} data-test-id='comment-text'>
                {comment.text}
            </div>
        </div>

    )
};


