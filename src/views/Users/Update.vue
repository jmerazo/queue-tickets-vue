<template>
    <section class="container">
  
      <form class="row">
        <div id="btn-back">
          <a title="Back" id="btn-back-users-update-top" href="/users/list" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
          <a title="Panel administrator" id="btn-update-user-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
        </div>
           
          <div class="col-6" id="form-user-update">
              <h2 id="update-title">User Update</h2>
              <label id="update-subtitle">Fill out the form</label><br>
  
              <div class="row">
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'id-card']"/><label class="form-label">Document Type</label>
                <select v-model="document_type" class="form-control" id="document_type">
                  <option value="" disabled>Select an option...</option>
                  <option value="Cédula de Ciudadanía">CC - Cédula de Ciudadanía</option>
                  <option value="Cédula de Extranjería">CE - Cédula de Extranjería</option>
                  <option value="Número de identificación personal">NIP - Número de identificación personal</option>
                  <option value="Número de identificación Tributaria">NIT - Número de identificación Tributaria</option>
                  <option value="Tarjeta de Identidad">TI - Tarjeta de Identidad</option>
                  <option value="Pasaporte">PAP - Pasaporte</option>
                </select>
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'list-ol']"/><label class="form-label">Document number</label>
                <input v-model="upUser.document_number" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Names</label>
                <input v-model="upUser.names" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Last Names</label>
                <input v-model="upUser.last_names" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'mobile']"/><label class="form-label">Phone</label>
                <input v-model="upUser.phone" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'envelope']"/><label class="form-label">Email</label>
                <input v-model="upUser.email" type="email" class="form-control">
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'location-dot']"/><label class="form-label">Dependence</label>
                <select v-model="dependence" @change="listSubdependences()" class="form-control" id="dependence">
                  <option value="" disabled>Select an option...</option>
                  <option v-for="dependence in dependences" :value="dependence" :key="dependence.id">{{dependence.name}}</option>
                </select>            
              </div>
  
              <div class="col-6">
                <font-awesome-icon id="fai-log" :icon="['fas', 'location-pin']"/><label class="form-label">Subdependence</label>
                <select v-model="subdependence" class="form-control" id="subdependence">
                  <option value="" disabled>Select an option...</option>
                  <option v-for="subdependence in subdependences" :value="subdependence.id" :key="subdependence">{{subdependence.name}}</option>
                </select>            
              </div>
  
              <div class="col-2">
                  <button id="btn-update-save" class="btn" @click="updateUser">Update</button>
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
  name: "userUpdate-AQ",
  data() {
    return {        
      document_type: "",
      upUser: {
          document_type: this.$route.params.document_type,
          document_number: this.$route.params.document_number,
          names: this.$route.params.names,
          last_names: this.$route.params.last_names,
          phone: this.$route.params.phone,
          email: this.$route.params.email,
          dependence_id: this.$route.params.dependence_id,
          subdependence_id: this.$route.params.subdependence_id
      },
      dependences: [],
      dependence: "",
      subdependences: [],
      subdependence: "",
    };    
  },
  mounted() {
    this.listDependences();
    this.listSubdependences();
  },
  computed: {
  },
  methods: {
    async updateUser() {
      const dataUser = JSON.stringify({
        document_type : this.document_type,
        document_number : this.upUser.document_number,
        names : this.upUser.names,
        last_names : this.upUser.last_names,
        phone : this.upUser.phone,
        email : this.upUser.email,
        dependence_id : this.dependence.id,
        subdependence_id : this.subdependence
      })

      const uid = this.$route.params.id;
      await axios.put(`http://localhost:8888/apitickets/user/update/${uid}`, dataUser, {
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
      this.document_type = "",
      this.upUser.document_number = "",
      this.upUser.names = "",
      this.upUser.last_names = "",
      this.upUser.phone = "",
      this.upUser.email = ""
      this.dependence = "",
      this.subdependence = ""  
    },
    async listDependences() {
      await axios.get("http://localhost:8888/apitickets/dependences", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.dependences = Response.data;
      });
    },
    async listSubdependences() {
      if(!this.dependence){
        this.subdependences = []
      }else{
        await axios.get(`http://localhost:8888/apitickets/subdependence/filter/${this.dependence.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          this.subdependences = Response.data;
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

#btn-back-users-update-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-update-user-top {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #54426b;
  color: white;
}

#btn-update-save {
  margin-top: 15px;
  background-color: #54426b;
  color: white;
}

#form-user-update {
  padding: 20px;
  border: 1px solid #54426b;
  border-radius: 15px;
  margin-bottom: 50px;
}

#update-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#update-subtitle {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>