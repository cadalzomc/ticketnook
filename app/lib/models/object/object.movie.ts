import type { TReservationStatus } from "~/types/app.types";

export interface IMovie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  genres: string[];
  duration: number;
  rating: string;
  createdAt: Date;
}

export interface IShowtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  screen: string;
}

export interface ISeat {
  id: string;
  showtimeId: string;
  row: string;
  number: number;
  isReserved: boolean;
  reservedBy?: string;
}

export interface IReservation {
  id: string;
  userId: string;
  showtimeId: string;
  movieId: string;
  seatIds: string[];
  totalAmount: number;
  status: TReservationStatus;
  createdAt: Date;
}

export interface IMovieState {
  movies: IMovie[];
  showtimes: IShowtime[];
  seats: ISeat[];
  reservations: IReservation[];
}
