<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="nav-start">
            <a class="navbar-brand" href="#" id="txt-nav-log">
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
                <a class="nav-item nav-link btn btn-light" href="" id="txt-nav">Passport</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="" id="txt-nav">Tickets</a>
              </li>

              <li class="nav-item">
                <a class="nav-item nav-link btn btn-light" href="/users/login" id="txt-nav">Login</a>
              </li>          
            </ul>
          </div>
        </div>          
      </nav>
  </header>
</template>
<script>
export default {
  name: "MenuTop"
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

#txt-nav-log{
  color: #004884;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.8em;
}

#txt-nav {
  color: #004884;
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