<template>
    <div v-if="!['login'].includes($route.name)">
        <b-row align-v="start" >
          <b-col align-self="start" cols="4">
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
          <b-row >
            <b-col class="mt-2">
              <b-button @click="logOut" variant="outline-success"  >Sair</b-button>
            </b-col>
          </b-row>
        </b-sidebar>
        
    </div>
</template>

<script>
export default {
      data(){
        return{
            show_menu: false
        }
        
      },
      methods:{
        async profile(){
          const response = await this.$http.get('/auth/profile');
          console.log(response);
        },
        async logOut(){
          const response = await this.$http.post('/auth/logout');
          console.log(response);
        },
      },
      async created() {
        this.profile();
      },

    //   destroyed(){
    //     this.logOut();
    //   }
}
</script>

<style lang="scss" scoped>

</style>