<template>
    <section style="margin-top:2rem; margin-right:2rem;">
        <section class="index">
            <h1 class="display-1" style="text-align:center; ">Tickets</h1>
            <div style="text-align:center;">
                <label for="">Fill out the form</label><br>
                <label for="">Document type</label><input type="text" class="form-ticket-1"><br>
                <label for="">Document number</label><input type="text" class="form-ticket-1"><br>
                <label for="">Names</label><input type="text" class="form-ticket-1"><br>
                <label for="">Last Names</label><input type="text" class="form-ticket-1"><br>
                <label for="">Phone</label><input type="text" class="form-ticket-1"><br>
                <label for="">Email</label><input type="text" class="form-ticket-1"><br>

                <div class="col-6">
                  <div class="form-group">
                      <label for="departments">Departments</label>
                      <select ref="selectDepartment" v-model="this.departments" class="form-control" id="department">
                          <option v-for="department in departments" :value="department.id" :key="department">{{department.name}}</option>
                      </select>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                      <label for="cities">Cities</label>
                      <select ref="selectCity" v-model="this.cities" class="form-control" id="city">
                          <option v-for="city in cities" :value="city.id" :key="city">{{city.name}}</option>
                      </select>
                  </div>
                </div>
                <button style="margin-left:0.5rem; margin-top:10px" class="btn btn-secondary" type="button" @click="salir">Send</button>
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
      departments: [],
      cities: [],
      select: this.$refs.selectDepartment
    };    
  },
  mounted() {
    axios.get(`http://localhost:8888/apitickets/cities/filter/${this.select}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((Response) => {
      console.log("Cities", Response.data)
      this.cities = Response.data;
    });

    axios.get("http://localhost:8888/apitickets/departments", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((Response) => {
      console.log("Departments", Response.data)
      this.departments = Response.data;
    });
  },
  methods: {
    
  }
};
</script>

<style>

</style>