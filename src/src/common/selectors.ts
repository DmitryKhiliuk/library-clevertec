import {AppRootStateType} from '../redux/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectErrorStatus = (state: AppRootStateType) => state.auth.error
export const selectBookError = (state: AppRootStateType) => state.book.error
export const selectButtonStatus = (state: AppRootStateType) => state.auth.disableButton
export const selectBooks = (state: AppRootStateType) => state.books.content
export const selectCategories = (state: AppRootStateType) => state.navigation
export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectBook = (state: AppRootStateType) => state.book.content
export const selectDataReg = (state: AppRootStateType) => state.auth.registrationDate
export const selectSuccessStatus = (state: AppRootStateType) => state.auth.status
export const selectConfirmedStatus = (state: AppRootStateType) => state.auth.confirmed
export const selectAuthStatus = (state: AppRootStateType) => state.app.auth
export const selectBooksId = (state: AppRootStateType, id: number) => state.books.content.find((el) => el.id === id)
export const selectBooksIdForCard = (state: AppRootStateType, id: number) => state.books.content.find((el) => el.id === id)!.booking?.id
export const selectModal = (state: AppRootStateType) => state.booking.showModal
export const selectBookId = (state: AppRootStateType) => state.booking.bookId
export const selectBookStatus = (state: AppRootStateType) => state.booking.bookStatus
export const selectDateOrder = (state: AppRootStateType) => state.booking.dateOrder
export const selectBookingId = (state: AppRootStateType) => state.booking.bookingId
export const selectOrder = (state: AppRootStateType) => state.error.order
export const selectChangeOrder = (state: AppRootStateType) => state.error.changeOrder
export const selectDeleteOrder = (state: AppRootStateType) => state.error.deleteOrder
export const selectRate = (state: AppRootStateType) => state.error.rate
export const selectChangeRate = (state: AppRootStateType) => state.error.changeRate
export const selectPhoto = (state: AppRootStateType) => state.error.photo
export const selectUser = (state: AppRootStateType) => state.user.user
export const selectComment = (state: AppRootStateType) => state.user.userComment
