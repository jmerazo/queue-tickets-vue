<template>
  <section class="container">
    <form @submit.prevent="userLogin" class="row">  
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
            <button id="btn" class="btn btn-primary" type="submit">Send</button>
          </div>          
        </div>        
      </div>
    </form>       
  </section>     
</template>

<script>
import axios from "axios";
import store from "@/store/store";

export default {
  components: {
  },
  name: "Login-AQ",
  data() {
    return {
        username: "",
        password: "",
        error: false,
        rol: null,
        status: null,
        un: null,
        userid: null
    };    
  }, 
  setup(){    
    var state = store.state.user_log;
    return { state };
  },
  methods: {
    async userLogin(){
      this.error = false;
      const user = JSON.stringify({
              username: this.username,
              password: this.password
      }) 
      await axios.post("http://localhost:8888/apitickets-auth/user/auth", user, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer`
          }             
      }).then(async (response) => {
        localStorage.setItem('token', response.data.token);
        this.rol = response.data.rol_id;
        this.status = response.data.status;
        this.un = response.data.username;
        this.userid = response.data.user_id;
        store.state.user_log = this.un;
        console.log("Login state user: ",store.state.user_log)
        store.state.user_id = this.userid;
        console.log("Login id user: ",store.state.user_id);
        localStorage.setItem('user_id', response.data.user_id);        

        if(this.status == 1){
          if(this.rol == 1 || this.rol == 2){
            console.log("Login username: ", this.un);
            this.$router.push({
              name: 'admin',
              params: {username: this.un, rol_id: this.rol, status: this.status, user_id: this.userid},
            })
          }else{
            this.$router.push({
              name: 'Panel',
              params: {username: this.un, rol_id: this.rol, status: this.status, user_id: this.userid}
            })
          }
        }else{
          console.log("User inactivate")
          this.username = "";
          this.password = "";
          this.salir();
        }
        
      })
      .catch(err =>{
        console.log(err)
        this.error = true;
      });
    },
    salir() {
      localStorage.removeItem("token")
      this.$router.push('/users/login')
    }    
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