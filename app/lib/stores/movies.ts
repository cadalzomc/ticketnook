import { defineStore } from "pinia";
import type {
  IMovie,
  IMovieState,
  IReservation,
  ISeat,
  IShowtime,
} from "../models";

const staticMovies: IMovie[] = [
  {
    id: "1",
    title: "The Great Adventure",
    description:
      "An epic journey through unknown lands filled with danger and wonder.",
    posterUrl:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    genres: ["Adventure", "Action"],
    duration: 150,
    rating: "PG-13",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "Mystery of the Lost City",
    description:
      "A thrilling mystery that will keep you on the edge of your seat.",
    posterUrl:
      "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400",
    genres: ["Mystery", "Thriller"],
    duration: 125,
    rating: "PG-13",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    title: "Comedy Central",
    description:
      "A hilarious comedy that will make you laugh until your sides hurt.",
    posterUrl:
      "https://images.pexels.com/photos/7991228/pexels-photo-7991228.jpeg?auto=compress&cs=tinysrgb&w=400",
    genres: ["Comedy", "Romance"],
    duration: 105,
    rating: "PG",
    createdAt: new Date("2024-02-01"),
  },
];

const generateShowtimes = (): IShowtime[] => {
  const showtimes: IShowtime[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0] ?? "";

    staticMovies.forEach((movie, movieIndex) => {
      const times = ["10:00", "13:30", "17:00", "20:30"];
      times.forEach((time, timeIndex) => {
        showtimes.push({
          id: `${movie.id}-${i}-${timeIndex}`,
          movieId: movie.id,
          date: dateStr,
          time,
          price: 12.99,
          totalSeats: 48,
          availableSeats: 48,
          screen: `Screen ${(movieIndex % 3) + 1}`,
        });
      });
    });
  }

  return showtimes;
};

const generateSeats = (showtimes: IShowtime[]): ISeat[] => {
  const seats: ISeat[] = [];
  const rows = ["A", "B", "C", "D", "E", "F"];

  showtimes.forEach((showtime) => {
    rows.forEach((row) => {
      for (let i = 1; i <= 8; i++) {
        seats.push({
          id: `${showtime.id}-${row}${i}`,
          showtimeId: showtime.id,
          row,
          number: i,
          isReserved: false,
        });
      }
    });
  });

  return seats;
};

const initialShowtimes = generateShowtimes();
const initialSeats = generateSeats(initialShowtimes);

export const useMovieStore = defineStore("movies", {
  state: (): IMovieState => ({
    movies: [...staticMovies],
    showtimes: initialShowtimes,
    seats: initialSeats,
    reservations: [],
  }),

  getters: {
    getMovieById: (state) => (id: string) => {
      return state.movies.find((movie) => movie.id === id);
    },

    getShowtimesByMovie: (state) => (movieId: string) => {
      return state.showtimes.filter((showtime) => showtime.movieId === movieId);
    },

    getShowtimesByDate: (state) => (date: string) => {
      return state.showtimes.filter((showtime) => showtime.date === date);
    },

    getSeatsByShowtime: (state) => (showtimeId: string) => {
      return state.seats.filter((seat) => seat.showtimeId === showtimeId);
    },

    getUserReservations: (state) => (userId: string) => {
      return state.reservations
        .filter((reservation) => reservation.userId === userId)
        .map((reservation) => ({
          ...reservation,
          movie: state.movies.find((m) => m.id === reservation.movieId),
          showtime: state.showtimes.find(
            (s) => s.id === reservation.showtimeId
          ),
          seats: state.seats.filter((s) => reservation.seatIds.includes(s.id)),
        }));
    },

    getAllReservations: (state) => {
      return state.reservations.map((reservation) => ({
        ...reservation,
        movie: state.movies.find((m) => m.id === reservation.movieId),
        showtime: state.showtimes.find((s) => s.id === reservation.showtimeId),
        seats: state.seats.filter((s) => reservation.seatIds.includes(s.id)),
      }));
    },

    getRevenueReport: (state) => {
      const totalRevenue = state.reservations
        .filter((r) => r.status === "confirmed")
        .reduce((sum, r) => sum + r.totalAmount, 0);

      const totalReservations = state.reservations.filter(
        (r) => r.status === "confirmed"
      ).length;
      const totalSeatsReserved = state.reservations
        .filter((r) => r.status === "confirmed")
        .reduce((sum, r) => sum + r.seatIds.length, 0);

      return {
        totalRevenue,
        totalReservations,
        totalSeatsReserved,
        averageReservationValue:
          totalReservations > 0 ? totalRevenue / totalReservations : 0,
      };
    },
  },

  actions: {
    addMovie(movie: Omit<IMovie, "id" | "createdAt">) {
      const newMovie: IMovie = {
        ...movie,
        id: (this.movies.length + 1).toString(),
        createdAt: new Date(),
      };
      this.movies.push(newMovie);
      return newMovie;
    },

    updateMovie(id: string, updates: IMovie) {
      const index = this.movies.findIndex((m) => m.id === id);
      if (index !== -1) {
        this.movies[index] = { ...this.movies[index], ...updates };
        return this.movies[index];
      }
      return null;
    },

    deleteMovie(id: string) {
      const index = this.movies.findIndex((m) => m.id === id);
      if (index !== -1) {
        this.movies.splice(index, 1);
        // Also remove associated showtimes
        this.showtimes = this.showtimes.filter((s) => s.movieId !== id);
        return true;
      }
      return false;
    },

    addShowtime(showtime: Omit<IShowtime, "id">) {
      const newShowtime: IShowtime = {
        ...showtime,
        id: `showtime-${Date.now()}`,
      };
      this.showtimes.push(newShowtime);

      const rows = ["A", "B", "C", "D", "E", "F"];
      rows.forEach((row) => {
        for (let i = 1; i <= 8; i++) {
          this.seats.push({
            id: `${newShowtime.id}-${row}${i}`,
            showtimeId: newShowtime.id,
            row,
            number: i,
            isReserved: false,
          });
        }
      });

      return newShowtime;
    },

    makeReservation(
      userId: string,
      showtimeId: string,
      seatIds: string[]
    ): boolean {
      const requestedSeats = this.seats.filter(
        (seat) => seatIds.includes(seat.id) && seat.showtimeId === showtimeId
      );

      if (requestedSeats.some((seat) => seat.isReserved)) {
        return false; // Some seats are already reserved
      }

      const showtime = this.showtimes.find((s) => s.id === showtimeId);
      if (!showtime) return false;

      requestedSeats.forEach((seat) => {
        seat.isReserved = true;
        seat.reservedBy = userId;
      });

      showtime.availableSeats -= seatIds.length;

      const reservation: IReservation = {
        id: `res-${Date.now()}`,
        userId,
        showtimeId,
        movieId: showtime.movieId,
        seatIds,
        totalAmount: seatIds.length * showtime.price,
        status: "confirmed",
        createdAt: new Date(),
      };

      this.reservations.push(reservation);
      return true;
    },

    cancelReservation(reservationId: string, userId: string): boolean {
      const reservation = this.reservations.find((r) => r.id === reservationId);
      if (!reservation || reservation.userId !== userId) {
        return false;
      }

      const showtime = this.showtimes.find(
        (s) => s.id === reservation.showtimeId
      );
      if (!showtime) return false;

      const showtimeDateTime = new Date(`${showtime.date} ${showtime.time}`);
      if (showtimeDateTime < new Date()) {
        return false;
      }

      const reservedSeats = this.seats.filter((seat) =>
        reservation.seatIds.includes(seat.id)
      );

      reservedSeats.forEach((seat) => {
        seat.isReserved = false;
        seat.reservedBy = undefined;
      });

      showtime.availableSeats += reservation.seatIds.length;

      reservation.status = "cancelled";

      return true;
    },
  },
});
