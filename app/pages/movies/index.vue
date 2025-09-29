<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <MovieCard
      v-for="theater in movieStore.movies"
      :key="theater.id"
      :movie="theater"
    />
  </div>
</template>

<script setup lang="ts">
import type { IShowtime } from "~/lib/models";
import { useAuthStore, useMovieStore } from "~/lib/stores";

const movieStore = useMovieStore();
const authStore = useAuthStore();
const toast = useToast();

const today = new Date().toISOString().split("T")[0] ?? "";
const maxDate = (() => {
  const date = new Date();
  date.setDate(date.getDate() + 6);
  return date.toISOString().split("T")[0];
})();

const selectedDate = ref(today);

const formatSelectedDate = computed(() => {
  return new Date(selectedDate.value).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
});

const getMovieShowtimes = (movieId: string): IShowtime[] => {
  return movieStore.showtimes.filter(
    (showtime: IShowtime) =>
      showtime.movieId === movieId && showtime.date === selectedDate.value
  );
};

const goToReservation = (movieId: string, showtimeId: string) => {
  if (!authStore.isLoggedIn) {
    toast.add({
      title: "Login Required",
      description: "Please login to make a reservation",
      color: "error",
    });
    navigateTo("/login");
    return;
  }
  navigateTo(`/reserve/${movieId}/${showtimeId}`);
};
</script>
