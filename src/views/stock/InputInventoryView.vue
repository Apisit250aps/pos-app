<script lang="ts" setup>
import InputField from '@/components/forms/inputs/InputField.vue'
import { isEmpty, isZero } from '@/libs/data/validations'
import { createInventory } from '@/services/inventory'
import { useInventoryStore, type IInventory } from '@/stores/inventory'
import Swal from 'sweetalert2'
import { computed, ref } from 'vue'
import CardContent from '@/components/displays/CardContent.vue'

//
const inventory = useInventoryStore()
const onEdit = ref<boolean>(false)
const inputItems = ref<IInventory[]>([])
const item = ref<IInventory>({
  itemName: '',
  cost: 0,
  itemQuantity: 0,
  quantity: 0,
  unit: '',
  stock: 0,
  stockUnit: '',
  minStock: 0,
} as IInventory)
const defaultForm = ref<IInventory>({
  itemName: '',
  cost: 0,
  itemQuantity: 0,
  quantity: 0,
  unit: '',
  stock: 0,
  stockUnit: '',
  minStock: 0,
} as IInventory)

const clearForm = () => {
  item.value = { ...defaultForm.value }
  onEdit.value = false
}

const addItem = (e: Event) => {
  e.preventDefault()

  if (isZero(item.value.cost) || isZero(item.value.itemQuantity) || isZero(item.value.stock)) {
    Swal.fire({
      text: 'Cost, Item Quantity, and Stock must be greater than 0',
      icon: 'warning',
    })
    return
  }

  if (isEmpty(item.value.itemName) || isEmpty(item.value.unit) || isEmpty(item.value.stockUnit)) {
    Swal.fire({
      text: 'Item Name, Unit, and Stock Unit must be filled',
      icon: 'warning',
    })
    return
  }

  item.value.quantity = item.value.itemQuantity * item.value.stock
  inputItems.value.push({ ...item.value }) // Avoid reference issues
  clearForm()
}

const setEdit = (inv: IInventory) => {
  const isFormEmpty = JSON.stringify(item.value) === JSON.stringify(defaultForm.value)

  if (!isFormEmpty) {
    Swal.fire({
      icon: 'warning',
      text: 'Do you want to clear the form to edit this item?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        clearForm()
        editItem(inv)
        onEdit.value = true
      }
    })
  } else {
    editItem(inv)
    onEdit.value = true
  }
}

const editItem = (inv: IInventory) => {
  item.value = { ...inv } // Copy values to avoid reference issues
  inputItems.value = inputItems.value.filter((i) => i !== inv) // Remove item from list
  onEdit.value = true
}

const removeItem = (inv: IInventory) =>
  (inputItems.value = inputItems.value.filter((i) => i !== inv))

const totalQuantity = computed(() => item.value.itemQuantity * item.value.stock)
const submitInventory = async () => {
  if (inputItems.value.length === 0) return
  Swal.fire({
    title: 'Submit Inventory',
    text: 'Are you sure you want to submit the inventory?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { success } = await createInventory(inputItems.value)
      if (success) {
        Swal.fire({
          title: 'Inventory Submitted',
          text: 'Inventory has been submitted successfully!',
          icon: 'success',
        })
        inventory.setInventory()
        inputItems.value = []
      }
    }
  })
}
</script>

<template>
  <CardContent title="Inventory Input">
    <template #content>
      <div class="grid grid-cols-1 gap-3">
        <form @submit="addItem">
          <div class="grid grid-cols-2 gap-3">
            <InputField placeholder="Name" label-text="Name" v-model="item.itemName" />
            <InputField
              placeholder="Cost"
              label-text="Cost"
              type="number"
              min="0"
              v-model.number="item.cost"
            />
          </div>
          <div class="grid grid-cols-3 gap-3">
            <InputField
              placeholder="Item Quantity"
              label-text="Item Quantity"
              type="number"
              min="0"
              additional-label="on package"
              v-model.number="item.itemQuantity"
            />
            <InputField
              placeholder="Total Quantity"
              label-text="Quantity"
              type="number"
              min="0"
              v-model="totalQuantity"
              readOnly
            />
            <InputField placeholder="Unit" label-text="Unit" type="text" v-model="item.unit" />
          </div>
          <div class="grid grid-cols-3 gap-3">
            <InputField
              placeholder="Stock"
              label-text="Stock"
              type="number"
              min="0"
              v-model.number="item.stock"
            />
            <InputField
              placeholder="Min Stock"
              label-text="Min Stock"
              type="number"
              min="0"
              v-model.number="item.minStock"
            />
            <InputField
              placeholder="Stock Unit"
              label-text="Stock Unit"
              type="text"
              v-model="item.stockUnit"
            />
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary" :class="{ 'btn-outline': onEdit }">
              {{ onEdit ? 'Update Item' : 'Add Item' }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </CardContent>
  <CardContent title="Item List">
    <template #actions>
      <button @click="submitInventory()" class="btn">
        <i class="bx bx-plus"></i> Add New Item
      </button>
    </template>
    <template #content>
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
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inv, index) in inputItems" :key="index" class="hover">
              <th>{{ index + 1 }}</th>
              <td>{{ inv.itemName }}</td>
              <td>{{ inv.cost }}</td>
              <td>{{ inv.quantity }} {{ inv.unit }}</td>
              <td>{{ inv.itemQuantity }} {{ inv.unit }}</td>
              <td>{{ inv.stock }} {{ inv.stockUnit }}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-primary btn-outline me-2" @click="setEdit(inv)">
                  <i class="bx bx-pencil"></i>
                </button>
                <button class="btn btn-sm btn-error btn-outline" @click="removeItem(inv)">
                  <i class="bx bx-x"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </CardContent>
</template>
