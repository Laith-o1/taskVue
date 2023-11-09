import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', {
  state:() => ({
    task:null,

  }),
  getters:{
    getTask:(state) => state.task,
  },
  actions:
  {
    setTask(data){
      this.task = data
    }
  },
})
