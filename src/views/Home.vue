<template>
  <section class="container">
    <form class="row">
      <div id="col-home-image" class="col-6">
        <h4 id="h4-information">Request your turn to communicate with entity staff.</h4>
        <h6 id="h6-information"><font-awesome-icon id="fai-log" :icon="['fas', 'calendar']"/>Plan your visits to our entity in advance.</h6>
        <h6 id="h6-information"><font-awesome-icon id="fai-log" :icon="['fas', 'clock']"/>Save waiting time to enter the entity.</h6>
        <h6 id="h6-information"><font-awesome-icon id="fai-log" :icon="['fas', 'lightbulb']"/>Remember that this shift does not guarantee that you will be attended to immediately.</h6>
        <img id="imag-home" src="@/assets/resources/ticketwait.jpg"
          width="500"
          height="300"/>
      </div>   
      <div class="col-6" id="col-form-ticket-home">
        <h2 id="title-home">Tickets</h2>
        <label id="subtitle-home">Fill out the form</label><br>

        <div class="row">
          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'id-card']"/><label class="form-label">Document Type</label>
            <select v-model="person.document_type" class="form-control" id="document_type">
              <option v-show="!person.document_type" value="" disabled>Select an option...</option>
              <option v-show="person.document_type" :value="this.person.document_type">{{this.person.document_type}}</option>
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
            <input v-model="person.document_number" @change="personValidate()" type="text" class="form-control">
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Names</label>
            <input v-model="person.names" type="text" class="form-control">
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'file-text']"/><label class="form-label">Last Names</label>
            <input v-model="person.last_names" type="text" class="form-control">
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'mobile']"/><label class="form-label">Phone</label>
            <input v-model="person.phone" type="text" class="form-control">
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'envelope']"/><label class="form-label">Email</label>
            <input v-model="person.email" type="email" class="form-control">
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'location-dot']"/><label class="form-label">Departments</label>
            <select v-model="selDepartment" @change="listCities()" class="form-control" id="department">
              <option v-show="!selDepartment" value="" disabled>Select an option...</option>
              <option v-show="selDepartment" :value="selDepartment">{{this.departmentSearch}}</option>
              <option v-for="department in departments" :value="department" :key="department.code">{{department.name}}</option>
            </select>
          </div>

          <div class="col-6">
            <font-awesome-icon id="fai-log" :icon="['fas', 'location-pin']"/><label class="form-label">Cities</label>
            <select v-model="selCity" class="form-control" id="city">
              <option v-show="!selCity" value="" disabled>Select an option...</option>
              <option v-show="selCity" :value="selCity">{{this.citySearch}}</option>
              <option v-for="city in cities" :value="city.id" :key="city">{{city.name}}</option>
            </select>
          </div>

          <div class="col-4">
            <a id="btn-home-request" type="submit" class="btn" @click="createPerson" href="/ticket/request">Request Ticket</a>
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
      departmentSearch: "",
      selCity: "",
      citySearch: "",
      personSearch: [],
      documentNumberValidate: "",
      personid: "",
      personidSearch: ""
    };    
  },
  mounted() {
    this.listDepartments();
    this.listCities();
    this.getIdPersons();
    
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
    async personValidate(){
      await axios.get(`http://localhost:8888/apitickets/person/search/document/${this.person.document_number}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        console.log("Person: ", Response.data)
        if(Response){
          this.person.document_type = Response.data[0].pdt,
          this.documentNumberValidate = Response.data[0].pdn,
          this.person.names = Response.data[0].names,
          this.person.last_names = Response.data[0].last_names,
          this.person.phone = Response.data[0].phone,
          this.person.email = Response.data[0].email,
          this.selDepartment = Response.data[0].department_id,
          this.selCity = Response.data[0].city_id,
          this.departmentSearch = Response.data[0].depname,
          this.citySearch = Response.data[0].cityname,
          this.personid = Response.data[0].pid
        }else{
          this.person.document_type = "",
          this.person.names = "",
          this.person.last_names = "",
          this.person.phone = "",
          this.person.email = "",
          this.selDepartment = "",
          this.selCity = "",
          this.departmentSearch = "",
          this.citySearch = ""
        }
      });
    },
    async createPerson() {
      if(this.documentNumberValidate){
        localStorage.setItem('pid', this.personid)
        this.$router.push({
          name:'TicketRequest'
        })
      }else{
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
        localStorage.setItem('pid', this.personidSearch+1)
        await axios.post("http://localhost:8888/apitickets/person/create", dataPerson, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {        
          this.clearInputsForm1();
        });
      }
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

    },
    async getIdPersons(){
      await axios.get(`http://localhost:8888/apitickets/person/id`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.personidSearch = Response.data[0].id;
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

#btn-home-request {
  margin-top: 20px;
  align-content: center;
  background-color: #54426b;
  color: white;
}

#imag-home{
  border-radius: 15px;
  margin-left: 20px;
  margin-top: 15px;
}

#h4-information{
  text-align: center;
  width: 550px;
}

#h6-information{
  width: 510px;
}

#col-home-image {
  position:absolute;
  top:80px;
  left:50px;
  width:200px;
  margin-top:10px;
}

#col-form-ticket-home {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  margin-left:720px;
  margin-top:10px;
}

#title-home {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#subtitle-home {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>