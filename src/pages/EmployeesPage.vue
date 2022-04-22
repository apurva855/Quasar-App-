<template>

  <q-page class="q-ma-md">
      <div class="center"  style="padding-left:70px;">
        <q-btn style="margin-right:10px;" color="primary" 
        label="Offices" 
        no-caps 
        to="/offices"
        />

        <q-btn color="primary" 
        label="Add Employee" 
        no-caps 
        @click="empForm" />
      </div>

    <div class="emp" style="margin-top:20px; ">
        <q-table :table-header-style="{ backgroundColor: '#1976D2' }" 
          :rows="get_employees_data"
          separator="cell"
          :rows-per-page-options="[0]"
          row-key="officeCode"
          title="Employee Details"
          :columns="columns"
          virtual-scroll
        />
    </div>
<q-separator />
  <q-dialog v-model="opened" persistent ref="projectForm">
      <q-card style="width: 700px; max-width: 900px">
        <q-toolbar class="q-pa-md">
          <!--<q-icon name="work" size="md" class="text-primary" />-->
          <q-toolbar-title>Add New Employee</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-form method="post" @submit="onSubmit">
          <q-card-section>
            <q-input
              filled
              label="First Name *"
              v-model="formData.firstName"
              :rules="[val=>!!val || 'Field is required']"
              lazy-rules
            />
            <q-input
              filled
              label="Last Name *"
              v-model="formData.lastName"
              :rules="[val=>!!val || 'Field is required']"

              lazy-rules
            />
            <q-input
              filled
              type="email"
              label="Email"
              v-model="formData.email"
              :rules="[val=>!!val || 'Field is required']"

              lazy-rules
            />
            <q-select
              filled
              label="Job Role"
              v-model="formData.jobTitle"
              :options="formData.jobTitleOptions"
              :rules="[val=>!!val || 'Field is required']"

            />
            <q-input
              filled
              label="Extension *"
              v-model="formData.extension"
               :rules="[val=>!!val || 'Field is required']"

              lazy-rules
                />
              </q-card-section>
              <q-separator />
              <q-toolbar class="q-pa-md flex justify-end">
                <q-btn
                  outline
                  align="between"
                  color="red-12"
                  icon="clear"
                  label="Cancel"
                  v-close-popup
                />
                <q-btn
                  type="Submit"
                  align="between"
                  color="positive"
                  icon="check"
                  label="Save"
                />
              </q-toolbar>
            </q-form>
          </q-card>
        </q-dialog>
      </q-page>
</template>
<script>

import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'PageEmployee',
  data () {
    return {
      officeCode: this.$route.params.officeCode,
       opened: false,
      $q: useQuasar(),
      formData: {
        firstName: ref(null),
        lastName: ref(null),
        emailId: ref(null),
        extension: ref(null),
        jobTitle: ref(null),
        jobTitleOptions: [
          'Sales Manager',
          'Sales Rep',
          'VP Marketing',
          'Sales Manager (NA)',
          'Sale Manager (EMEA)',
          'VP Sales'
          
        ]
      }
    }
  },
   created () {
    axios.get('/api/offices/employees/' + this.officeCode).then((response) => {
        //.get('/offices/employees/' + this.officeCode).then((response) => {
        this.employee = response.data
        console.log(" working ", this.employee)
        this.$store.dispatch("set_employees_data", this.employee)
      })
  },
  methods:{
    empForm: function () {
    this.opened = true
    },
    onSubmit: function () {
      this.newEmp = {
        
        officeCode: this.officeCode,
        employeeNumber: this.formData.employeeNumber,
        lastName: this.formData.lastName,
        firstName: this.formData.firstName,
        extension: this.formData.extension,
        email: this.formData.email,
        jobTitle: this.formData.jobTitle,
      };
      this.$api({
        //url: "/api/new_employee/" + this.officeCode + "/",
        url: "/new_employee/" + this.officeCode + "/",

      headers: {
          "Content-Type": "application/json",
        },
        data: this.newEmp,
        method: "POST",
      })
      .then((response) => {
        if (response.data.ok === true) {
          this.$q.notify({
           
            message: "New Employee added successfully in office " + this.officeCode
          
          });
          this.opened = false
        }
        else {
          this.$q.notify({
            message: "Error : " + response.data.error
            });
        }
      });
      this.$router.go()
    },
  },
  computed:{
      get_employees_data(){
        return this.$store.state.employees
      }
    },

    setup() {
      return {
          columns :[
          {name: 'officeCode', label: 'officeCode', field: 'officeCode', align: 'center', },
          {name: 'employeeNumber', label: 'Employee Number', field: 'employeeNumber', align: 'center'},
          {name: 'lastName', label: 'Last Name', field: 'lastName', align: 'center',},
          {name: 'firstName', label: 'First Name', field: 'firstName',  align: 'center',},
          {name: 'extension', label: 'Extension', field: 'extension', align: 'center', },
          {name: 'email', label: 'Email ID', field: 'email', align: 'center', },
          {name: 'jobTitle', label: 'Job Title', field: 'jobTitle', align: 'center', },
          
        ]
      }
    },
})
</script>