<template>
  <section class="container">

    <form class="row">
      
      <div id="btn-back">
        <a title="Back" id="btn-back-users-create-top" href="/users/list" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
        <a title="Panel administrator" id="btn-register-user-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
      </div>
         
        <div class="col-6" id="form-register-user">
            <h2 class="title">User Register</h2>
            <label class="subtitle">Fill out the form</label><br>

            <div class="row">
            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'id-card']"/><label class="form-label">Document Type</label>
              <select v-model="user.document_type" class="form-control" id="document_type">
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
              <input v-model="user.document_number" type="text" class="form-control">
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Names</label>
              <input v-model="user.names" type="text" class="form-control">
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Last Names</label>
              <input v-model="user.last_names" type="text" class="form-control">
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'mobile']"/><label class="form-label">Phone</label>
              <input v-model="user.phone" type="text" class="form-control">
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'envelope']"/><label class="form-label">Email</label>
              <input v-model="user.email" type="email" class="form-control">
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'building']"/><label class="form-label">Dependence</label>
              <select v-model="dependence" @change="listSubdependences()" class="form-control" id="dependence">
                <option value="" disabled>Select an option...</option>
                <option v-for="dependence in dependences" :value="dependence" :key="dependence.id">{{dependence.name}}</option>
              </select>            
            </div>

            <div class="col-6">
              <font-awesome-icon id="fai-log" :icon="['fas', 'building']"/><label class="form-label">Subdependence</label>
              <select v-model="subdependence" class="form-control" id="subdependence">
                <option value="" disabled>Select an option...</option>
                <option v-for="subdependence in subdependences" :value="subdependence.id" :key="subdependence">{{subdependence.name}}</option>
              </select>            
            </div>

            <div class="col-2">
                <button id="btn-register-save" class="btn" @click="createUser">Save</button>
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
  name: "uRegister-AQ",
  data() {
    return {
      user: {
        document_type: "",
        document_number: "",
        names: "",
        last_names: "",
        phone: "",
        email: ""
      },
      dependences: [],
      dependence: "",
      subdependences: [],
      subdependence: ""
    };    
  },
  mounted() {
    this.listDependences();
    this.listSubdependences();
  },
  computed: {
  },
  methods: {
    async createUser() {
      const dataUser = JSON.stringify({
        document_type : this.user.document_type,
        document_number : this.user.document_number,
        names : this.user.names,
        last_names : this.user.last_names,
        phone : this.user.phone,
        email : this.user.email,
        dependence_id : this.dependence.id,
        subdependence_id : this.subdependence
      })

      await axios.post("http://localhost:8888/apitickets/user/create", dataUser, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.clearInputsForm1();
      });
    },
    clearInputsForm1(){
      this.person.document_type = "",
      this.person.document_number = "",
      this.person.names = "",
      this.person.last_names = "",
      this.person.phone = "",
      this.person.email = ""
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

#btn-back-users-create-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-register-save {
  background-color: #54426b;
  color: white;
}

#form-register-user {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  margin-bottom: 80px;
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