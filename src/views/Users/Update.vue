<template>
    <section class="container">
  
      <form class="row">
        
        <div id="btn-back">
          <a id="abtn-1" href="/user/panel/administrator" class="btn btn-primary" type="button">Back</a>
          <a id="abtn-2" href="/users/list" class="btn btn-primary" type="button">List</a>       
        </div>
           
          <div class="col-6" id="form-ticket-1">
              <h2 class="title">User Update</h2>
              <label class="subtitle">Fill out the form</label><br>
  
              <div class="row">
              <div class="col-6">
                  <label class="form-label">Document Type</label>
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
                  <label class="form-label">Document number</label>
                  <input v-model="upUser.document_number" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                  <label class="form-label">Names</label>
                  <input v-model="upUser.names" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                  <label class="form-label">Last Names</label>
                  <input v-model="upUser.last_names" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                  <label class="form-label">Phone</label>
                  <input v-model="upUser.phone" type="text" class="form-control">
              </div>
  
              <div class="col-6">
                  <label class="form-label">Email</label>
                  <input v-model="upUser.email" type="email" class="form-control">
              </div>
  
              <div class="col-6">
                  <label class="form-label">Dependence</label>
                  <select v-model="dependence" @change="listSubdependences()" class="form-control" id="dependence">
                  <option value="" disabled>Select an option...</option>
                  <option v-for="dependence in dependences" :value="dependence" :key="dependence.id">{{dependence.name}}</option>
                  </select>            
              </div>
  
              <div class="col-6">
                  <label class="form-label">Subdependence</label>
                  <select v-model="subdependence" class="form-control" id="subdependence">
                  <option value="" disabled>Select an option...</option>
                  <option v-for="subdependence in subdependences" :value="subdependence.id" :key="subdependence">{{subdependence.name}}</option>
                  </select>            
              </div>
  
              <div class="col-2">
                  <button id="btn" class="btn btn-primary" @click="updateUser">Update</button>
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
  
  #btn {
    margin-top: 20px;
    align-content: center;
    background-color: #004884;
  }
  
  #btn-back {
    margin-top: 10px;
    margin-bottom: 10px;
    float: top;
    overflow: auto;
  }
  
  #abtn-2 {
    margin-left: 10px;
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