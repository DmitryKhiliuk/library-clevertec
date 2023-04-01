import axios from 'axios';
import {HOST} from "../constants/routes";
import {RequestBookingType, RequestCommentType} from "../types";




export const instance = axios.create({

    baseURL: HOST,

})

    instance.interceptors.request.use(
       request => {

           request.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`

           return request
       },
        error => {
            console.log(error)
        }
     );

export const booksAPI = {
    getBooks(){
       return  instance.get('/api/books')
    },
    getBookDetail(bookId:number){
        return  instance.get(`/api/books/${bookId}`,)
    },
    getCategories(){
        return  instance.get('/api/categories',)
    },
    booking(param: RequestBookingType){
        return instance.post( '/api/bookings', param)
    },
    reBooking(data: RequestBookingType, bookingId: number) {
        return instance.put(`/api/bookings/${bookingId}`, data)
    },
    deleteBooking(bookingId: number) {
        return instance.delete(`/api/bookings/${bookingId}`)
    },
    comment(param: RequestCommentType) {
        return instance.post('/api/comments', param)
    },
    changeComment(data: RequestCommentType, commentId: number) {
        return instance.put(`/api/comments/${commentId}`, data)
    }
}


