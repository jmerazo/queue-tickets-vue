<template>
  <section class="container">

    <form class="row">              
        <a href="/users/list" id="btn-update-password-top" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>       
        <div class="col-12" id="form-ticket-update-pass">
            <h2 class="title">Password Update</h2>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'envelope']"/><label class="form-label">Email</label>
              <input id="i-email" v-model="user.username" type="text" class="form-control" disabled>
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'unlock']"/><label class="form-label">Password</label>
              <input id="i-email" v-model="user.password" type="password" class="form-control">
            </div>

            <div class="col-2">
                <button id="btn-update-password" class="btn" @click="updatePassword">Save</button>
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

#btn-update-password {
  margin-top: 20px;
  align-content: center;
  background-color: #54426b;
  color: white;
}

#fai-log-update-password{
  color: #54426b;
}

#btn-update-password-top {
  margin-top: 20px;
  align-content: left;
  justify-content: left;
  background-color: #ffffff;
  color: white;
  width: 30px;
  margin-bottom: 20px;
}

#i-email{
  width: 250px;
}

#form-ticket-update-pass {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  justify-content: center;
  align-content: center;
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