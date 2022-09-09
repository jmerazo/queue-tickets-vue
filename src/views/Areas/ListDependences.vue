<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back">
            <a id="btn-back-users-list-top" href="/user/panel/administrator" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
            <a id="btn-register-user-top" href="/dependence/create" class="btn" type="button"><font-awesome-icon id="fai-user-list" :icon="['fas', 'plus']"/></a>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="areas-title">Dependences</h2>
            </div> 
            
              <div class="col-11" id="form-users-list">
                  <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <!--th>Document</th-->
                          <th>Name</th>
                          <th>Code</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="dep in dependences" :value="dep.id" :key="dep.id">
                          <td>{{dep.name}}</td>
                          <td>{{dep.code}}</td>
                          <td>{{dep.created}}</td>
                          <td>{{dep.updated}}</td>
                          <td id="td-action">
                            <a id="il-cfg" title="List dependences" type="submit"><router-link :to="{name: 'SubareasList', params: {id: dep.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'list']"/></router-link></a>
                            <a id="il-cfg" title="Update" type="submit"><router-link :to="{name: 'UpdateDependence', params: {id: dep.id, name: dep.name, code: dep.code}}"><font-awesome-icon id="fai-list" :icon="['fas', 'pen-to-square']"/></router-link></a>
                            <a id="il-cfg" title="Delete" type="submit" @click="depDelete()"><router-link :to="{name: 'SubDelete', params: {id: dep.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'trash']"/></router-link></a>
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
  name: "Areas-List",
  data() {
    return {
      dependences: [],
      idelete: null
    };    
  },
  mounted() {
    this.dependencesList();
  },
  computed: {
  },
  methods: {
    async dependencesList(){
      await axios.get("http://localhost:8888/apitickets/dependences", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.dependences = Response.data;
      });
    },
    async depDelete(){
      this.idelete = this.$route.params.id;
      await axios.delete(`http://localhost:8888/apitickets/dependence/delete/${this.idelete}`,{
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          if(!Response){
            console.log("Error")
          }
          this.$router.push('/areas/list');
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

#td-action{
  width: 80px;
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
  margin-bottom: 50px;
}

#areas-title {
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