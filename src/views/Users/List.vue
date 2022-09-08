<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back">
            <a id="btn-back-users-list-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
            <a id="btn-register-user-top" href="/user/create" class="btn" type="button"><font-awesome-icon id="fai-user-list" :icon="['fas', 'user-plus']"/></a>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="list-users-title">Users</h2>
            </div> 
            
              <div class="col-11" id="form-users-list">
                  <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <!--th>Document</th-->
                          <th>Identification</th>
                          <th>Names</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Dependence</th>
                          <th>Subdep</th>
                          <th>Status</th>
                          <th>Actión</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users_list" :value="user.id" :key="user.id">
                          <!--td>{{user.document_type}}</td-->
                          <td>{{user.document_number}}</td>
                          <td>{{user.names +" "+ user.last_names}}</td>
                          <td>{{user.phone}}</td>
                          <td>{{user.email}}</td>
                          <td>{{user.dname}}</td>
                          <td>{{user.sname}}</td>
                          <td v-if="user.status == 1" style="color:darkcyan;">Activo</td>
                          <td v-if="user.status == 0" style="color:firebrick">Inactivo</td>
                          <td id="td-action-users">
                            <a id="il-cfg" title="Add" type="submit"><router-link :to="{name: 'userCreate', params: {id: user.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'user-plus']"/></router-link></a>
                            <a id="il-cfg" title="Update" type="submit"><router-link :to="{name: 'userUpdate', params: {id: user.id, document_type: user.document_type, document_number: user.document_number, names: user.names, last_names: user.last_names, phone: user.phone, email: user.email, dependence_id: user.dependence_id, subdependence_id: user.subdependence_id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'user-pen']"/></router-link></a>
                            <a id="il-cfg" title="Change Password" type="submit"><router-link :to="{name: 'passwordUpdate', params: {id: user.id, email: user.email}}"><font-awesome-icon id="fai-list" :icon="['fas', 'key']"/></router-link></a>
                            <a id="il-cfg" title="Deactivate user" type="submit" @click="statusUpdate()" v-if="user.status == 1"><router-link :to="{name: 'statusUpdate', params: {id: user.id, status: 0}}"><font-awesome-icon id="fai-list" :icon="['fas', 'user-xmark']"/></router-link></a>
                            <a id="il-cfg" title="Activate user" type="submit" @click="statusUpdate()" v-if="user.status == 0"><router-link :to="{name: 'statusUpdate', params: {id: user.id, status: 1}}"><font-awesome-icon id="fai-list" :icon="['fas', 'user-check']"/></router-link></a>
                            <a id="il-cfg" title="Delete" type="submit" @click="userDelete()"><router-link :to="{name: 'userDelete', params: {id: user.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'trash']"/></router-link></a>
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

#il-cfg{
  margin-left: 5px;
}

#fai-list{
  color: rgb(0, 0, 0);
}

#td-action-users{
  width: 140px;
}

#tf-1{
  align-content: left;
  justify-content: left;
}

#tr-title {
  text-align: center;
}

#btn-back-users-list-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-register-user-top {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #54426b;
  color: white;
}

#form-users-list{
  display: flex;
  padding-top: 10px;
  border: 1px solid #54426b; 
  border-radius: 20px; 
}

#list-users-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>