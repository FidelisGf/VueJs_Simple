
<template>
    <b-container >
        <div>
        <h1>Listagem de Empresas</h1>
        <div class="row mt-5">
            <div class="col-6">
                <b-button v-b-modal.modal-1>Inserir Usuario</b-button>

                <b-modal id="modal-1" title="Adicionar Empresa">
                    <b-row>
                        <b-col>
                            <b-input v-model="NOME" placeholder="Nome"></b-input>
                        </b-col>
                        <b-col>
                            <b-input v-model="CNPJ" placeholder="Cnpj"></b-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <b-button @click="addEmpresa" pill variant="outline-success" class="raise" >Adicionar</b-button>
                        </b-col>
                    </b-row>
                </b-modal>
            </div>
            <div class="col-6">
                <router-link to="/"><b-button variant="outline-primary">Voltar</b-button></router-link> 
            </div>
        </div>
        
            <b-row>
                <b-col>
                    <table class="table mt-5 table-responsive-sm">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOME</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">EDITAR</th>
                            <th scope="col">EXCLUIR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="Empresa in listagem" :key="Empresa.ID">
                            <th scope="row">{{Empresa.ID}}</th>
                            <td>{{Empresa.NOME}}</td>
                            <td>{{Empresa.CNPJ}}</td>
                            <td><b-button variant="outline-success">Editar</b-button></td>
                            <td><b-button variant="outline-danger">Excluir</b-button></td>
                          </tr>
                          <b-button @click="previusPage" variant="outline-sucess">Pagina Anterior</b-button> 
                          <b-button @click="nextPage" variant="outline-sucess">Proxima Pagina</b-button> 
                        </tbody>
                      </table>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>



/* eslint-disable */
export default {
    
    data(){
        return{
           
            listagem:[],
            NOME:'',
            CNPJ:'',
            total : 10,
            pageInfo : null
        }
    },
    methods:{
        adicionarListagem(){
            
        },
        addEmpresa(){
            var data = {NOME:this.NOME,CNPJ:this.CNPJ}
            this.$http.post('/empresas', data).then((response)=>{
                console.log(response);
            })
            this.NOME = '';
            this.CNPJ = '';
        },
         async getEmpresas(page){
           if(!this.page >= 1){
                this.page = 1;
           }
           this.total = this.page + 1
           const res =  await this.$http.get('/empresas?page=' + this.page + '&total=' + this.total);
           this.listagem = res.data.data
           console.log(this.listagem);
        },

        nextPage(){
            this.page += 1
            this.getEmpresas(this.page)
        },
        previusPage(){
            this.page -= 1
            this.getEmpresas(this.page)
        }
    },
    async created(){
       this.getEmpresas();
    }
}
</script>

<style>
    .body-table{
        width: 100%;
    }
    .raise:hover,
    .raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
    }
</style>