<template>
    <section style="margin-top:2rem; margin-right:2rem;">
        <section class="index">
            <h1 class="display-1" style="text-align:center; ">Tickets</h1>
            <div style="text-align:center;">
                <label for="">Fill out the form</label>
                <label for="">Document type</label><input type="text" class="form-ticket-1">
                <label for="">Document number</label><input type="text" class="form-ticket-1">
                <label for="">Names</label><input type="text" class="form-ticket-1">
                <label for="">Last Names</label><input type="text" class="form-ticket-1">
                <label for="">Phone</label><input type="text" class="form-ticket-1">
                <label for="">Email</label><input type="text" class="form-ticket-1">
                <div>
                    <b-dropdown id="dropdown-left" text="Select city" variant="primary" class="m-2">
                        <b-dropdown-item href="#">Action</b-dropdown-item>
                        <b-dropdown-item href="#">Another action</b-dropdown-item>
                        <b-dropdown-item href="#">Something else here</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div>
                    <b-dropdown id="dropdown-left" text="Select department" variant="primary" class="m-2">
                        <b-dropdown-item href="#">Action</b-dropdown-item>
                        <b-dropdown-item href="#">Another action</b-dropdown-item>
                        <b-dropdown-item href="#">Something else here</b-dropdown-item>
                    </b-dropdown>
                </div>

                <button style="margin-left:0.5rem; margin-top:10px" class="btn btn-secondary" type="button" @click="salir">Salir</button>
            </div>
        </section>
    </section> 
</template>

<script>
import axios from "axios";
import menuTop from "@/components/menuTop.vue";

export default {
  components: {
    menuTop
  },
  name: "Home",
  data() {
    return {
      /*token: "",*/
    };
  },
  mounted() {
    /*this.token = localStorage.getItem("token");*/

    fetch("http://localhost:8888/apitickets/empresa", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem("token")
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })

  },
  methods: {
    /*salir() {
      localStorage.removeItem("token")
      this.$router.push('/login')
    }*/
  }
};
</script>

<style>
/*.contimage{
  width:100%; 
  margin-left:1rem;
  margin-right:2rem;
  height: 400px;
  background-image:url('../assets/imagenes/transporte.png');
}*/
</style>