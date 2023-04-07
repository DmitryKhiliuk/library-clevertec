export const formatDate = (dateISO:string | undefined) => {
    const dateTimestamp = Date.parse(dateISO!)
    const day = new Date(dateTimestamp).getDate()
    const month = `${0}${new Date(dateTimestamp).getMonth() + 1 }`
    const dateForButton = `${day}.${month}`

    return dateForButton
}

export const formatDateForCard = (dateISO:string | undefined) => {
    const dateTimestamp = Date.parse(dateISO!)
    const day = new Date(dateTimestamp).getDate()
    const month = `${0}${new Date(dateTimestamp).getMonth() + 1 }`
    const dateForCard = `${day}.${month}`

    return dateForCard
}
