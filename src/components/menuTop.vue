<template>
  <header class="header">
    <div class="">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="#"
            ><img
              src="@/assets/resources/queue.png"
              width="50"
              height="50"
            />Queue</a
          >
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav w-100 justify-content-center">
              <a
                class="nav-item nav-link active"
                href=""
                style="color: #1f4181"
                >Inicio
              </a>
              <a
                class="nav-item nav-link"
                href=""
                style="color: #1f4181"
                >IngresoCO</a
              >
              <a
                class="nav-item nav-link"
                href=""
                style="color: #1f4181"
                >Devoluciones</a
              >
              <a
                class="nav-item nav-link"
                href=""
                style="color: #1f4181"
                >Consulta</a
              >
              <a class="nav-item nav-link" href="/Imagen" style="color: #1f4181"
                >Imagenes</a
              >
              <a
                class="nav-item nav-link"
                href=""
                style="color: #1f4181"
                >Registro</a
              >
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "menuTop"
}
</script>
<style>
.header {
  background-color: #F3F9F7;
  border-bottom: 1px solid #81718B;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>