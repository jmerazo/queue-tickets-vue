<template>
  <section class="container">
    <form class="row">  
      <div class="col-6" id="form-ticket-1">
        <h2 class="title">Log in</h2>
        <label class="subtitle">Enter your credentials to login</label><br>

        <div class="row">

          <div>
            <label class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control">
          </div>

          <div>
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control">
          </div>

          <div class="col-4">
            <button id="btn" class="btn btn-primary">Send</button>
          </div>          
        </div>        
      </div>
    </form>       
  </section>     
</template>

<script>
//import axios from "axios";

export default {
  components: {
  },
  name: "Login-AQ",
  data() {
    return {
        username: "",
        password: ""

    };    
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    //userLogin(){
    //    await axios.post()
//
    //}
    
  }
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
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
</style>