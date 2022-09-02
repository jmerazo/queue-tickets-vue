<template>
    <section class="container">
        <form class="row">
          <h2 class="title" id="tf-1">Welcome</h2>
          <label>{{ this.names +' '+this.last_names }}</label>

            <a class="btn btn-primary" id="card-item" href="/users/list">
              <div class="card-body" id="card-body-item">
                Users
              </div>
            </a>

            <a class="btn btn-primary" id="card-item" href="">
              <div class="card-body" id="card-body-item">
                Areas
              </div>
            </a>

            <a class="btn btn-primary" id="card-item" href="">
              <div class="card-body" id="card-body-item">
                Tickets
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

#tf-1{
  align-content: left;
  justify-content: left;
}

#btn {
  margin-top: 20px;
  align-content: center;
  background-color: #004884;
}

#form-ticket-1 {
  padding-top: 10px;
  border: 1px solid #004884;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  margin-top: 20px;
}

#form-ticket-2 {
  padding-top: 10px;
  border: 1px solid #004884;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-left: 30px;
}

#tab-1{
  display: flex;
  padding-top: 10px;
  border: 1px solid #004884; 
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;   
}

.title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.subtitle {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#card-item {
  display: flex;
  align-items: center;
  justify-items: left;
  justify-content: left;
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