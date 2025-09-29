<template>
  <main className="pt-4 max-w-7xl mx-auto px-4 lg:px-6">
    <div className="grid grid-cols-5 gap-8 mb-12">
      <div className="col-span-2">
        <div class="relative">
          <div class="aspect-[2/3] w-full max-w-md">
            <img
              :src="movie.posterUrl"
              :alt="movie.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            class="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ movie.rating }}/10
          </div>

          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex flex-wrap gap-2 mb-3">
              <UBadge
                v-for="genre in movie.genre"
                :key="genre"
                variant="soft"
                color="info"
              >
                {{ genre }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <MovieInfo />
      </div>

      <!-- {/* Movie Information */}
        <div className="lg:col-span-3">
          <MovieInfo movie="{movie}" />
        </div> -->
    </div>

    <!-- {/* Showtimes Section */}
      <div className="mb-12">
        <ShowtimeGrid showtimes="{mockShowtimes}" />
      </div>

      {/* Additional Content */}
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Trailer Section */}
        <div>
          <MovieTrailer movie="{movie}" />
        </div>

        {/* Reviews Section */}
        <div>
          <MovieReviews reviews="{mockReviews}" />
        </div>
      </div> -->
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
import type { IMovie } from "~/lib/models";
import { useMovieStore } from "~/lib/stores";
const movieStore = useMovieStore();

const movie = movieStore.movies.find(
  (m: IMovie) => m.id === route.params.id
) as IMovie;
</script>
