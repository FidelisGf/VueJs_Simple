<template>
    <div>
        <h1 class="mt-4">Listagem de Empresas</h1>
        <b-row class="row mt-5">
            <b-col cols="4">
               <router-link to="/"><b-button variant="outline-primary" >Voltar</b-button></router-link> 
            </b-col>
            <b-col cols="4" >
                <b-button variant="outline-success" v-b-modal.modal-1>Inserir Empresa</b-button>
                <b-modal id="modal-1" title="Adicionar Empresa">
                    <b-form responsive-sm  @click.stop.prevent>
                        <b-row>
                            <b-col>
                                <b-form-input v-model="NOME" :state="validationNome" id="feedback-nome"></b-form-input>
                                    <b-form-invalid-feedback :state="validationNome">
                                        O nome deve possuir entre 2 a 49 caracteres
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback :state="validationNome">
                                        Nome válido.
                                    </b-form-valid-feedback>
                            </b-col>
                            <b-col>
                            <b-input v-model="CNPJ" placeholder="Cnpj"></b-input>
                            </b-col>
                        </b-row>
                    </b-form>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <b-button @click="addEmpresa" pill variant="outline-success" class="raise" >Adicionar</b-button>
                        </b-col>
                    </b-row>
                </b-modal>
            </b-col>
            <b-col cols="4">
                <b-input-group>
                    <b-form-select  v-model="selected" :options="options" class="select" ></b-form-select>
                    <b-button @click="getSearch" text="Button" variant="success">Aplicar</b-button>
                </b-input-group>
                <b-input type="text" placeholder="Digite a Empresa aqui" v-model="query" v-on:keyup="autoComplete" class="form-control w-100"> </b-input>
                <div class="panel-footer" v-if="results.length">
                    <b-list-group >
                        <b-list-group-item v-model="result" @click="resulComplete(empresa.NOME)"  v-for="empresa in results" :key="empresa.ID_EMPRESA" class="result_auto w-50" button>{{ empresa.NOME }}</b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>  
        </b-row>
        <ListTemplate  :listagem="listagem" :columns="columns" :edit="edit" ></ListTemplate>
        <b-row align-v="center">
            <b-col >
                <b-button @click="previusPage" variant="outline-danger" class="btn">Preview</b-button> 
                <b-button @click="nextPage" variant="outline-success">Next</b-button> 
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ListTemplate from './ListTemplate.vue';
/* eslint-disable */
export default {
    data(){
        return{
            show: false,
            listagem: [],
            NOME: "",
            CNPJ: "",
            rota: "/empresas?page=",
            total: 10,
            page: 1,
            search: null,
            pageInfo: null,
            selected: null,
            last_page: null,
            query: '',
            user : '',
            results: [],
            result : '',
            options: [
                { value: "/empresas?page=", text: "Sem Filtro" },
                { value: "BYNAME", text: "Por nome" },
                { value: "b", text: "Nao sei" },
                { value: { C: "3PO" }, text: "This is an option with object value" },
                { value: "d", text: "This one is disabled", disabled: true }
            ],
            columns: [
                { name: "ID", title: "ID"},
                { name: "NOME", title: "NOME"},
                { name: "CNPJ", title: "CNPJ"},
            ],
            edit : 'edit-empresa',
        }
    },
    methods:{
        nextPage() {
            this.page += 1;
            this.getSearch();
        },
        previusPage() {
            this.page -= 1;
            this.getSearch();
        },
        async getSearch(page) {
            this.total = this.page + 1;
            const res = await this.$http.get("/searchEmp?page=" + this.page + "&total=" + this.total, { params: { search: this.query, selected: this.selected } });
            if(res.data.data != undefined){
                return this.listagem = res.data.data
            }else{
                this.listagem = res.data
            }
            console.log(this.listagem);
        },
        addEmpresa() {
            var data = { NOME: this.NOME, CNPJ: this.CNPJ };
            this.$http.post("/empresas", data).then((response) => {
                console.log(response);
            });
            this.NOME = "";
            this.CNPJ = "";
        },
        autoComplete(){
            this.results = [];
            if(this.query.length > 2){
                this.$http.get('/autoCompleteEmpresa',{params: {search: this.query}}).then(response => {
                this.results = response.data
            });
            }
        },
        resulComplete(result){
            this.query = result;
            this.getSearch()
            this.query = ''
            this.result = ''
            this.results = []
        
        }
    },
    computed: {
      validationNome() {
        return this.NOME.length >= 2  && this.NOME.length <= 49
      },
      validationCnpj(){
        return this.CNPJ.length == 14
      }
    },
    async created(){
        this.getSearch();
    },  
    components: { ListTemplate, ListTemplate }
}
</script>

<style lang="scss" scoped>

</style>