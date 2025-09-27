<template>
  <UPageHero
    title="Welcome to TicketNook Hub"
    description="Book your favorite movies and reserve the best seats."
    :links="[
      {
        label: 'Browse Movies',
        class: 'text-sm',
        to: '/movies',
        trailingIcon: 'i-lucide-arrow-right',
        color: 'primary',
        size: 'xl',
      },
      {
        label: 'My Reservation',
        to: 'https://github.com/nuxt-ui-templates/starter',
        class: 'text-sm',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle',
      },
    ]"
  />
</template>
