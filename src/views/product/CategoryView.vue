<template>
  <DialogModal id="category-create">
    <CategoryForm />
  </DialogModal>
  <CardContent title="Categories">
    <template #actions>
      <div class="card-actions">
        <button class="btn" @click="openModal('category-create')">
          <i class="bx bx-message-square-add"></i>
        </button>
      </div>
    </template>
    <template #content>
      <CategoryTable />
    </template>
  </CardContent>
</template>

<script setup lang="ts">
import CategoryTable from '@/components/displays/products/CategoryTable.vue'
import CategoryForm from '@/components/forms/product/CategoryForm.vue'
import CardContent from '@/components/displays/CardContent.vue'
import DialogModal from '@/components/displays/DialogModal.vue'
import { openModal } from '@/components'
</script>

<style scoped></style>
