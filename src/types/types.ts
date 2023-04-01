export type BookingType = {
    id: number
    order: boolean
    dateOrder: string
    customerId: number
    customerFirstName: string
    customerLastName: string
}

export type DeliveryType = {
    id: number
    handed: boolean
    dateHandedFrom: string
    dateHandedTo: string
    recipientId: number
    recipientFirstName: string
    recipientLastName: string
}

export type HistoriesType = {
    id: number
    userId: number
}

export type ImageType = {
    url: string
}

export type CommentType = {
    id: number
    rating: number
    text: string
    createdAt: string
    user: {
        commentUserId: number
        firstName: string
        lastName: string
        avatarUrl: string
    }
}

export  type BookType = {
    issueYear: string
    rating: number
    title: string
    authors: string[]
    image: ImageType | null
    categories: string[]
    id: number
    booking: BookingType | null
    delivery: DeliveryType | null
    histories: HistoriesType[] | null
}

export type BooksType = BookType[];

export type BookDetailType = {
    id: number
    title: string
    rating: number
    issueYear: string
    description: string
    publish: string
    pages: string
    cover: string
    weight: string
    format: string
    ISBN: string
    producer: string
    authors: string[]
    images: ImageType[]
    categories: string[]
    comments: CommentType[] | null
    booking: BookingType | null
    delivery: DeliveryType | null
    histories: HistoriesType[] | null

}

export type CategoriesItemType = {
    id: number
    name:  string
    path: string
}

export type CategoriesType = CategoriesItemType[]

export type ErrorType = {
    data: null
    error: {
        status: number
        name: string
        message: string
        details: null
    }
}

export type AppStatusType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    auth: boolean
}

/* AUTH */

export type AuthDataType = {
    identifier: string
    password: string
    username: string
}

export type RegistrationDataType = {
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
    email: string
}

export type ChangeDataType = {
    login: string
    password: string
    firstName: string
    lastName: string
    phone: string
    email: string
}

export type ResetDataType = {
    email: string
}

export type RecoveryDataType = {
    password: string
    passwordConfirmation: string
    code: string
}

/* BOOKING */

export type RequestBookingType = {
    data:{order: boolean,
        dateOrder: string,
        book: number,
        customer: number}
}

/* COMMENTS */

export type RequestCommentType = {
    data:{
        rating: number,
        text: string,
        book: number,
        user: number}
}

/* USER */

export type UserRole = {
    id: number
    name: string
    description: string
    type: string
}

export type UserCommentType = {
    id: number
    rating: number
    text: null | string
    bookId: number
}

export type UserBookingType = {
    id: number
    order: boolean
    dateOrder: string
    book: UserBookType
}

export type UserBookType = {
    id: number
    title: string
    rating: number
    issueYear: string
    authors: string[]
    image: ImageType | null
}

export type UserDeliveryType = {
    id: number
    handed: boolean
    dateHandedFrom: string
    dateHandedTo: string
    book: UserBookType
}

export type UserHistoryType = {
    id: number
    books: UserBookType[]
}

export type UserType = {
    id: 7
    username: string
    email: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    firstName: string
    lastName: string
    phone: string
    role: UserRole
    comments: UserCommentType[],
    avatar: string,
    booking: UserBookingType | null
    delivery: UserDeliveryType | null
    history: UserHistoryType | null
}


export type DataType = AuthDataType | RegistrationDataType | ResetDataType | RecoveryDataType

