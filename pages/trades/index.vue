<template>
  <div class="ma-3">
    <v-data-table :headers="headers" :items="trades" class="elevation-1" :height="350">
      <template v-slot:item.id="{ value }">
        <span>{{ tradeIndex(value) + 1 }}</span>
      </template>
      <template v-slot:item.tradeDate="{ value }">
        <span>{{ value? dateDisplay(value):'' }}</span>
      </template>
      <template v-slot:item.order="{ value }">
        <span class="text-capitalize" :style="{color: orderColor[value]}">{{ value }}</span>
      </template>
      <template v-slot:item.market="{ value }">
        <span>{{ marketDisplay(value) }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import moment from 'moment'
import loFindIndex from 'lodash/findIndex'
import {FORMAT_DATE ,MARKET} from '~/utils/constants'

export default {
  middleware: ["isNotAuth"],
  data(){
    return {
      headers: [
          {
            text: 'STT',
            sortable: false,
            value: 'id',
          },
          { text: 'Trade Date', value: 'tradeDate' },
          { text: 'Order', value: 'order' },
          { text: 'Market', value: 'market' },
          { text: 'Price one', value: 'point_one' },
          { text: 'Price two', value: 'point_two' },
          { text: 'Price three', value: 'point_three' },
          { text: 'Stop lost', value: 'sl' },
          { text: 'Take profit(quick)', value: 'tp_short' },
          { text: 'Take profit(low)', value: 'tp_long' },
          { text: 'Status', value: 'status' },
        ],
        orderColor:{
          buy: 'blue',
          sell: 'red'
        }
    }
  },
  computed: {
    ...mapGetters({
      locale: "getLocale",
      error: "getError",
      success: "getSuccess",
      trades: 'trade/getTrades'
    }),
  },
  created(){
    this.$store.dispatch('trade/getTradesRequest')
  },
  methods:{
    tradeIndex(value){
      return loFindIndex(this.trades, {'id': value})
    },
    dateDisplay(date){
      return moment(date).format(FORMAT_DATE)
    },
    marketDisplay(value){
      return MARKET[value]
    }
    
  }
  
}
</script>

<style lang="scss" scoped></style>
