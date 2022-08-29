<template>
  <section class="container">

    <form class="row">
      <div id="btn-back">
        <a href="/users/list" class="btn btn-primary" type="button">Volver</a>      
      </div>       
         
        <div class="col-12" id="form-ticket-1">
            <h2 class="title">User Data</h2>
            <label class="subtitle">Fill out the form</label><br>

            <div class="col-6">
                <label class="form-label">Username</label>
                <input v-model="user.username" type="text" class="form-control">
            </div>

            <div class="col-6">
                <label class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control">
            </div>

            <div class="col-6">
                <label class="form-label">Rol</label>
                <select v-model="rol_id" class="form-control" id="rol">
                <option value="" disabled>Select an option...</option>
                <option v-for="rol in roles" :value="rol" :key="rol.id">{{rol.name}}</option>
                </select>            
            </div>

            <div class="col-2">
                <button id="btn" class="btn btn-primary" @click="createUser">Save</button>
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