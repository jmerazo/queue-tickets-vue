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
          <div class="col-5" id="form-calendar-days">
                <table class="tb-calendar">
                  <thead>
                    <tr>
                      <th>Lu</th>
                      <th>Ma</th>
                      <th>Mie</th>
                      <th>Ju</th>
                      <th>Vi</th>
                      <th>Sá</th>
                      <th>Do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td :value="1">1</td>
                      <td :value="2">2</td>
                      <td :value="3">3</td>
                      <td :value="4">4</td>
                    </tr>
                    <tr>
                      <td :value="5">5</td>
                      <td :value="6">6</td>
                      <td :value="7">7</td>
                      <td :value="8">8</td>
                      <td :value="9">9</td>
                      <td :value="10">10</td>
                      <td :value="11">11</td>
                    </tr>
                    <tr>
                      <td :value="12">12</td>
                      <td :value="13">13</td>
                      <td :value="14">14</td>
                      <td :value="15">15</td>
                      <td :value="16">16</td>
                      <td :value="17">17</td>
                      <td :value="18">18</td>
                    </tr>
                    <tr>
                      <td :value="19">19</td>
                      <td :value="20">20</td>
                      <td :value="21">21</td>
                      <td :value="22">22</td>
                      <td :value="23">23</td>
                      <td :value="24">24</td>
                      <td :value="25">25</td>
                    </tr>
                    <tr>
                      <td :value="26">26</td>
                      <td :value="27">27</td>
                      <td :value="28">28</td>
                      <td :value="29">29</td>
                      <td :value="30">30</td>
                      <td :value="31">31</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
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

.tb-calendar{
  border-radius: 15px;
  justify-content: top;
}

.tb-calendar th, .tb-calendar td{
  text-align: center;
  padding: .2em .5em;
  border: 1px solid #3d3646;
}

.tb-calendar td{
  text-align: left;
  font-size: .8em;
  padding-bottom: 3em;
  padding-right: 3em;
}

.tb-calendar td:hover{
  background-color: rgb(131, 131, 131);
  cursor: pointer;
  font-size: 1.6em;
  text-align: center;
  padding: 0;
  border-radius: 10px;
}

#form-calendar-days{
  padding: 20px;
  border: 5px solid #5e516e;
  border-radius: 15px;
  margin-bottom: 600px;
  background-color: #3d3646;
  color: white;
  font-style: bold;
  margin-left: 15px;
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