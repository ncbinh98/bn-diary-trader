<template>
  <div class="ma-3">
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:item.nO="{ item, index }">
        <span>{{ index }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  middleware: ["isNotAuth"],
  data(){
    return {
      headers: [
          {
            text: 'STT',
            sortable: false,
            value: 'nO',
          },
          { text: 'Trade Date', value: 'tradeDate' },
          { text: 'Order', value: 'order' },
          { text: 'Market', value: 'market' },
          { text: 'Price one', value: 'point_one' },
          { text: 'Stop lost', value: 'sl' },
          { text: 'Take profit(quick)', value: 'tp_short' },
          { text: 'Take profit(low)', value: 'tp_long' },
          { text: 'Status', value: 'status' },
        ],
    }
  }
}
</script>

<style lang="scss" scoped></style>
