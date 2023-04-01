
export const formatDate = (year:number, month:number, day:number) => new Date(year, month, day)

export const getDayForCalendar = (monthCount:number,
                                  mountDays:number[],
                                  yearNow:number,
                                  month:number,
                                  monthBeforeCount:number,
                                  dayBeginningWeek:number,
                                  dayEndingWeek:number) => {

    for (let i = 1; i <= monthCount; i++) {
        mountDays.push(formatDate(yearNow, month, i).getDate())      // заполнение датами основного месяца
    }
    for (let i = 0; i < dayBeginningWeek-1; i++) {
        mountDays.unshift(monthBeforeCount - i)  // заполнение датами предыдущего месяца
    }
    for (let i = 1; i <= (dayEndingWeek&&(7 - dayEndingWeek)); i++) {
        mountDays.push(i)                                     // заполнение датами следующего месяца
    }
}

export const getDayWeek = (indexWeek: number) => {  // день недели
    let day

    if (indexWeek === 0) {
        day = 7;
    } else {
        day = indexWeek;
    }

    return day
}

