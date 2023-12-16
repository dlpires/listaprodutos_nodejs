//IF SEARCH IS IN SESSION, CHANGE LINKS WITH FILTER
$("a").click(function(){
    if(sessionStorage.getItem("search") !== null){
        if($(this).attr("href").indexOf("list")){
            $(this).attr("href", $(this).attr("href")+"?search="+sessionStorage.getItem('search'));
        }
    }
});

$('.botaoComprei').click(function() {
    $("#numeroComprei").val($(this).data('numero'));      
});

//SHOW LOADING
$(".page-link, .nav-link, .navbar-brand, .enviar, .filtrar, .limparFiltro").click(function(){
    $("#modalSpinner").modal('show');
    setTimeout(function(){
        $("#modalSpinner").modal('hide');
    },3000);
});

//SEARCH FILTER
$("#search_filter").submit(function(){
    sessionStorage.setItem("search", $("#search_filter_text").val());
    
    //HIDE SPINNER WHEN VALUE IS EMPTY
});

//CLEAR SEARCH FILTER
$(".limparFiltro").click(function(){
    sessionStorage.clear();
});