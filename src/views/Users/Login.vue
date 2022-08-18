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
            <button id="btn" class="btn btn-primary" @click="userLogin()">Send</button>
          </div>          
        </div>        
      </div>
    </form>       
  </section>     
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  name: "Login-AQ",
  data() {
    return {
        username: "",
        password: "",
        error: false
    };    
  },
  methods: {
    async userLogin(){
      this.error = false;
      const dataLogin = JSON.stringify({
        username : this.username,
        password : this.password
      })

      console.log("data login: ", dataLogin);
      await axios.post("http://localhost:8888/apitickets-auth/user/auth", dataLogin, {
          headers: {
              'Content-Type': 'application/json'
          }             
      })
      .then(async (response) => {
          if(!response.ok) throw await response.json();
          return response.json();
      })
      .then((data) => {
          localStorage.setItem('token', data.token)
          this.$router.push('/user/panel')
      }).catch(err =>{
        console.log(err)
        this.error = true;
      });
  },
    
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