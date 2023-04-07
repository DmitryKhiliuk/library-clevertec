import {useNavigate, useParams} from 'react-router-dom';

import {selectBooks, selectCategories, selectStatus} from '../../../../common/selectors';
import {BooksType} from '../../../../common/types';
import {Card} from '../../../../components/card';
import {resetBookAC} from '../../../../redux/book-reducer';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';

import styles from './main-content.module.scss'

type MainContentType = {
    grid: boolean
    value: string
    sort: boolean
}

export const MainContent = ({grid, value, sort}: MainContentType) => {

    const books = useAppSelector(selectBooks)
    const categories = useAppSelector(selectCategories)
    const status = useAppSelector(selectStatus)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {category} = useParams()

    /* ---------------------------search and filter content-------------------------------------- */

    const currentCategory = categories.find((el) => el.path === category)
    const categoryName = currentCategory?.name
    const booksInThisCategory = books.filter((book) => book.categories.find((ctgrs) => ctgrs === categoryName))

    let selectCategoryBooks: BooksType

    const filteringSearch = (filtrableBooks: BooksType) => filtrableBooks.filter((el) => {
        const keys: string[] = []

        el.authors.forEach((auth) => keys.push(auth))
        keys.push(el.title)

        return keys.find((auth) => auth.toLowerCase().includes(value.toLowerCase()))
    })

    if (category === 'all') {
        selectCategoryBooks = filteringSearch(books)
    } else {
        selectCategoryBooks = filteringSearch(booksInThisCategory)
    }

    /* ---------------------------sort content----------------------------------------- */

    selectCategoryBooks.sort((a,b) => (sort ? b.rating  - a.rating: a.rating - b.rating) )

    /* ---------------------------grid or row view content----------------------------------------- */

    const getContentOrder = () => grid ? `${styles.contentGrid}` : `${styles.contentGrid} ${styles.contentRow}`
    const contentOrder = getContentOrder()

    /* ---------------------------navigate to bookId----------------------------------------- */

    const onClickHandler = (id: number) => {
        dispatch(resetBookAC({}))
        navigate(`${id}`)
    }



    const empty = () => (status==='succeeded')&&<div className={styles.empty}>{value?<h3 data-test-id='search-result-not-found'>По запросу ничего не найдено</h3>:<h3  data-test-id='empty-category'>В этой категории книг ещё нет</h3>}</div>

    const withoutBooks = empty()


    return (
        <div data-test-id='content'>
            {selectCategoryBooks.length ?
                <div className={contentOrder}>
                    {selectCategoryBooks.map((book) => <div key={book.id} role='button' tabIndex={0}
                                                            onClick={() => onClickHandler(book.id)}
                                                            onKeyDown={() => onClickHandler(book.id)}
                                                            >
                        <Card id={book.id} grid={grid} value={value}/>
                    </div>)}
                </div> :
                withoutBooks}
        </div>
    );
};

