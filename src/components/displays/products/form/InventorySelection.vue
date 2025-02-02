<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Quantity</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>
        <!-- row -->
        <tr v-for="(item, index) in inventory.inventories" :key="index">
          <th>
            <label>
              <input
                type="checkbox"
                class="checkbox"
                :checked="isExist(item._id)"
                @change="onSelect(item)"
              />
            </label>
          </th>
          <td>{{ item.itemName }}</td>
          <td>{{ item.itemQuantity }} {{ item.unit }}</td>
          <td>{{ item.stock }} {{ item.stockUnit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useInventoryStore, type IInventory } from '@/stores/inventory'
const inventory = useInventoryStore()
const { modelValue } = defineProps<{
  modelValue: IInventory[]
}>()

const emit = defineEmits(['update:modelValue'])

// ฟังก์ชันตรวจสอบว่าสินค้านี้ถูกเลือกหรือไม่
const isExist = (id: string) => {
  return modelValue.some((i) => i._id === id)
}

// ฟังก์ชันเลือก/ยกเลิกสินค้า
const onSelect = (item: IInventory) => {
  let updatedSelected = [...modelValue]

  if (isExist(item._id)) {
    updatedSelected = updatedSelected.filter((i) => i._id !== item._id)
  } else {
    updatedSelected.push(item)
  }

  emit('update:modelValue', updatedSelected)
}
</script>

<style scoped></style>
