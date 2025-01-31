<template>
  <DialogModal id="item-category-edit">
    <ItemCategoryForm :data="data" />
  </DialogModal>
  <div class="overflow-x-auto min-h-96">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="(item, index) in inventory.categories" :key="index">
          <th>{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="text-end">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-sm m-1">
                <i class="bx bx-dots-vertical-rounded"></i>
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a @click="openEditDialog(item)">
                    <i class="bx bx-pencil"></i>
                    Edit
                  </a>
                </li>
                <li>
                  <a @click="onDelete(item._id)">
                    <i class="bx bx-trash"></i>
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { openModal } from '@/components'
import DialogModal from '../../DialogModal.vue'
import ItemCategoryForm from '../form/ItemCategoryForm.vue'
import { useInventoryStore, type IItemCategory } from '@/stores/inventory'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { deleteItemCategory } from '@/services/inventory'
const inventory = useInventoryStore()
const data = ref<IItemCategory | null>(null)
const openEditDialog = (category: IItemCategory) => {
  data.value = category
  openModal('item-category-edit')
}
const onDelete = (id: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { success, message } = await deleteItemCategory(id)
      Swal.fire({
        icon: success ? 'success' : 'error',
        title: success ? 'Success' : 'Failed',
        text: message,
      })
      inventory.setInventory()
    }
  })
}
</script>
