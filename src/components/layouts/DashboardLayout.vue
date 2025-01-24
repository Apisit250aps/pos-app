<script lang="ts" setup>
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="navbar">
        <div class="navbar-start lg:hidden">
          <label for="my-drawer-2" class="btn btn-ghost drawer-button">
            <i class="bx bx-menu-alt-left"></i>
          </label>
        </div>
        <div class="navbar-center lg:navbar-start">
          <a class="btn btn-ghost text-xl">Cafe`</a>
        </div>
        <div class="navbar-end">
          <label class="swap swap-rotate btn btn-ghost">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" class="theme-controller" value="dark" v-model="ui.theme" />

            <!-- sun icon -->
            <i class="bx bx-sun swap-off"></i>

            <!-- moon icon -->
            <i class="bx bx-moon swap-on"></i>
          </label>
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
          <RouterLink :to="{ name: 'pos' }" active-class="active" :view-transition="true">
            <i class="bx bx-home"></i>
            POS
          </RouterLink>
        </li>
        <li class="menu-title">Stock</li>
        <li>
          <RouterLink :to="{ name: 'inventory' }" active-class="active">
            <i class="bx bx-package"></i>
            Inventory
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'inventory-input' }" active-class="active">
            <i class="bx bxs-package"></i>
            Inventory Input
          </RouterLink>
        </li>
        <li class="menu-title">Product</li>
        <li>
          <RouterLink :to="{ name: 'menu' }" active-class="active">
            <i class="bx bx-book-heart"></i>
            Menu
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'menu-add' }" active-class="active">
            <i class="bx bx-book-add"></i>
            Menu Add
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'category' }" active-class="active">
            <i class="bx bx-library"></i>
            Categories
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul.menu > li {
  margin-bottom: 3px;
}
</style>
