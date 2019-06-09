<template>
    <div class="footer-component">
           <footer class="page-footer font-small mdb-color pt-4">

        <!-- Footer Links -->
        <div class="container footline text-center text-md-left">

            <!-- Footer links -->
            <div class="row text-center text-md-left mt-3 pb-3">

                <!-- Grid column -->
                <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 class="text-uppercase mb-4 font-weight-bold">AdotAqui</h6>
                    <p>
                        Alburgue destinado aos nossos amigos peludos ou não.<br />Sem qualquer fins lucrativos.

                    </p>
                </div>
                <!-- Grid column -->

                <hr class="w-100 clearfix d-md-none">

                <!-- Grid column -->
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 class="text-uppercase mb-4 font-weight-bold">Mapa Site</h6>
                    <p>
                        <a href="#!">Página principal</a>
                    </p>
                    <p>
                        <a href="#!">Registo</a>
                    </p>
                    <p>
                        <a href="#!">Iniciar sessão</a>
                    </p>
                </div>
                <!-- Grid column -->

                <hr class="w-100 clearfix d-md-none">

                <!-- Grid column -->
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 class="text-uppercase mb-4 font-weight-bold">Links Utéis</h6>
                    <p>
                        <a href="https://www.lpda.pt/">Liga Portuguesa dos Direitos do Animal</a>
                    </p>
                    <p>
                        <a href="https://www.mundodosanimais.pt/">Mundo dos Animais</a>
                    </p>
                </div>

                <!-- Grid column -->
                <hr class="w-100 clearfix d-md-none">

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 class="text-uppercase mb-4 font-weight-bold">Contactos</h6>
                    <p>
                        <i class="fas fa-home mr-3"></i> Rua sem nome, Fernão Pires
                    </p>
                    <p>
                        <i class="fas fa-envelope mr-3"></i> geral@adotaqui.com
                    </p>
                    <p>
                        <i class="fas fa-phone mr-3"></i> + 351 234 666 88
                    </p>
                </div>
                <!-- Grid column -->

            </div>
            <!-- Footer links -->

            <hr>

            <!-- Grid row -->
            <div class="row d-flex align-items-center">

                <!-- Grid column -->
                <div class="col-md-7 col-lg-8">

                    <!--Copyright-->
                    <p class="text-center text-md-left">
                        © @System.DateTime.Now.Year Copyright
                        <a href="https://eswapp.azurewebsites.net/">AdotAqui</a>
                            <a class="btn-floating btn-sm rgba-white-slight mx-1">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="btn-floating btn-sm rgba-white-slight mx-1">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="btn-floating btn-sm rgba-white-slight mx-1">
                                <i class="fab fa-google-plus-g"></i>
                            </a>
                            <a class="btn-floating btn-sm rgba-white-slight mx-1">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                    </p>

                </div>
                <!-- Grid column -->
                <!-- Grid column -->
                <div class="col-md-5 col-lg-4 ml-lg-0">
                    <!-- Social buttons -->
                    <div class="text-center text-md-right">

                        <ul class="list-unstyled list-inline">
                            <li class="list-inline-item">@await Html.PartialAsync("_SelectLanguagePartial")</li>
                        </ul>
                    </div>

                </div>
                <!-- Grid column -->

            </div>
            <!-- Grid row -->

        </div>
        <!-- Footer Links -->

    </footer>
    </div>
</template>

<style lang="sass" scoped>
    @import './index.scss';
</style>

<script>


export default {
    name: 'index',
    data() {
        return {
            
        };
    },
    
    methods: {
        
    },
    mounted() {
        
    },
};
</script>
