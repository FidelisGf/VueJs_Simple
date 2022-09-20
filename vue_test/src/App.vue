<template>
  <div id="app">
<<<<<<< HEAD
    <div>
      <b-row align-v="start" >
        <b-col align-self="start" cols="2">
          <b-button v-b-toggle.sidebar-1 variant="outline-success" class="mt-3">Menu</b-button>
        </b-col>
      </b-row>
      
      <b-sidebar id="sidebar-1"  title="Menu-Admin" shadow>
        <b-row class="mt-4">
          <b-col>
            <router-link to="/"><b-button variant="outline-success" >Pagina Inicial</b-button></router-link> 
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <router-link to="/list-empresa"><b-button variant="outline-success" >Gestão das Empresas</b-button></router-link>
          </b-col>
        </b-row>
        <b-row class="mt-2" >
          <b-col>
            <b-button variant="outline-success">Gestão das Categorias</b-button>
          </b-col>
        </b-row>
        <b-row >
          <b-col class="mt-2">
            <b-button variant="outline-success" >Gestão dos Produtos</b-button>
          </b-col>
        </b-row>
      
        
        
        
       
      </b-sidebar>
    </div>
=======
    <SideBar></SideBar>
>>>>>>> a2713cf0d9254882b05eb5940be0eec7b26cb525
    <router-view/>
    
  </div>
</template>
<script>
import SideBar from './components/SideBar.vue';

    export default{
    components: { SideBar }
    
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
