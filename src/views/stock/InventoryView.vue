<script lang="ts" setup>
import CardContent from '@/components/displays/CardContent.vue'
import InventoryTable from '@/components/displays/stocks/table/InventoryTable.vue'
</script>

<template>
  <CardContent title="Menus">
    <template #content>
      <InventoryTable />
    </template>
  </CardContent>
</template>
