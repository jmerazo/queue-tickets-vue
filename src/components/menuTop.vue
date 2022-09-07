<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="nav-start">
            <a class="navbar-brand" href="/" id="txt-nav-log">
             <img src="@/assets/resources/queue.png"
              width="60"
              height="50"/>
              Queue
            </a>
          </div>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav-end"
            aria-controls="nav-end"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="nav-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="/" id="txt-nav">Home</a>
              </li>

              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="/passport/request/ticket" id="txt-nav">Passport</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="http://gesdoc.putumayo.gov.co/#!/page/login" id="txt-nav">GesDoc</a>
              </li>

              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="http://nomina.putumayo.gov.co/autlogin" id="txt-nav">SigNom</a>
              </li>

              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="https://www.putumayo.gov.co/" id="txt-nav">Portal web</a>
              </li>
              <li class="nav-item">
                <div class="dropdown dropstart">
                  <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split nav-item nav-link" id="btncircle" data-bs-toggle="dropdown">
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="btncircle">
                    <li v-show="uid"><h6 id="t-log">{{ this.names +' '+this.last_names }}</h6></li>
                    <li class="divider"></li>
                    <li v-show="!uid"><a class="dropdown-item" href="/users/login"><font-awesome-icon id="fai-log" :icon="['fas', 'user-lock']"/>Login</a></li>
                    <li v-show="this.rol == 1 || this.rol == 2 && uid"><a class="dropdown-item" href="/user/panel"><font-awesome-icon id="fai-log" :icon="['fas', 'columns']"/>Panel</a></li>
                    <li v-show="this.rol != 1 || this.rol != 2 && uid"><a class="dropdown-item" href="/user/panel/administrator"><font-awesome-icon id="fai-log" :icon="['fas', 'columns']"/>Panel</a></li>
                    <li v-show="uid"><a class="dropdown-item" href="/user/profile"><font-awesome-icon id="fai-log" :icon="['fas', 'address-card']"/>Profile</a></li>
                    <li class="divider"></li>
                    <li v-show="uid"><a class="dropdown-item" type="button" @click="logOut"><font-awesome-icon id="fai-log" :icon="['fas', 'right-from-bracket']"/>Log out</a></li>
                  </ul>
                </div>                                 
              </li>          
            </ul>
          </div>
        </div>          
      </nav>
  </header>
</template>
<script>
import axios from "axios";
export default {
  name: "MenuTop",
  data(){
    return {
      names: "",
      last_names: "",
      rol: localStorage.getItem('rol'),
      uid: localStorage.getItem('user_id')
    }    
  },
  mounted() {
    this.userById();
  }, 
  methods: {
    async userById(){
      if(!this.uid){
          this.names = ""
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
    },
    logOut() {
      localStorage.removeItem("token")
      localStorage.removeItem('user_id')
      this.$router.push('/users/login')
    }   
  }
}
</script>
<style>
.header {
  display: flex;
  background-color: #F6F8F9;
  border-bottom: 1px solid #E6EFFD;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navbar {
  width: 100%;
  margin-left: 30px;
  margin-right: 30px;
}

#fai-log{
  margin-right: 5px;
}

#t-log{
  margin-left: 10px;
}

#btncircle{
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  border-radius: 35px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
  border: 1px solid #54426b;
}

#txt-nav-log{
  color: #54426b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.8em;
}

#txt-nav {
  color: #54426b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.1em;
}

.nav-start {
  justify-content: left;
  align-content: left;
}

#nav-end {
  align-content: right;
  justify-content: right;
}
</style>