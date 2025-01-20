<script lang="ts" setup>
import { useInventoryStore } from '@/stores/inventory'
const inventory = useInventoryStore()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h3>Inventory</h3>
        <div class="card-actions"></div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Item Quantity</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inv, index) in inventory.inventories" :key="index" class="hover">
              <th>{{ index + 1 }}</th>
              <td>{{ inv.itemName }}</td>
              <td>{{ inv.cost }}</td>
              <td>{{ inv.quantity }} {{ inv.unit }}</td>
              <td>{{ inv.itemQuantity }} {{ inv.unit }}</td>
              <td>{{ inv.stock }} {{ inv.stockUnit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
