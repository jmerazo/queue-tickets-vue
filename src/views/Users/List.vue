<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back">
            <a id="abtn-1" href="/user/panel/administrator" class="btn btn-primary" type="button">Back</a>
            <a id="abtn-2" href="/user/create" class="btn btn-primary" type="button">Register</a>       
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
                          <td>{{user.dname}}</td>
                          <td>{{user.sname}}</td>
                          <td v-if="user.status == 1">Activo</td>
                          <td v-if="user.status == 0">Inactivo</td>
                          <td>
                            <a title="Add" type="submit"><router-link :to="{name: 'userCreate', params: {id: user.id}}">&#128466;</router-link></a>
                            <a title="Delete" type="submit" @click="userDelete()"><router-link :to="{name: 'userDelete', params: {id: user.id}}">&#128465;</router-link></a>
                            <a title="Update" type="submit"><router-link :to="{name: 'userUpdate', params: {id: user.id, document_type: user.document_type, document_number: user.document_number, names: user.names, last_names: user.last_names, phone: user.phone, email: user.email, dependence_id: user.dependence_id, subdependence_id: user.subdependence_id}}">&#128259;</router-link></a>
                            <a title="Change Password" type="submit"><router-link :to="{name: 'passwordUpdate', params: {id: user.id, email: user.email}}">&#128272;</router-link></a>
                            <a title="Deactivate user" type="submit" @click="statusUpdate()" v-if="user.status == 1"><router-link :to="{name: 'statusUpdate', params: {id: user.id, status: 0}}">&#9940;</router-link></a>
                            <a title="Activate user" type="submit" @click="statusUpdate()" v-if="user.status == 0"><router-link :to="{name: 'statusUpdate', params: {id: user.id, status: 1}}">&#9989;</router-link></a>
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
import dictionary from '@/helpers/dictionary'

export default {
  components: {
  },
  name: "Users-List",
  data() {
    return {
      users_list: [],
      udelete: null,
      dependences: dictionary.dependences,
      subdependences: dictionary.subdependences,
      stat: dictionary.status
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
        console.log(Response.data);
        console.log("Users by: ", Response.data)
        this.users_list = Response.data;
      });
    },
    async userDelete(){
      this.udelete = this.$route.params.id;
      await axios.delete(`http://localhost:8888/apitickets/user/delete/${this.udelete}`,{
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          if(!Response){
            console.log("Error")
          }
          this.$router.push('/users/list');
        });
    },
    async statusUpdate(){
      this.uid = this.$route.params.id;
      const status = JSON.stringify({
        status: this.$route.params.status
      })        
      console.log("Status: ", status)
      await axios.put(`http://localhost:8888/apitickets-auth/user/status/update/${this.uid}`, status, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          if(!Response){
            console.log("Error")
          }
          this.$router.push('/users/list');
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

#abtn-2 {
  margin-left: 10px;
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