<template>
  <section class="container">
    <form class="row">
      <h2 id="title-panel-basic">Welcome</h2>
      <label id="subtitle-panel-basic">{{ this.names +' '+this.last_names }}</label>
      <div id="btn-back">
        <router-link title="Days available" id="btn-register-user-top" :to="{name: 'ListDays'}" class="btn" type="button"><font-awesome-icon :icon="['fas', 'calendar']"/></router-link>
        <router-link title="Hours available" id="btn-register-user-top" :to="{name: 'ListTimes'}" class="btn" type="button"><font-awesome-icon :icon="['fas', 'clock']"/></router-link>       
      </div>
        <div>
          <h2 id="tickets-title">List Tickets</h2>
        </div>

        <div class="row">
          <div class="col-12" id="tab-1">
            <table class="table table-hover">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Ticket</th>
                <th>Person</th>
                <th>Subject</th>
                <th>State</th>
                <th>Action</th>
              </tr>
              <tr v-for="ticket in tickets" :value="ticket.id" :key="ticket.id">
                <td>{{ ticket.date }}</td>
                <td>{{ ticket.time }}</td>
                <td>{{ ticket.prefix + ticket.count }}</td>
                <td>{{ ticket.names +' '+ticket.last_names }}</td>
                <td>{{ ticket.description }}</td>
                <td v-if="ticket.status == 1">Activate</td>
                <td v-if="ticket.status == 0">Inactivate</td>
                <td>
                  <button>e</button>
                </td>
              </tr>
            </table>
            <v-date-picker v-model="date" color="purple" :value="null" is-dark is-range :disabled-dates='{ days: this.daysNot}'/>
            <!-- :min-date='new Date()' :max-date='new Date()' -->
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
  name: "ListTickets-AQ",
  data() {
    return {
      uid: localStorage.getItem('user_id'),
      names: "",
      last_names: "",
      tickets: [],
      selectedDate: "",
      date: "",
      daysNot: [1,2,3,4,5]
    };
  },
  mounted() {
    this.userById();  
    this.listTickets();
  },
  computed: {

  },
  methods: {
    async listTickets() {
      if (!this.uid) {
        this.tickets = ""
      } else {
        await axios.get(`http://localhost:8888/apitickets/tickets/list/${this.uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
          .then((Response) => {
            console.log("Tickets iner: ", Response.data);
            this.tickets = Response.data;
          });
      }
    },
    async userById(){
      if(!this.uid){
          this.names = ""
          this.last_names = ""
      }else{
          await axios.get(`http://localhost:8888/apitickets/user/search/${this.uid}`, {
          headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
          }
          })
          .then((Response) => {
              console.log("Store response username: ", Response.data)
              this.names = Response.data[0].names;
              this.last_names = Response.data[0].last_names;
          });
      }
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
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#tf-1 {
  align-content: left;
  justify-content: left;
}

#tab-1 {
  display: flex;
  padding-top: 10px;
  border: 1px solid #54426b;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

#title-panel-basic {
  display: flex;
  align-content: left;
  justify-content: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#subtitle-panel-basic {
  display: flex;
  align-content: left;
  justify-content: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#tickets-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>