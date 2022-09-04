<template>
  <section class="container">
    <form class="row">   
      <div class="col-6" id="form-ticket-1">
        <h2 class="title">Tickets</h2>
        <label class="subtitle">Fill out the form</label><br>

        <div class="row">
          <div class="col-6">
            <label class="form-label">Document Type</label>
            <select v-model="person.document_type" class="form-control" id="document_type">
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
            <input v-model="person.document_number" type="text" class="form-control">
          </div>

          <div class="col-6">
            <label class="form-label">Names</label>
            <input v-model="person.names" type="text" class="form-control">
          </div>

          <div class="col-6">
            <label class="form-label">Last Names</label>
            <input v-model="person.last_names" type="text" class="form-control">
          </div>

          <div class="col-6">
            <label class="form-label">Phone</label>
            <input v-model="person.phone" type="text" class="form-control">
          </div>

          <div class="col-6">
            <label class="form-label">Email</label>
            <input v-model="person.email" type="email" class="form-control">
          </div>

          <div class="col-6">
            <label class="form-label">Departments</label>
            <select v-model="selDepartment" @change="listCities()" class="form-control" id="department">
              <option value="" disabled>Select an option...</option>
              <option v-for="department in departments" :value="department" :key="department.code">{{department.name}}</option>
            </select>
          </div>

          <div class="col-6">
            <label class="form-label">Cities</label>
            <select v-model="selCity" class="form-control" id="city">
              <option value="" disabled>Select an option...</option>
              <option v-for="city in cities" :value="city.id" :key="city">{{city.name}}</option>
            </select>
          </div>

          <div class="col-4">
            <a type="submit" id="btn" class="btn" @click="createPerson" href="/ticket/request">Request Ticket</a>
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
  name: "Home-AQ",
  data() {
    return {
      token: "",
      person: {
        document_type: "",
        document_number: "",
        names: "",
        last_names: "",
        phone: "",
        email: ""
      },
      departments: [],
      cities: [],
      selDepartment: "",
      selCity: ""
    };    
  },
  mounted() {
    this.listDepartments();
    this.listCities();
    
    this.token = localStorage.getItem("token")
    axios.post("http://localhost:8888/apitickets/user/auth", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem("token")
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  },
  computed: {
  },
  methods: {
    async listCities() {
      if(!this.selDepartment){
        this.cities = []
      }else{
        await axios.get(`http://localhost:8888/apitickets/cities/filter/${this.selDepartment.code}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          //console.log("Cities", Response.data)
          this.cities = Response.data;
        });
      }
    },
    async listDepartments(){
      await axios.get("http://localhost:8888/apitickets/departments", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        //console.log("Departments", Response.data)
        this.departments = Response.data;
      });
    },
    async createPerson() {
      const dataPerson = JSON.stringify({
        document_type : this.person.document_type,
        document_number : this.person.document_number,
        names : this.person.names,
        last_names : this.person.last_names,
        phone : this.person.phone,
        email : this.person.email,
        city_id : this.selCity,
        department_id : this.selDepartment.code
      })

      await axios.post("http://localhost:8888/apitickets/person/create", dataPerson, {
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
      this.selDepartment = "",
      this.selCity = ""

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