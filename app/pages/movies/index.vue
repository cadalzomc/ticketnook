<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard
      v-for="movie in movieStore.movies"
      :key="movie.id"
      class="overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <template #header>
        <div class="aspect-w-3 aspect-h-4">
          <img
            :src="movie.posterUrl"
            :alt="movie.title"
            class="w-full h-64 object-cover"
          />
        </div>
      </template>

      <div class="space-y-4 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ movie.title }}
          </h3>
          <div class="flex flex-wrap gap-2 mb-3">
            <UBadge
              v-for="genre in movie.genres"
              :key="genre"
              variant="soft"
              color="info"
            >
              {{ genre }}
            </UBadge>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {{ movie.description }}
          </p>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ movie.duration }} min
          </span>
          <UBadge color="primary" variant="solid">
            {{ movie.rating }}
          </UBadge>
        </div>

        <div>
          <h4
            class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
          >
            Showtimes for {{ formatSelectedDate }}:
          </h4>
          <div
            class="grid grid-cols-2 gap-2"
            v-if="getMovieShowtimes(movie.id).length > 0"
          >
            <UButton
              v-for="showtime in getMovieShowtimes(movie.id)"
              :key="showtime.id"
              @click="goToReservation(movie.id, showtime.id)"
              :disabled="showtime.availableSeats === 0"
              :color="showtime.availableSeats > 0 ? 'primary' : 'error'"
              :variant="showtime.availableSeats > 0 ? 'solid' : 'soft'"
              size="sm"
              class="justify-center"
            >
              <div class="text-center">
                <div>{{ showtime.time }}</div>
                <div class="text-xs opacity-75">
                  {{ showtime.availableSeats }}/{{ showtime.totalSeats }}
                </div>
              </div>
            </UButton>
          </div>
          <UAlert
            v-else
            icon="i-heroicons-information-circle"
            color="error"
            variant="soft"
            title="No showtimes available for selected date"
          />
        </div>
      </div>
    </UCard>
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
