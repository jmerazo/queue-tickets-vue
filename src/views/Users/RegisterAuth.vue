<template>
  <section class="container">

    <form class="row">
      <div id="btn-back">
        <a title="Back" id="btn-back-auth-create-top" href="/users/list" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
        <a title="Panel administrator" id="btn-auth-user-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
      </div>      
         
        <div class="col-6" id="form-auth-user">
            <h2 id="auth-title">User Data</h2>
            <label id="auth-subtitle">Fill out the form</label><br>
            <div class="row">
              <div class="col-12">
                <font-awesome-icon id="fai-log" :icon="['fas', 'user']"/><label class="form-label">Username</label>
                <input v-model="user.username" type="text" class="form-control">
              </div>

              <div class="col-12">
                <font-awesome-icon id="fai-log" :icon="['fas', 'key']"/><label class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control">
              </div>

              <div class="col-12">
                <font-awesome-icon id="fai-log" :icon="['fas', 'user-gear']"/><label class="form-label">Rol</label>
                <select v-model="rol_id" class="form-control" id="rol">
                  <option value="" disabled>Select an option...</option>
                  <option v-for="rol in roles" :value="rol" :key="rol.id">{{rol.name}}</option>
                </select>            
              </div>

              <div id="div-btn-auth-save" class="col-12">
                  <button id="btn-auth-save" class="btn" @click="createUser">Save</button>
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
  name: "authRegister-AQ",
  data() {
    return {
      user: {
        username: "",
        password: "",
        user_id: "",
      },
      roles: [],
      rol_id: ""
    };    
  },
  mounted() {
    this.listRoles();
  },
  computed: {
  },
  methods: {
    async createUser() {
      const userData = JSON.stringify({
        username : this.user.username,
        password : this.user.password,
        user_id : this.$route.params.id,
        rol_id : this.rol_id
      })
      const uid = this.$route.params.id;
      await axios.post(`http://localhost:8888/apitickets-auth/user/auth/create/${uid}`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.clearInputsForm1();
        this.$router.push('/users/list');
      });
    },
    clearInputsForm1(){
      this.user.username = "",
      this.user.password = "",
      this.rol_id = ""
    },
    async listRoles() {
      await axios.get("http://localhost:8888/apitickets/roles", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.roles = Response.data;
      });
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

#btn-auth-save {
  background-color: #54426b;
  color: white;
  margin-top: 15px;
}

#btn-back-auth-create-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-auth-user-top{
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #54426b;
  color: white;
}

#div-btn-auth-save{
  text-align: center;
}

#form-auth-user {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  align-items: center;
  justify-items: center;
}

#auth-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#auth-subtitle {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>