<template>
    <section class="container">
      <form class="row">  
        <div class="col-6" id="form-ticket-1">
          <h2 class="title">User Info</h2>
  
          <div class="row">  
            <div>
              <font-awesome-icon id="fai-log" :icon="['fas', 'user']"/>
              <label class="form-label">Username</label>
            </div>
  
            <div>
              <font-awesome-icon id="fai-log" :icon="['fas', 'unlock']"/>
              <label class="form-label">Password</label>
            </div>        
          </div>        
        </div>
      </form>       
    </section>     
  </template>
  
  <script>
  
  export default {
    components: {
    },
    name: "profile-AQ",
    data() {   
    }, 
    setup(){    
    },
    methods: {   
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  .row {
    align-items: center;
    justify-items: center;
    justify-content: center;
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