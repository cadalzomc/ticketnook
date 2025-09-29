<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <ClientOnly>
      <UNavigationMenu :items="items" />
    </ClientOnly>

    <template #right>
      <ClientOnly>
        <UNavigationMenu :items="itemsAuth" />
      </ClientOnly>
      <UColorModeButton class="cursor-pointer" />
      <UButton
        to="https://github.com/cadalzomc"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UHeader>

  <UMain>
    <UContainer class="mt-10">
      <slot />
    </UContainer>
  </UMain>

  <USeparator icon="i-simple-icons-nuxtdotjs" />

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        ticketnook Hub • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/cadalzomc"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Movies",
    to: "/movies",
    active: route.path === "/movies",
  },
  {
    label: "Book a seat",
    to: "/bookseat",
    active: route.path === "/bookseat",
  },
  {
    label: "Services",
    to: "/services",
    active: route.path === "/services",
  },
]);

const itemsAuth = computed<NavigationMenuItem[]>(() => [
  {
    label: "Login",
    to: "/login",
    active: route.path === "/login",
  },
]);
</script>
