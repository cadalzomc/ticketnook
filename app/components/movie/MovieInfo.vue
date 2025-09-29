<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl lg:text-4xl font-bold text-foreground mb-2"></h1>
      <div class="flex flex-wrap items-center gap-4 text-muted-foreground">
        <div class="flex items-center space-x-1">
          <Icon name="Calendar" size="{16}" />
          <span>2025</span>
        </div>
        <div class="flex items-center space-x-1">
          <Icon name="Clock" size="{16}" />
          <span>150 min</span>
        </div>
        <div class="flex items-center space-x-1">
          <Icon name="Star" size="{16}" />
          <span>8/10</span>
        </div>
        <div class="flex items-center space-x-1">
          <Icon name="Users" size="{16}" />
          <span>18+</span>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold text-foreground mb-3">Synopsis</h2>
      <p class="text-muted-foreground leading-relaxed">Sypnosis</p>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold text-foreground mb-2">Director</h3>
        <p class="text-muted-foreground">Meigo</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-foreground mb-2">Cast</h3>
        <p class="text-muted-foreground">Meigo</p>
      </div>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-foreground mb-3">Genres</h3>
      <div class="flex flex-wrap gap-2">Action</div>
    </div>
  </div>
</template>
