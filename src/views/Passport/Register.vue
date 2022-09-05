<template>
    <section class="container">
      <form class="row">
        <div class="col-12 ctppal">
            <div class="col-7 form-ticket-rt-2">
                <h1>Solicite su turno de forma virtual para gestionar el tramite de Pasaporte</h1>
            </div>

            <div class="col-5 form-ticket-rt-1">
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
                        <button id="btn" type="submit" class="btn" @click="createTicket">Send</button>
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
      }    
    }
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

#btn {
    margin-top: 20px;
    align-content: center;
    background-color: #54426b;
    color: white;
}

.form-ticket-rt-1 {
    padding-top: 10px;
    padding-bottom: 15px;
    border-radius: 15px;
}

.ccppal{
    display: flex;
}

.form-ticket-rt-2 {
    padding-top: 10px;
    padding-bottom: 15px;
    border-radius: 15px;
    margin-right: 180px;
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