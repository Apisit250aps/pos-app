<template>
  <DialogModal id="category-edit">
    <CategoryForm :data="category" />
  </DialogModal>
  <div class="overflow-x-auto">
    <!-- head -->
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Menu count</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(item, index) in product.categories" :key="index" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.menuCount }}</td>
          <td>{{ item.description }}</td>
          <td class="text-end">
            <label class="btn btn-sm me-3 btn-warning" for="category-edit" @click="setEdit(item)">
              <i class="bx bx-pencil"></i>
            </label>
            <button class="btn btn-sm btn-error btn-outline" @click="setDelete(item)">
              <i class="bx bx-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { useProductStore, type ICategory } from '@/stores/product'
import DialogModal from '../DialogModal.vue'
import CategoryForm from '@/components/forms/product/CategoryForm.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { deleteMenuCategory } from '@/services/menu'
import { openModal } from '@/components'
const product = useProductStore()

const category = ref<ICategory>()
const setEdit = (data: ICategory) => {
  openModal('category-edit')
  category.value = data
}

const setDelete = (data: ICategory) => {
  // delete category
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't to delete category!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteMenuCategory(data._id)
      Swal.fire('Deleted!', 'Category has been deleted.', 'success')
      product.categories = product.categories.filter((c) => c._id !== data._id)
    }
  })
}
</script>
