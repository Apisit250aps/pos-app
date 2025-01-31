<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="text-end">#</th>
          <th class="text-end">Name</th>
          <th class="text-end">Cost</th>
          <th class="text-end">Quantity</th>
          <th class="text-end">Item Quantity</th>
          <th class="text-end">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(inv, index) in inventory.inventories" :key="index" class="hover">
          <th class="text-end">{{ index + 1 }}</th>
          <td class="text-end">{{ inv.itemName }}</td>
          <td class="text-end">{{ inv.cost }}</td>
          <td class="text-end">{{ inv.quantity }} {{ inv.unit }}</td>
          <td class="text-end">{{ inv.itemQuantity }} {{ inv.unit }}</td>
          <td class="text-end">{{ inv.stock }} {{ inv.stockUnit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
const inventory = useInventoryStore()
</script>

<style scoped></style>
