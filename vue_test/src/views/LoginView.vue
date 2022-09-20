<template>
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
      
                  <h3 class="mb-5">Login</h3>
      
                  <div class="form-outline mb-4">
                    <input type="email" v-model="name" id="typeEmailX-2" class="form-control form-control-lg" />
                    <label class="form-label" for="typeEmailX-2">Usuario</label>
                  </div>
      
                  <div class="form-outline mb-4">
                    <input type="password" v-model="password" id="typePasswordX-2" class="form-control form-control-lg" />
                    <label class="form-label" for="typePasswordX-2">Password</label>
                  </div>
      
                  <!-- Checkbox -->
                 
                  <button class="btn btn-primary btn-lg btn-block" @click="logar" type="submit">Login</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>





export default {
   data(){
      return{
        name: '',
        password: '',
        show_menu: true,
      }
   },
   methods:{
      async logar(){
        const res = await this.$http.post("/auth/login", {NAME : this.name, PASSWORD: this.password});
        console.log(res);
        if(res.status == 200){
          localStorage.setItem('token', res.data.access_token);
          this.$router.push('list-empresa')
        }else{
          alert("Dados Invalidos");
        }
      },
      async logOut(){
          const response = await this.$http.post('/auth/logout');
          console.log(response);
          localStorage.clear('token')
      },
   },
   async created(){
      this.logOut();
    }
}
</script>

<style  scoped>
   
</style>