<template>
    <section class="container">
        <form class="row">
          <h2 id="panel-admin-title">Welcome</h2>
          <label>{{ this.names +' '+this.last_names }}</label>

            <a class="btn" id="card-item-padmin" href="/users/list">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'users']"/>
                Users
              </div>
            </a>

            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'building']"/>
                Areas
              </div>
            </a>

            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'ticket']"/>
                Tickets
              </div>
            </a>
            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'person']"/>
                Persons
              </div>
            </a>
            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'passport']"/>
                Passports
              </div>
            </a>
        </form> 
    </section>
</template>

<script>
//import store from '@/store/store'
import axios from "axios";

export default {

  components: {
  },
  name: "ListTickets-AQ",
  data(){
    return {
      username:  this.$route.params.username,
      names: "",
      last_names: "",
      uid: localStorage.getItem('user_id')
    }    
  }, 
  //setup(){    
  //  var state = store.state.user_log;
  //  console.log("User state: ", state)
  //  return { state };
  //},
  mounted() {
    this.userById();   
    console.log("Localstorage user: ", localStorage.getItem('user_id')); 
  },
  computed: {

  },
  methods: {
    async userById(){
      if(!this.uid){
          this.names = ""
      }else{
          await axios.get(`http://localhost:8888/apitickets/user/search/${this.uid}`, {
          headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
          }
          })
          .then((Response) => {
              console.log("Store response username: ", Response.data)
              this.names = Response.data[0].names;
              this.last_names = Response.data[0].last_names;
          });
      }
    }    
  }
};

</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#panel-admin-title{
  align-content: left;
  justify-content: left;
}

#card-item-padmin {
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-items: left;
  justify-content: left;
  background-color: #54426b;
  color: white;
  width: 150px;
  height: 100px;
  margin: 10px;
}

#card-body-item {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
</style>