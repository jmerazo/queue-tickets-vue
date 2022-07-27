<template>
    <section class="container">
        <form class="row">
            <h2 class="title" id="tf-1">Welcome</h2>
            <label id="tf-1">User</label>      
            <div class="col-8" id="form-ticket-1">
                <h2 class="title">List Tickets</h2>

                <div class="row">
                    <div class="col-11" id="tab-1">
                        <table class="table table-hover">
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Ticket</th>
                                <th>User</th>
                                <th>Subject</th>
                                <th>State</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>2022-07-27</td>
                                <td>10:30</td>
                            </tr>
                        </table>                       
                    </div>          
                </div>                                
            </div>
            
            <div class="col-2" id="form-ticket-2">
                <h2>Calendar</h2>
            </div>
        </form> 
    </section>
</template>

<script>
export default {
  components: {
  },
  name: "ListTickets-AQ",
  data() {
    return {
    };    
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    //userLogin(){
    //    await axios.post()
//
    //}
    
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

#tf-1{
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

#tab-1{
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