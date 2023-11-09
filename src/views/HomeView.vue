<script>
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      tasks: null,
      show:false,
      task:{
        name:null,
        description:null,
      }
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    sendTask(){
      if(this.task.name == null || this.task.description == null){
        alert('please fill all the fields')
        return
      }
      axios.post('http://localhost:8000/api/task/store',this.task).then((response) => {
          alert( response.data)
          this.getTasks()
          this.show = false
          this.task.name = null
          this.task.description = null
        }, (error) => {
          console.log(error);
        }
        );
    },
    updateTask(id){
      axios.put('http://localhost:8000/api/task/markAsCompleted/'+id).then((response) => {
          alert( response.data)
          this.getTasks()
        }, (error) => {
          console.log(error);
        }
        );
    },
    getTasks() {
      axios.
        get('http://localhost:8000/api/task/index',
        ).then((response) => {
          this.tasks = response.data
          console.log(this.tasks)
        }, (error) => {
          console.log(error);
        }
        );
    },
  },


}
</script>

<template>
  <div class="grid grid-flow-col grid-cols-12 my-5">
  <div class="col-start-5 flex justify-start">
    <button class="bg-gray-400 rounded-lg p-3 font-bold" @click="show = !show">
      add task
    </button>
  </div>
  </div>
  <div v-if="show == true" class="grid grid-flow-col grid-cols-12 my-5">
    <div class="col-span-4 col-start-5 bg-white rounded-lg shadow-md mb-5">
      <input id="name" v-model="task.name" type="text" class=" border-2 w-4/5 mx-auto p-3 m-3 ml-5" placeholder="title">
      <input id="description" v-model="task.description" type="text" class=" border-2 w-4/5 mx-auto p-3 m-3 ml-5" placeholder="description">
      <br>
      <button @click="sendTask()" class="bg-gray-400 rounded-lg p-3 m-3 ml-5 font-bold">
        add task
      </button>
    </div>
    </div>
  <main class="grid grid-flow-col grid-cols-12">
    <div v-for="item in tasks " @click="updateTask(item.id)" class="col-span-4 col-start-5 bg-white rounded-lg shadow-md mb-5 min-h-[15rem]">
        <p class="font-bold text-xl my-5 ml-5 w-full">{{ item.name }}</p>
      <hr class="w-[99%] mx-auto">
      <p class="ml-5 text-xl w-full">{{ item.description }}</p>
    </div>
  </main>
</template>
