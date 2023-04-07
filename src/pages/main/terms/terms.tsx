import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {selectAuthStatus} from '../../../common/selectors';
import {Agreement} from '../../../components/agreement';
import {Rules} from '../../../components/rules';
import {fetchBooks} from '../../../redux/books-reducer';
import {fetchCategories} from '../../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {fetchUser} from '../../../redux/user-reducer';

type TermsType = {
    contentView: 'rules' | 'agreement'
}

export const Terms = ({contentView}: TermsType) => {

    const auth = useAppSelector(selectAuthStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (auth) {

            dispatch(fetchUser())
        }
    },[dispatch, auth])

    return(
        <div>
            {contentView === 'rules' ? <Rules/> : <Agreement/>}
        </div>
    )
};

