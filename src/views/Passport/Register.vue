<template>
    <section class="container">
      <form class="row">
        <div class="col-12 ctppal">
            <div class="col-5" id="passport-information">
              <h1 id="title-passport-request">Passport</h1>
              <h2 id="information-passport-request">Request your turn virtually to manage the passport process</h2>
              <img id="imag-home" src="@/assets/resources/visa.jpg"
                width="200"
                height="200"/>

              <h4 id="contact-passport-request">Office Hours</h4>
              <h6 id="passport-data-contact"><font-awesome-icon id="fai-passport" :icon="['fas', 'calendar']"/>Monday - Friday</h6>
              <h6 id="passport-data-contact"><font-awesome-icon id="fai-passport" :icon="['fas', 'clock']"/>8:00AM - 12:00PM | 2:00PM - 6:00PM</h6><br>
              <h4 id="contact-passport-request">Contact information</h4>
              <h6 id="passport-data-contact"><font-awesome-icon id="fai-passport" :icon="['fas', 'phone']"/>Phone: +57(601)42050623</h6>
              <h6 id="passport-data-contact"><font-awesome-icon id="fai-passport" :icon="['fas', 'envelope']"/>Email: passport@queue.com</h6>
              <h6 id="passport-data-contact"><font-awesome-icon id="fai-passport" :icon="['fas', 'mobile']"/> Mobile: +573005236598</h6>
            </div>

            <div class="col-7" id="form-passport-request">
                <h2 class="title">Request Ticket</h2><br><br>
                <label class="subtitle">Fill out the form</label><br>
    
                <div class="row">
                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'id-card']"/><label class="form-label-passport">Document Type</label>
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
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'list-ol']"/><label class="form-label-passport">Document number</label>
                    <input v-model="person.document_number" @change="personValidate()" type="text" class="form-control">
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'file-text']"/><label class="form-label-passport">Names</label>
                    <input v-model="person.names" type="text" class="form-control">
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'file-text']"/><label class="form-label-passport">Last Names</label>
                    <input v-model="person.last_names" type="text" class="form-control">
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'mobile']"/><label class="form-label-passport">Phone</label>
                    <input v-model="person.phone" type="text" class="form-control">
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'envelope']"/><label class="form-label-passport">Email</label>
                    <input v-model="person.email" type="email" class="form-control">
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'location-dot']"/><label class="form-label-passport">Departments</label>
                    <select v-model="selDepartment" @change="listCities()" class="form-control" id="department">
                      <option v-show="!selDepartment" value="" disabled>Select an option...</option>
                      <option v-show="selDepartment" :value="selDepartment">{{this.departmentSearch}}</option>
                      <option v-for="department in departments" :value="department" :key="department.code">{{department.name}}</option>
                    </select>
                  </div>

                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'location-pin']"/><label class="form-label-passport">Cities</label>
                    <select v-model="selCity" class="form-control" id="city">
                      <option v-show="!selCity" value="" disabled>Select an option...</option>
                      <option v-show="selCity" :value="selCity">{{this.citySearch}}</option>
                      <option v-for="city in cities" :value="city.id" :key="city">{{city.name}}</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'calendar']"/><label class="form-label-passport">Date</label>
                    <input v-model="ticket.date" type="date" class="form-control">
                  </div>
      
                  <div class="col-6">
                    <font-awesome-icon id="fai-passport-form" :icon="['fas', 'clock']"/><label class="form-label-passport">Time</label>
                    <input v-model="ticket.time" type="time" class="form-control">            
                  </div>
      
                  <div class="col-3">
                    <button id="btn-ticket-request" type="submit" class="btn" @click="createTicket">Send</button>
                  </div>         
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
        ticket: {
          date: "",
          time: "",
          description: ""
        },
        person: {
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
        subdependence: "",
        userBySID: [],
        userSID: "",
        subjects: [],
        subject: "",
        codeDependence: "",
        codeSubdependence: "",
        count: "",
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
      this.listDependences();
      this.listSubdependences();
      this.listUserBySID();
      this.listSubjects();
      this.getCodeDependence();
      this.getCodeSubdependence();
      this.getCount();
      
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
      async listDependences() {
        await axios.get("http://localhost:8888/apitickets/dependences", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          //console.log("Cities", Response.data)
          this.getCodeDependence();
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
            //console.log("Cities", Response.data)
            this.getCodeSubdependence();
            this.subdependences = Response.data;
          });
        }
      },
      async listUserBySID() {
        if(!this.subdependence){
          this.userBySID = []
        }else{
          await axios.get(`http://localhost:8888/apitickets/user/filter/${this.subdependence}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then((Response) => {
            //console.log("Cities", Response.data)
            this.userBySID = Response.data;
          });
        }
      },
      async listSubjects() {
        await axios.get("http://localhost:8888/apitickets/subjects", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          //console.log("Cities", Response.data)
          this.subjects = Response.data;
        });
      },
      async createTicket() {
        const dataTicket = JSON.stringify({
          date : this.ticket.date,
          time : this.ticket.time,
          prefix : this.codeDependence+"-"+this.codeSubdependence+"-",
          count: this.count, 
          dependence_id : this.dependence.id,
          subdependence_id : this.subdependence,
          user_id : this.userSID,
          person_id: localStorage.getItem('pid'),
          subject_id : this.subject,
          description : this.ticket.description
        })

        console.log("Data ticket: ", dataTicket);
  
        await axios.post("http://localhost:8888/apitickets/ticket/create", dataTicket, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          localStorage.removeItem('pid')
          this.clearInputsForm2();          
          this.$router.push({
            name: 'Home'
          });
        });
      },
      clearInputsForm2(){
        this.ticket.date = "",
        this.ticket.time = "",
        this.dependence = "",
        this.subdependence = "",
        this.userSID = "",
        this.subject = ""
        this.ticket.description = ""
      },
      async getCodeDependence() {
        if(!this.dependence.id){
          this.codeDependence = "";
        }else{
          await axios.get(`http://localhost:8888/apitickets/dependence/code/${this.dependence.id}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then((Response) => {
            //console.log("Cities", Response.data)
            this.codeDependence = Response.data[0,0].code;
          });
        }
      },
      async getCodeSubdependence() {
        if(!this.subdependence){
          this.codeSubdependence = "";
        }else{
          await axios.get(`http://localhost:8888/apitickets/dependence/code/${this.subdependence}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then((Response) => {
            //console.log("Cities", Response.data)
            this.codeSubdependence = Response.data[0,0].code;
          });
        }
      }, 
      async getCount() {
        await axios.get(`http://localhost:8888/apitickets/ticket/count`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          //console.log("Cities", Response.data)
          this.count = Response.data;
        });
      },
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
  },
};
</script>
  
<style>
.body {
    background-color: #bebac4;
}
.container {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
}

.row {
    align-items: center;
    justify-items: center;
    justify-content: center;
}

#btn-register {
    margin-top: 20px;
    align-content: center;
    background-color: #54426b;
    color: white;
}

#contact-passport-request{
  text-align: left;
  margin-left: 45px;
}

#passport-data-contact{
  text-align: left;
  margin-right: 10px;
  margin-left: 45px;
}

#fai-passport{
  margin-right: 10px;
}

#title-passport-request{
  text-align: center;
}

#fai-passport-form{
  color: white;
  margin-right: 5px;
}

#passport-information{
  position:absolute;
  top:80px;
  left:50px;
  width:500px;
  margin-top:10px;
  text-align: center;  
}

#form-passport-request {
  padding: 20px;
  border: 5px solid #5e516e;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  margin-left:520px;
  margin-top:10px;
  margin-bottom: 50px;
  background-color: #3d3646;
  color: white;
  font-style: bold;
}

.ccppal{
    display: flex;
}

.title {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
}

.subtitle {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    font-style: bold;
}
</style>