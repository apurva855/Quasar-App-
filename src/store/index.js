import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      datavar: "DATA VAR",
      offices: [],
      employees: [],
    },
    actions: {
      set_office_data(context, data) {
        console.log("In Actions");
        context.commit("set_office_data", data);
      },
  
      set_employees_data(context, data) {
        console.log("In Actions");

        context.commit("set_employees_data", data);
      },
    },
    mutations: {
      set_office_data(state, data) {
        console.log("In mutation");
        console.log(data);
        state.offices = data;
      },
  
      set_employees_data(state, data) {
        console.log("In mutation");

        state.employees = data;
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
