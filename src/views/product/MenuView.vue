<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h3>Menus</h3>
        <div class="card-actions"></div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <template v-for="(item, index) in product.menus" :key="index">
              <ProductTableRow :menu="item" :checked="select" />
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore, type IMenu } from '@/stores/product'
import ProductTableRow from '@/components/displays/products/table/ProductTableRow.vue'
const select = (menu:IMenu)=>{
  console.log(menu._id )
}
const product = useProductStore()
</script>
