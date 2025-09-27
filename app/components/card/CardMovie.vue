<template>
  <UCard
    class="overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out"
  >
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/3">
        <img
          :src="movie.posterUrl"
          :alt="movie.title"
          class="w-full h-48 md:h-full object-cover rounded-sm"
        />
      </div>

      <div class="flex-1 p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {{ movie.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ formatSelectedDate }}
            </p>
          </div>

          <div class="flex items-center gap-1 text-sm">
            <UIcon name="i-heroicons-star-solid" class="text-yellow-400" />
            <span class="font-medium">{{ movie.rating }}</span>
          </div>
        </div>

        <div class="space-y-2 mb-4">
          <div
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
            <span>{{ movie.address }} New City, CA</span>
          </div>
          <div
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            <span>{{ movie.duration }} mins</span>
          </div>
        </div>

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

        <div class="flex mt-4">
          <UButton color="primary" to="/" size="lg" class="cursor-pointer">
            Buy Tickets
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const today = new Date().toISOString().split("T")[0] ?? "";
const selectedDate = ref(today);

const formatSelectedDate = computed(() => {
  return new Date(selectedDate.value).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
});
</script>
