import {ChangeEvent, useState} from 'react';
import cn from 'classnames';

import button from '../../assets/icons/calendar/throughCalendar.png'
import {selectDateOrder} from '../../common/selectors';
import {addDateOrderAC} from '../../redux/booking-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {formatDate, getDayForCalendar, getDayWeek} from '../../utils/date';

import styles from './calendar.module.scss';

type CalendarType = {
    getDateFromCalendar: (date:string) => void
}

export const Calendar = ({getDateFromCalendar}:CalendarType) => {

    const dateOrder = useAppSelector(selectDateOrder)
    const dispatch = useAppDispatch()

    const weekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]
    const  weekEndIndex = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41]
    const mountDays:number[] = []


    const date = new Date
    const yearNow = date.getFullYear()
    const monthNow = date.getMonth()
    const dateNow = date.getDate()

    const [value, setValue] = useState(String(monthNow));
    const [selectedBookToday, setSelectedBookToday] = useState<number|null>(null)
    const [selectedBookTomorrow, setSelectedBookTomorrow] = useState<number|null>(null)


    function handleChange(event:ChangeEvent<HTMLSelectElement>) {
        setValue(event.currentTarget.value);
    }

    const month = +value

    const indexBeginningWeek = formatDate(yearNow, month, 1).getDay()  // день недели на начало месяца
    const indexEndingWeek = formatDate(yearNow, month + 1, 0).getDay()  // день недели на конец месяца
    const monthCount = formatDate(yearNow, month + 1, 0).getDate() // количество дней в месяце
    const monthBeforeCount = formatDate(yearNow, month, 0).getDate() // количество дней в предыдущем месяце
    const currentYear = formatDate(yearNow, +value, dateNow).getFullYear()
    const currentMonth = formatDate(yearNow, +value, dateNow).getMonth()
    const currentWeekDay = formatDate(yearNow, +value, dateNow).getDay()


    const checkForCurrentDay = (day:number) => formatDate(currentYear, currentMonth, day).toDateString() === date.toDateString()

    const lastDayForBooking = (day:number, currDay:number) => day !== 5 && day !== 6 && checkForCurrentDay(currDay - 1)

    const dayBeginningWeek = getDayWeek(indexBeginningWeek) // день недели на начало месяца
    const dayEndingWeek = getDayWeek(indexEndingWeek) // день недели на конец месяца

    getDayForCalendar(monthCount, mountDays, yearNow, month, monthBeforeCount, dayBeginningWeek, dayEndingWeek)

    const onClickHandlerForDown = () => {
        setValue(String(Number(value) - 1))
    }
    const onClickHandlerForUp = () => {
        setValue(String(Number(value) + 1))
    }

    const correctDate = (day: number) => {
        const date = new Date(formatDate(currentYear, currentMonth, day).getTime() + 10800000)

        return date
    }

    const onClickHandlerForCurrentDate = (day: number) => {
        dispatch(addDateOrderAC(''))
        setSelectedBookToday(day)
        setSelectedBookTomorrow(null)
        if (currentWeekDay !== 6 && currentWeekDay !== 0) {
            getDateFromCalendar(correctDate(day).toISOString())
        }

    }
    const onClickHandlerForLastDate = (day:number) => {
        dispatch(addDateOrderAC(''))
        setSelectedBookTomorrow(day)
        setSelectedBookToday(null)
        getDateFromCalendar(correctDate(day).toISOString())
    }

    return (
        <div className={styles.main} data-test-id='calendar'>
            <div className={styles.selectBlock}>
                <select data-test-id='month-select' value={value}   onChange={handleChange} className={styles.select}>
                    {months.map((el, index ) => <option value={`${index}`}>{`${(+value < 0) ? months[currentMonth] : el} ${currentYear}`}</option>)}
                </select>
                <div className={styles.throughButtons}>
                    <button onClick={onClickHandlerForDown} type='button' data-test-id='button-prev-month'> <img src={button} alt=""/> </button>
                    <button onClick={onClickHandlerForUp} className={styles.up} type='button' data-test-id='button-next-month'> <img src={button} alt=""/> </button>

                </div>
            </div>
            <div className={styles.weekDaysBlock}>
                {weekDays.map((el) => <div className={styles.weekDay}>{el}</div>)}
            </div>
            <div className={styles.daysBlock} >
                {mountDays.map((el, index) => {
                    if (checkForCurrentDay(el)) {
                        return <button data-test-id='day-button' disabled={currentWeekDay === 6 || currentWeekDay === 0} onClick={() => onClickHandlerForCurrentDate(el)} className={cn(styles.currentDate, (index === weekEndIndex.find((n)=> n === index)) && styles.weekEnd, selectedBookToday && styles.selected, correctDate(el).toISOString() === dateOrder && styles.selected) } type='button'>{el}</button>
                    }
                    if ( lastDayForBooking(currentWeekDay, el)) {
                        return <button data-test-id='day-button' onClick={() => onClickHandlerForLastDate(el)} className={cn(styles.nextDate, selectedBookTomorrow && styles.selected, correctDate(el).toISOString() === dateOrder && styles.selected)} type='button'>{el}</button>
                    }
                    if (currentWeekDay === 5 && checkForCurrentDay(el - 3)) {
                        return <button data-test-id='day-button' onClick={() => onClickHandlerForLastDate(el)}  className={cn(styles.nextDate, selectedBookTomorrow && styles.selected, correctDate(el).toISOString() === dateOrder && styles.selected)} type='button'>{el}</button>
                    }
                    if (currentWeekDay === 6 && checkForCurrentDay(el - 2)) {
                        return <button data-test-id='day-button' onClick={() => onClickHandlerForLastDate(el)} className={cn(styles.nextDate, selectedBookTomorrow && styles.selected, correctDate(el).toISOString() === dateOrder && styles.selected)} type='button'>{el}</button>
                    }

                       return <div data-test-id='day-button' className={cn(styles.monthDay, (index === weekEndIndex.find((n)=> n === index)) && styles.weekEnd)}>{el}</div>

                } )}
            </div>

        </div>
    );
};
