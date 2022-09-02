<template>
  <section class="container">
    <form class="row">
      <h2 class="title" id="tf-1">Welcome</h2>
      <label>{{ this.names +' '+this.last_names }}</label>
        <div>
          <h2 class="title">List Tickets</h2>
        </div>

        <div class="row">
          <div class="col-11" id="tab-1">
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
      tickets: []
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

#btn {
  margin-top: 20px;
  align-content: center;
  background-color: #004884;
}

#form-ticket-1 {
  padding-top: 10px;
  border: 1px solid #004884;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  margin-top: 20px;
}

#form-ticket-2 {
  padding-top: 10px;
  border: 1px solid #004884;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-left: 30px;
}

#tab-1 {
  display: flex;
  padding-top: 10px;
  border: 1px solid #004884;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
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