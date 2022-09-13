<template>
    <div>
        <h1>Listagem de Empresas</h1>
        <div class="row mt-5">
            <div class="col-6">
                <b-button v-b-modal.modal-1>Inserir Usuario</b-button>

                <b-modal id="modal-1" title="Adicionar Empresa">
                    <div class="row">
                        <div class="col-6">
                            <b-input v-model="NOME" placeholder="Nome"></b-input>
                        </div>
                        <div class="col-6">
                            <b-input v-model="CNPJ" placeholder="Cnpj"></b-input>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <b-button @click="addEmpresa" block variant="outline-success" >Adicionar</b-button>
                        </div>
                    </div>
                </b-modal>
            </div>
            <div class="col-6">
                <b-button variant="outline-primary">Voltar</b-button>
            </div>
        </div>
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
            </tbody>
          </table>
    </div>
</template>

<script>




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
            this.listagem.push(data);
            this.NOME = '';
            this.CNPJ = '';
        },
         async getEmpresas(page = 1){
           const res =  await this.$http.get('/empresas?page=' + this.page + '&total=' + this.total);
           this.listagem = res.data.data
           console.log(this.listagem);
        }
    },
    async created(){
       this.getEmpresas();
    }
}
</script>

<style>
</style>