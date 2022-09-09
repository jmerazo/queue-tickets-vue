<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back">
            <router-link id="btn-back-users-list-top" :to="{name: 'AreasList'}" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></router-link>
            <router-link id="btn-register-user-top" :to="{name: 'AddSubdependence'}" class="btn" type="button"><font-awesome-icon id="fai-user-list" :icon="['fas', 'plus']"/></router-link>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="areas-title">Subdependencies</h2>
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
                      <tr v-for="sub in subdependencies" :value="sub.id" :key="sub.id">
                          <!--td>{{user.document_type}}</td-->
                          <td>{{sub.name}}</td>
                          <td>{{sub.code}}</td>
                          <td>{{sub.created}}</td>
                          <td>{{sub.updated}}</td>
                          <td id="td-action-sub">
                            <router-link id="il-cfg" title="Update" type="submit" :to="{name: 'UpdateSubdependence', params: {id: sub.id, name: sub.name, code: sub.code}}"><font-awesome-icon id="fai-list" :icon="['fas', 'pen-to-square']"/></router-link>
                            <router-link id="il-cfg" title="Delete" type="submit" @click="subDelete(sub.id)" :to="{name: 'SubDelete', params: {id: sub.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'trash']"/></router-link>
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
      subdependencies: [],
      delid: null,
      idep: localStorage.getItem('idep')
    };    
  },
  mounted() {
    this.subdependenciesList();
    console.log("ID Dependence: ", localStorage.getItem('idep'))
  },
  computed: {
  },
  methods: {
    async subdependenciesList() {
      if(!this.idep){
        this.subdependencies = []
      }else{
        await axios.get(`http://localhost:8888/apitickets/subdependence/filter/${this.idep}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          this.subdependencies = Response.data;
        });
      }
    },
    async subDelete(sudid){
      await axios.delete(`http://localhost:8888/apitickets/subdependence/delete/${sudid}`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        if(!Response){
          console.log("Error")
        }
        this.$router.push('/subareas/list');
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

#td-action-sub{
  width: 50px;
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