<template>
  <section class="container">

    <form class="row">
      <div id="btn-back">
        <a href="/users/list" class="btn btn-primary" type="button">Volver</a>      
      </div>       
         
        <div class="col-12" id="form-ticket-1">
            <h2 class="title">Password Update</h2>
            <label class="subtitle">Fill out the form</label><br>

            <div class="col-6">
                <label class="form-label">Email</label>
                <input v-model="user.username" type="text" class="form-control" disabled>
            </div>

            <div class="col-6">
                <label class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control">
            </div>

            <div class="col-2">
                <button id="btn" class="btn btn-primary" @click="updatePassword">Save</button>
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
  name: "authPassUpdate-AQ",
  data() {
    return {
      user: {
        username: this.$route.params.email,
        password: ""
      }
    };    
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    async updatePassword() {
      const userData = JSON.stringify({
        password : this.user.password
      })
      const uid = this.$route.params.id;
      await axios.put(`http://localhost:8888/apitickets-auth/user/auth/password/update/${uid}`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        //this.clearInputsForm1();
        //this.$router.push('/users/list');
      });
    },
    clearInputsForm1(){
      this.user.username = "",
      this.user.password = ""
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