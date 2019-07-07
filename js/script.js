$(document).ready(function () {

    //SCRIPT PARA FIJAR LA BARRA AL HACER SCROLL
    var altura = $("#navegacion").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollTop() > altura ){
  			$("#navegacion").addClass('nav-fixed');
  		} else {
  			$("#navegacion").removeClass('nav-fixed');
  		}
  	});

    //SCRIPTS PARA ANIMACIONES DE ANUNCIOS
    var anun1 = $("#anuncio1").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio1").addClass('e-izquierda');
  		} else {
  			$("#anuncio1").removeClass('e-izquierda');
  		}
  	});
    var anun2 = $("#anuncio2").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio2").addClass('e-derecha');
  		} else{
  			$("#anuncio2").removeClass('e-derecha');
  		}
  	});
    var anun3 = $("#anuncio3").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio3").addClass('e-arriba');
  		} else {
  			$("#anuncio3").removeClass('e-arriba');
  		}
  	});
});

$.fn.scrollBottom = function() {
    return this.scrollTop() + this.height();
};

function abrir_tienda(){
  document.location.href='tienda.html';
  if (localStorage.getItem("user") == null) {
    alert("No has iniciado Sesión, hazlo para recibir ofertas especiales");
  }
};
