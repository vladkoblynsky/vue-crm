<template>
  <v-app>
    <v-main>
      <div class="empty-layout flex h-full">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
  .empty-layout {
    position: relative;
    background-color: #cfd8dc;
  }
</style>
