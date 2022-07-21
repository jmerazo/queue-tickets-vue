<template>
    <section style="margin-top:2rem; margin-right:2rem;">
        <section class="index">
            <h1 class="display-1" style="text-align:center; ">Tickets</h1>
            <div style="text-align:center;">
                <label>Fill out the form</label><br><br>
                <label>Document type</label><input v-model="person.document_type" type="text" class="form-ticket-1"><br>
                <label>Document number</label><input v-model="person.document_number" type="text" class="form-ticket-1"><br>
                <label>Names</label><input v-model="person.names" type="text" class="form-ticket-1"><br>
                <label>Last Names</label><input v-model="person.last_names" type="text" class="form-ticket-1"><br>
                <label>Phone</label><input v-model="person.phone" type="text" class="form-ticket-1"><br>
                <label>Email</label><input v-model="person.email" type="text" class="form-ticket-1"><br>

                <div class="col-6">
                  <div class="form-group">
                      <label for="departments">Departments</label>
                      <select v-model="selDepartment" @change="listCities()" class="form-control" id="department">
                          <option value="" disabled>Select an option...</option>
                          <option v-for="department in departments" :value="department" :key="department.code">{{department.name}}</option>
                      </select>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                      <label for="cities">Cities</label>
                      <select v-model="selCity" class="form-control" id="city">
                          <option value="" disabled>Select an option...</option>
                          <option v-for="city in cities" :value="city.id" :key="city">{{city.name}}</option>
                      </select>
                  </div>
                </div>
                <button class="btn btn-secondary" @click="createPerson">Send</button>
            </div>
        </section>
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
      .then((r) => {
        console.log(r);
        this.$router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
    }    
  }
};
</script>

<style>

</style>