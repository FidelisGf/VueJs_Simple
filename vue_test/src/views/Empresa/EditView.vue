<template>
    <div>
        <h1>Editar Empresa {{this.$route.params.id}}</h1>
        <div class="row  mt-5 ">
            <div class="col-6">
                <b-input class="input" placeholder="Nome"></b-input>
            </div>
            <div class="col-6">
                <b-input class="input" placeholder="Cnpj"></b-input>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <b-button block variant="outline-success" >Editar</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .input{
        width: 100%;
    }

</style>