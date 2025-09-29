<template>
  <UCard
    class="overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out"
    variant="subtle"
    :ui="{
      body: '!p-0',
    }"
  >
    <div class="relative overflow-hidden h-64">
      <img
        :src="movie.posterUrl"
        :alt="movie.title"
        class="w-full h-full object-cover group-hover:scale-105 cinema-transition"
      />
      <div class="absolute top-3 right-3">
        <span
          class="px-2 py-1 bg-info text-info-50 text-xs font-medium rounded-full capitalize"
        >
          {{ movie.genre }}
        </span>
      </div>
      <div class="absolute bottom-3 left-3 right-3">
        <div class="flex items-center space-x-1 text-white text-sm">
          <UIcon name="i-heroicons-star-solid" class="text-yellow-400" />
          <span class="font-medium">{{ movie.rating }}</span>
          <span class="opacity-80">(50 reviews)</span>
        </div>
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-semibold text-foreground mb-2 line-clamp-1">
        {{ movie.title }}
      </h3>

      <p class="text-muted-foreground text-sm mb-3 line-clamp-2">
        {{ movie.description }}
      </p>

      <div class="space-y-2 mb-4">
        <div class="flex items-center space-x-2 text-sm text-muted-foreground">
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
          <span>{{ movie.address }} New City, CA</span>
        </div>

        <div class="flex items-center space-x-2 text-sm text-muted-foreground">
          <UIcon name="i-heroicons-clock" class="w-4 h-4" />
          <span>2:00 PM, 5:30 PM, 8:45 PM +1 more</span>
        </div>

        <div class="flex items-center space-x-2 text-sm text-muted-foreground">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
          <span>150 min • English</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-lg font-bold text-foreground">$12.99</div>

        <UButton
          color="primary"
          :to="`/movies/${movie.id}`"
          size="lg"
          class="cursor-pointer"
        >
          View Details
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </UButton>
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
