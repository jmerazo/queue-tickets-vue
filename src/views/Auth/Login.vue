<template>
  <section class="container">
    <form @submit.prevent="userLogin" class="row">  
      <div class="col-6" id="form-user-login">
        <h2 id="login-title">Log in</h2>
        <label id="login-subtitle">Enter your credentials to login</label><br>

        <div class="row">

          <div>
            <font-awesome-icon id="fai-log" :icon="['fas', 'user']"/>
            <label class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" placeholder="Enter your username" required>
          </div>

          <div>
            <font-awesome-icon id="fai-log" :icon="['fas', 'unlock']"/>
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Enter your password" required>
          </div>

          <div class="col-4">
            <button id="btn-user-login" class="btn" type="submit">Send</button>
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
  methods: {
    async userLogin(){
      this.error = false;
      if(!this.username || !this.password){
        this.$toast.warning(`Fields cannot be empty`, {
          position: 'top-right',
          duration: 5000
        });
      }else{
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
          localStorage.setItem('rol', response.data.rol_id);        

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
            this.$toast.success(`Welcome ${this.un}`, {
              position: 'top-right',
              duration: 5000
            });
          }else{
            console.log("User inactivate")
            this.username = "";
            this.password = "";
            this.salir();
          }
          
        })
        .catch(err =>{
          this.$toast.error(`Invalid username or password`, {
              position: 'top-right',
              duration: 5000
          });
          console.log(err)
          this.error = true;
        });        
      } 
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

#btn-user-login {
  margin-top: 20px;
  align-content: center;
  background-color: #54426b;
  color: white;
}

#form-user-login {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
}

#login-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#login-subtitle {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>