export interface User {
  id?: number
  logname?: string
  email: string,
  password: string,
  role?: String // ???
}
export interface Activate {
  token: string
}

export interface Category {
  id?: number
  name: string
}
export interface Book {
  author?: string;
  bookYear?: number;
  category?: Category;
  createdAt?: string;
  description?: string;
  id?: number;
  image?: File;
  bookFile?: File;
  rate?: number;
  title?: string;
}
  export interface BookFile {
  id?: number,
    fileName?: string,
    fileType?: string,
    data: File
  }
export interface PageableBooks {
  content?: Array<Book>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface Feedback {
  note: number,
  comment?: string,
  createdAt?: Date,
  user?: User
}
export interface PageableFeedbacks {
  content?: Array<Feedback>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
