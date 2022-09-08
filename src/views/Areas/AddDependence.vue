<template>
  <section class="container">

    <form class="row">
      <div id="btn-back">
        <a title="Back" id="btn-back-auth-create-top" href="/areas/list" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
        <a title="Panel administrator" id="btn-auth-user-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
      </div>      
         
        <div class="col-6" id="form-auth-user">
            <h2 id="auth-title">Dependence Data</h2>
            <label id="auth-subtitle">Fill out the form</label><br>
            <div class="row">
              <div class="col-12">
                <font-awesome-icon id="fai-log" :icon="['fas', 'signature']"/><label class="form-label">Name</label>
                <input v-model="name" type="text" class="form-control">
              </div>

              <div class="col-12">
                <font-awesome-icon id="fai-log" :icon="['fas', 'code-commit']"/><label class="form-label">Code</label>
                <input v-model="code" type="text" class="form-control" maxlength="3" style="text-transform:uppercase;">
              </div>

              <div id="div-btn-auth-save" class="col-12">
                  <button id="btn-auth-save" class="btn" @click="createDep">Save</button>
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
      name: "",
      code: ""
    };    
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    async createDep() {
      const depData = JSON.stringify({
        name : this.name,
        code : this.code
      })
      await axios.post(`http://localhost:8888/apitickets/dependence/create`, depData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.clearInputsForm1();
        this.$router.push('/areas/list');
      });
    },
    clearInputsForm1(){
      this.name = "",
      this.code = ""
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