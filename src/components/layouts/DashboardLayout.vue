<script lang="ts" setup></script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="navbar">
        <div class="navbar-start lg:hidden">
          <label for="my-drawer-2" class="btn btn-ghost drawer-button">
            <i class="bx bx-menu"></i>
          </label>
        </div>
        <div class="navbar-center lg:navbar-start">
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
      </div>
      <RouterView />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li class="menu-title">POS</li>
        <li>
          <RouterLink to="/" active-class="active">Home</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
