<script lang="ts" setup>
import DialogModal from '@/components/displays/DialogModal.vue'
import ItemCategoryForm from '@/components/displays/stocks/form/ItemCategoryForm.vue'
import ItemCategoryTable from '@/components/displays/stocks/table/ItemCategoryTable.vue'
import { openModal } from '@/components'
</script>

<template>
  <DialogModal id="item-category-create">
    <ItemCategoryForm />
  </DialogModal>
  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h5>Inventory Category</h5>
        <button class="btn" @click="openModal('item-category-create')">
          <i class="bx bx-message-square-add"></i>
        </button>
      </div>
      <ItemCategoryTable />
    </div>
  </div>
</template>
