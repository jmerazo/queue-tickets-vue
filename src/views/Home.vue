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
            <button id="btn" class="btn btn-primary" @click="createPerson && activeForm()">Request Ticket</button>
          </div>
          
        </div>
        
      </div>

      <div class="col-5" id="form-ticket-2">
        <fieldset id="formRequest">
          <h2 class="title">Request Ticket</h2><br><br>

          <div class="row">
            <div class="col-6">
              <label class="form-label">Date</label>
              <input v-model="ticket.date" type="date" class="form-control">
            </div>

            <div class="col-6">
              <label class="form-label">Time</label>
              <input v-model="ticket.time" type="time" class="form-control">            
            </div>

            <div class="col-6">
              <label class="form-label">Dependence</label>
              <select v-model="dependence" @change="listSubdependences() && getCodeDependence()" class="form-control" id="dependence">
                <option value="" disabled>Select an option...</option>
                <option v-for="dependence in dependences" :value="dependence" :key="dependence.id">{{dependence.name}}</option>
              </select>            
            </div>

            <div class="col-6">
              <label class="form-label">Subdependence</label>
              <select v-model="subdependence" @change="listUserBySID() && getCodeSubdependence()" class="form-control" id="subdependence">
                <option value="" disabled>Select an option...</option>
                <option v-for="subdependence in subdependences" :value="subdependence.id" :key="subdependence">{{subdependence.name}}</option>
              </select>            
            </div>

            <div class="col-6">
              <label class="form-label">Functionary</label>
              <select v-model="userSID" class="form-control" id="userSID">
                <option value="" disabled>Select an option...</option>
                <option v-for="user in userBySID" :value="user.id" :key="user">{{user.names}} {{user.last_names}}</option>
              </select>            
            </div>

            <div class="col-6">
              <label class="form-label">Subject</label>
              <select v-model="subject" class="form-control" id="userSID">
                <option value="" disabled>Select an option...</option>
                <option v-for="subject in subjects" :value="subject.id" :key="subject">{{subject.subject}}</option>
              </select>            
            </div>

            <div class="col-12">
              <label class="form-label">Description</label>
              <input v-model="ticket.description" type="text" class="form-control">
            </div>

            <div class="col-3">
              <button id="btn" class="btn btn-primary" @click="createTicket && activeFormRequest">Send</button>
            </div>         
          </div>
          
        </fieldset>    
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
      ticket: {
        date: "",
        time: "",
        description: ""
      },
      departments: [],
      cities: [],
      selDepartment: "",
      selCity: "",
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
      count: ""
    };    
  },
  mounted() {
    this.listDepartments();
    this.listCities();
    this.listDependences();
    this.listSubdependences();
    this.listUserBySID();
    this.listSubjects();
    this.getCodeDependence();
    this.getCodeSubdependence();
    this.getCount();
    
    this.token = localStorage.getItem("token");

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
    activeFormRequest() {
      var activeForm = document.getElementById('formRequest');
      activeForm.disabled = true;
      return activeForm;   
    }
  },
  methods: {
    activeForm(){
      const form = document.getElementById('formRequest');
      form.addEventListener("click", () => (form.disabled = true));
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

    },
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
        subject_id : this.subject,
        description : this.ticket.description
      })

      await axios.post("http://localhost:8888/apitickets/ticket/create", dataTicket, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.clearInputsForm2();
        this.$router.push("/");
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

#form-ticket-2 {
  padding-top: 10px;
  border: 1px solid #004884;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-left: 30px;
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