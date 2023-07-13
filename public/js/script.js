$('.botaoComprei').click(function() {
    $("#numeroComprei").val($(this).data('numero'));      
});

//SHOW LOADING
$(".page-link, .nav-link, .navbar-brand, .enviar").click(function(){
    $("#modalSpinner").modal();
});