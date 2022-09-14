<template>
    <b-container>
        <h1>Editar Empresa</h1>
        <b-row >
            <b-col cols="12" >
                <b-form responsive-sm  @submit.stop.prevent class="w-100 mt-3"  >
                    <label for="feedback-nome">Nome</label>
                    <b-form-input v-model="NOME" :state="validationNome" id="feedback-nome"></b-form-input>
                    <b-form-invalid-feedback :state="validationNome">
                      A Empresa deve possuir entre 4 á 49 caracteres
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validation">
                      Bom.
                    </b-form-valid-feedback>
                </b-form>
                <b-form responsive-sm  @submit.stop.prevent class="w-100 mt-3">
                    <label for="feedback-user">Cnpj</label>
                    <b-form-input v-model="CNPJ" :state="validationCnpj" id="feedback-user"></b-form-input>
                    <b-form-invalid-feedback :state="validationCnpj">
                      CNPJ Invalido
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validationCnpj">
                      CNPJ Valido 
                    </b-form-valid-feedback>
                </b-form>
            </b-col>
            <b-col>
                <b-button @click="updateEmpresa" squared variant="outline-primary" class="mt-4 w-25">Alterar</b-button>
            </b-col>
            <b-col>
                <b-button @click="deleteEmpresa" squared variant="outline-danger" class="mt-4 w-25">Deletar</b-button>
            </b-col>
        </b-row>
    </b-container>
       
</template>

<script>




export default {
    data(){
        return{
            NOME:'',
            CNPJ:'',
        }
    },
    methods:{
        async getEmpresa(){
            const res = await this.$http.get('empresas/' + this.$route.params.id)
            console.log(res)
            this.NOME = res.data.NOME
            this.CNPJ = res.data.CNPJ
            console.log(this.NOME);
        },
        deleteEmpresa(){
            this.$http.delete('/empresas/' + this.$route.params.id).then((response)=>{
                console.log(response);
            })
            alert("Empresa deletada com sucesso !");
            this.$router.push({ name: 'list-empresa' })
           
            
        },
        updateEmpresa(){
            var data = {NOME:this.NOME,CNPJ:this.CNPJ}
            this.$http.put('/empresas/' + this.$route.params.id ,data).then((response)=>{
                console.log(response)
            })
        }
    },
    async created(){
        this.getEmpresa();
    },
    computed: {
      validationNome() {
        return this.NOME.length >= 4  && this.NOME.length <= 49
      },
      validationCnpj(){
        return this.CNPJ.length == 14
      }
    }
}
</script>

<style lang="scss" scoped>

</style>