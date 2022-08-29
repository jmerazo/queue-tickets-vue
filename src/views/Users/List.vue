<template>
    <section class="container">
        <form class="ctn-form">
          <div>
            <h2 class="title" id="tf-1">Welcome</h2>
            <label id="tf-1">User</label>
          </div>
          
          <div id="btn-back">
            <a href="/user/panel/administrator" class="btn btn-primary" type="button">Volver</a>      
          </div>            
                            
          <div class="row">
            <div>
              <h2 class="title">Users</h2>
            </div> 
              <div class="col-11" id="tab-1">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <th>Document</th>
                          <th>Number</th>
                          <th>Names</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Dependence</th>
                          <th>Subdependence</th>
                          <th>Status</th>
                          <th>Actión</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users_list" :value="user.id" :key="user.id">
                          <td>{{user.document_type}}</td>
                          <td>{{user.document_number}}</td>
                          <td>{{user.names +" "+ user.last_names}}</td>
                          <td>{{user.phone}}</td>
                          <td>{{user.email}}</td>
                          <td>{{user.dependence_id}}</td>
                          <td>{{user.subdependence_id}}</td>
                          <td>{{user.status}}</td>
                          <td>
                            <a>&#128466;</a>
                            <a :value="user" :key="user.id" type="button" @click="userDelete(user.id)">&#128465;</a>
                            <a>&#128272;</a>
                            <a>&#128259;</a>
                            <a>&#9940;</a>
                          </td>
                      </tr>
                    </tbody>
                  </table>                       
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
  name: "Users-List",
  data() {
    return {
      users_list: [],
      udelete: ""
    };    
  },
  mounted() {
    this.usersList();
  },
  computed: {

  },
  methods: {
    async usersList(){
      await axios.get("http://localhost:8888/apitickets/users", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        console.log(Response.data)
        this.users_list = Response.data;
      });
    },
    async userDelete(){
      await axios.delete(`http://localhost:8888/apitickets/user/delete/${this.udelete}`)
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
  /*overflow: hidden;*/
  /*clear: both;*/
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#tf-1{
  align-content: left;
  justify-content: left;
}

#tr-title {
  text-align: center;
}

#btn-back {
  margin-top: 10px;
  margin-bottom: 10px;
  float: top;
  overflow: auto;
}

#tab-1{
  display: flex;
  padding-top: 10px;
  border: 1px solid #004884; 
  border-radius: 25px; 
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