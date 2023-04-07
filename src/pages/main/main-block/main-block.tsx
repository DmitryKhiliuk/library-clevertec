import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames'

import search from '../../../assets/icons/search.svg';
import {selectAuthStatus, selectBooks} from '../../../common/selectors';
import {FilterButton, RoundButton} from '../../../components/buttons';
import {DisplayView} from '../../../components/display-view';
import {fetchBooks} from '../../../redux/books-reducer';
import {fetchCategories} from '../../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';

import cancel from './input-search-cancel-button.svg'
import {MainContent} from './main-content';

import styles from './main-block.module.scss'
import {fetchUser} from "../../../redux/user-reducer";


export const MainBlock = () =>  {

    const dispatch = useAppDispatch()
    const books = useAppSelector(selectBooks)
    const auth = useAppSelector(selectAuthStatus)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {

            dispatch(fetchBooks())
            dispatch(fetchUser())
            dispatch(fetchCategories())
        }
    },[dispatch, navigate, auth])

    const [gridContent, setGridContent] = useState(true)
    const [deployedInput, setDeployedInput] = useState(false)
    const [value, setValue] = useState('')

    const onClickHandlerForGridButton = () => {
        setGridContent(true)
    }
    const onClickHandlerForRowButton = () => {
        setGridContent(false)
    }

    const onClickHandlerForInput = () => {
        if (window.innerWidth < 700) {
            setDeployedInput(true)
        }
    }

    const onClickCancel = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeployedInput(false)
    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const [down, setDown] = useState(true)

    const isSorted = () => {
        setDown(!down)
    }

    return (
        <section className={styles.mainPage}>
            {books.length > 0 && <nav className={styles.navSettings}>
                <div className={styles.formBox}>
                    <div className={cn(styles.inputBox, deployedInput && styles.deployedInput)} >
                        <img src={search} alt='alt'/>
                        <input data-test-id='input-search' onChange={onChangeHandler}  type="search" className={styles.input} placeholder="Поиск книги или автора…" />
                        {deployedInput&&<button type='button' onClick={onClickCancel} data-test-id='button-search-close'><img src={cancel} alt="cancel"/></button>}
                    </div>
                    <div data-test-id='button-search-open'>
                        <RoundButton callButton={onClickHandlerForInput} image={search} className={`${cn(styles.searchButton, deployedInput && styles.noneButton)}`}  />
                    </div>
                    {!deployedInput && <FilterButton value={down} callBack={isSorted}/>}
                </div>
                {!deployedInput &&
                    <div className={styles.btnBox}>
                        <div data-test-id="button-menu-view-window">
                            <DisplayView callBack={onClickHandlerForGridButton}
                                         gridContent={gridContent} purposeButton="g"
                            />
                        </div>
                        <div data-test-id="button-menu-view-list">
                            <DisplayView callBack={onClickHandlerForRowButton}
                                         gridContent={gridContent} purposeButton="r"
                            />
                        </div>
                    </div>
                }
            </nav>}
            <MainContent grid={gridContent} value={value} sort={down}/>
        </section>
    );
}

