<template>
  <div>
    <q-page class="q-ma-md">
      
      <q-table :table-header-style="{ backgroundColor: '#1976D2' }" 
        
        :columns="columns"
        :rows="get_office_data"
        separator = "cell"
        row-key="officeCode"
        title="Office Details"
        :title-class="{ 'text-h4': '#1976D2' }"
        @row-click = "showEmployees"
        :rows-per-page-options="[0]"
      />
    </q-page>
  </div>
</template>

<script>

import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  async created() {
    let url = "/offices";
    const office_details = await this.$api.get(url);
    console.log("HI");
    console.log(office_details);
    this.$store.dispatch("set_office_data", office_details.data);
    console.log(office_details);
  },

  setup() {
    return {
      columns: [
        {
          name: "officeCode",
          label: "Office Code",
          field: "officeCode",
          align: "center",
        },
        { name: "city", label: "City", field: "city", align: "center" },
        { name: "phone", label: "Phone", field: "phone", align: "center" },
        {
          name: "addressLine1",
          label: "Address Line 1",
          field: "addressline1",
          align: "center",
        },
        {
          name: "addressLine2",
          label: "Address Line 2",
          field: "addressline2",
          align: "center",
          format: (cell) => (cell ? cell : "---"),
        },
        {
          name: "state",
          label: "State",
          field: "State",
          align: "center",
          format: (cell) => (cell ? cell : "---"),
        },
        {
          name: "country",
          label: "Country",
          field: "country",
          align: "center",
        },
        {
          name: "postalCode",
          label: "Postal Code",
          field: "postalcode",
          align: "center",
        },
        {
          name: "territory",
          label: "Territory",
          field: "territory",
          align: "center",
          format: (cell) => (cell != "NA" ? cell : "---"),
        },
      ],
    };
  },
methods: {
      showEmployees (evt, row) {
      this.$router.replace('/offices/' + row.officeCode + '/employees')
    }
    },
  computed: {
    get_office_data() {
      return this.$store.state.offices;
    },
  },
};
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
