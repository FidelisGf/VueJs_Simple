
<template>
    <b-container >
        <div>
        <h1 class="mt-4">Listagem de Empresas</h1>
        <b-row class="row mt-5">
            <b-col cols="3" >
                <b-button variant="outline-success" v-b-modal.modal-1>Inserir Usuario</b-button>

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
            </b-col>
          
            <b-col cols="9">
                <b-input-group>
                    <b-form-select  v-model="selected" :options="options" class="select" ></b-form-select>
                    <AutoComplete></AutoComplete>
                </b-input-group>
                    <b-button @click="getSearch" text="Button" variant="success">Aplicar</b-button>
            </b-col>
         
        </b-row>
            <b-row>
                <b-col cols="12">
                    <table class="table mt-5 table-responsive-lg">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOME</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">EDITAR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="Empresa in listagem" :key="Empresa.ID">
                            <th scope="row">{{Empresa.ID_EMPRESA}}</th>
                            <td>{{Empresa.NOME}}</td>
                            <td>{{Empresa.CNPJ}}</td>
                            <td><router-link :to="{name:'edit-empresa', params: {id: Empresa.ID_EMPRESA}}"><b-button variant="outline-success">Editar</b-button></router-link></td>
                          </tr>
                         
                        </tbody>
                      </table>
                     
                </b-col>
            </b-row>
            <b-row align-v="center">
                <b-col >
                    <b-button @click="previusPage" variant="outline-danger" class="btn">Preview</b-button> 
                    <b-button @click="nextPage" variant="outline-success">Next</b-button> 
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue';





/* eslint-disable */
export default {
    data() {
        return {
            show: false,
            listagem: [],
            id: 0,
            NOME: "",
            CNPJ: "",
            rota: "/empresas?page=",
            total: 10,
            page: 1,
            search: null,
            pageInfo: null,
            selected: null,
            last_page: null,
            options: [
                { value: "/empresas?page=", text: "Sem Filtro" },
                { value: "BYNAME", text: "Por nome" },
                { value: "b", text: "Nao sei" },
                { value: { C: "3PO" }, text: "This is an option with object value" },
                { value: "d", text: "This one is disabled", disabled: true }
            ]
        };
    },
    methods: {
        addEmpresa() {
            var data = { NOME: this.NOME, CNPJ: this.CNPJ };
            this.$http.post("/empresas", data).then((response) => {
                console.log(response);
            });
            this.NOME = "";
            this.CNPJ = "";
        },
        async getEmpresas(page) {
            this.total = this.page + 1;
            const res = await this.$http.get(this.rota + this.page + "&total=" + this.total, { params: { search: this.search, selected: this.selected } });
            console.log(res);
            this.listagem = res.data.data;
        },
        async getSearch(page) {
            this.total = this.page + 1;
            const res = await this.$http.get("/searchEmp?page=" + this.page + "&total=" + this.total, { params: { search: this.search, selected: this.selected } });
            console.log(res);
            this.listagem = res.data.data;
        },
        nextPage() {
            this.page += 1;
            this.getSearch();
        },
        previusPage() {
            this.page -= 1;
            this.getSearch();
        }
    },
    async created() {
        this.getSearch();
    },
    components: { AutoComplete }
}
</script>

<style>
    body { overflow-x: hidden; }
    .body-table{
        width: 100%;
    }
    .raise:hover,
    .raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
    }
    .btn{
        margin-left: 10px;
    }
    .select{
        width: 25%;
        font-size: 14px;
    }
    .input-btn{
        width: 10%;
    }
</style>