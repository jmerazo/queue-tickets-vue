<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back" class="col-12">
            <router-link id="btn-back-users-list-top" :to="{name: 'Panel'}" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></router-link>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="areas-title">Days</h2>
            </div> 
            
            <v-date-picker v-model="date" color="purple" :value="null" is-dark :available-dates='{ start: new Date(), end: null}' :attributes="attributes" @dayclick="onDayClick"/>
            <!-- :min-date='new Date()' :max-date='new Date()' -->       
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
      days: []
    };    
  },
  mounted() {
    this.timeList();
  },
  computed: {
    dates(){
      return this.days.map(day => day.date)
    },
    attributes(){
      return this.dates.map(date => ({
        highlight: true,
        dates: date
      }));
    }
  },
  methods: {
    onDayClick(day){
      const idx = this.days.findIndex(d => d.id === day.id);
      if(idx >= 0){
        this.days.splice(idx, 1)
        console.log("IDX: ",idx)
      }else{
        this.days.push({
          id : day.id,
          date : day.date
        })
        console.log("Days id: ", this.id),
        console.log("Days date: ", this.date)
      }
    },  
    async timeList(){
      const id = localStorage.getItem('user_id');
      await axios.get(`http://localhost:8888/apitickets/user/calendar/times/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.times = Response.data;
      });
    },
    async statusTimeUpdate(id){
      const status = JSON.stringify({
        status: this.$route.params.status
      })
      console.log('Status time: ', this.$route.params.status)        
      await axios.put(`http://localhost:8888/apitickets/user/calendar/status/time/${id}`, status, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then((Response) => {
          if(!Response){
            console.log("Error")
          }
          this.$router.push('/user/calendar/times');
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

#td-action-times{
  width: 40px;
  text-align: center;
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
  text-align: center;
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