<template>
    <section class="container">
        <form class="ctn-form-calendar">          
          <div id="btn-back" class="col-12">
            <router-link id="btn-back-calendar-config-top" :to="{name: 'Panel'}" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></router-link>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="areas-title">Calendar and times</h2>
            </div>
              <div class="col-6" id="form-calendar-config">
                <table class="table table table-striped table-hover" id="tb-morning-times">
                  <thead class="thead-dark">
                    <tr id="tr-title">
                        <th>Hour</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="time in times" :value="time.id" :key="time.id">
                        <td v-show="time.time_id >0 && time.time_id < 23">{{time.times}}</td>
                        <td v-show="time.time_id >0 && time.time_id < 23" v-if="time.status == 1" style="color:darkcyan;font-weight: bold;">Available</td>
                        <td v-show="time.time_id >0 && time.time_id < 23" v-if="time.status == 0" style="color:firebrick;font-weight: bold;">Not available</td>
                        <td id="td-action-times" v-show="time.time_id >0 && time.time_id < 23">
                          <a id="il-cfg" title="Deactivate time" @click="statusTimeUpdate(time.id)" type="submit" v-show="time.time_id >0 && time.time_id < 23" v-if="time.status == 1"><router-link :to="{name: 'timeUpdate', params: {id: time.id, status: 0}}"><font-awesome-icon id="fai-list" :icon="['fas', 'toggle-on']"/></router-link></a>
                          <a id="il-cfg" title="Activate time" @click="statusTimeUpdate(time.id)" type="submit" v-show="time.time_id >0 && time.time_id < 23" v-if="time.status == 0"><router-link :to="{name: 'timeUpdate', params: {id: time.id, status: 1}}"><font-awesome-icon id="fai-list" :icon="['fas', 'toggle-off']"/></router-link></a>
                        </td>
                    </tr>
                  </tbody>
                </table>
                <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <th>Hour</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="time in times" :value="time.id" :key="time.id">
                          <td v-show="time.time_id > 22">{{time.times}}</td>
                          <td v-show="time.time_id > 22" v-if="time.status == 1" style="color:darkcyan;font-weight: bold;">Available</td>
                          <td v-show="time.time_id > 22" v-if="time.status == 0" style="color:firebrick;font-weight: bold;">Not available</td>
                          <td id="td-action-times" v-show="time.time_id > 22">
                            <a id="il-cfg" title="Deactivate time" @click="statusTimeUpdate(time.id)" type="submit" v-show="time.time_id > 22" v-if="time.status == 1"><router-link :to="{name: 'timeUpdate', params: {id: time.id, status: 0}}"><font-awesome-icon id="fai-list" :icon="['fas', 'toggle-on']"/></router-link></a>
                            <a id="il-cfg" title="Activate time" @click="statusTimeUpdate(time.id)" type="submit" v-show="time.time_id > 22" v-if="time.status == 0"><router-link :to="{name: 'timeUpdate', params: {id: time.id, status: 1}}"><font-awesome-icon id="fai-list" :icon="['fas', 'toggle-off']"/></router-link></a>
                          </td>
                      </tr>
                    </tbody>
                  </table>                                        
              </div>
              <h5>Date select: </h5><label>{{this.days}}</label>
              <v-calendar 
                class="calendar-times" 
                color="purple" 
                :value="new Date()" 
                is-dark
                :min-date='new Date()'
                :max-date='new Date()' 
                :available-dates='{ start: new Date(), end: null}' 
                :attributes="attributes" 
                @dayclick="onDayClick"
                is-expanded
              />
            <!-- :min-date='new Date()' :max-date='new Date()' -->
            <button id="btn-days-clean" type="button" class="btn btn-primary" @click="cleanDays">Clean</button>
            <button id="btn-days-save" type="submit" class="btn btn-primary" @click="daysUser">Save</button>                                    
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
      times: [],
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
    cleanDays(){
      this.days = []
    },
    async daysUser() {
      const daysUser = JSON.stringify({
        user_id : localStorage.getItem('user_id'),
        days : this.days
      })

      await axios.post("http://localhost:8888/apitickets/user/calendar/days", daysUser, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.clearInputsForm1();
      });
    },
    onDayClick(day){
      const idx = this.days.findIndex(d => d.id === day.id);
      if(idx >= 0){
        this.days.splice(idx, 1)
        console.log("IDX: ",idx)
      }else{
        //this.days.push({
        //  id : day.id,
        //  date : day.date
        //})
        this.days.push(day.date.toString().substring(8,10));
        //this.days = day.date;
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

.calendar-times {
  margin-bottom: 20px;
  margin-left: 25px;
}

#il-cfg{
  margin-left: 5px;
}

#tb-morning-times{
  border-right: 1px solid #54426b;
}

#fai-list{
  color: rgb(0, 0, 0);
}

#td-action-times{
  width: 40px;
  text-align: center;
}

#btn-days-clean{
  margin-bottom: 50px;
  width: 80px;
}

#btn-days-save{
  margin-bottom: 50px;
  margin-left: 15px;
  width: 80px;
}

#calendar-days{
  top: 135px;
  left: 100px;
  position: absolute;
}

#tf-1{
  align-content: left;
  justify-content: left;
}

#tr-title {
  text-align: center;
}

#btn-back-calendar-config-top {
  position: absolute;
  top: 80px;
  left: 30px;
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

#form-calendar-config{
  display: flex;
  margin-top: 20px;
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