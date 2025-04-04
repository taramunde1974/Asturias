var TechosModule = (function(){
"use strict";
	
	var totalPuntosDificultad = 116,
		puntosAcumulados = 0,
		info,
		baseInfowindow = "<h2>{{pico}} ({{altura}}m)</h2><p><b>Techo de:</b> {{concejo}}</p><p><b>Dificultad:</b> {{dificultadTextual dificultad }}</p><p><b>Coordenadas:</b> {{latitud}}, {{longitud}}</p>",
		templateInfowindow = null,
		$progreso = null,
		$progresoPonderado = null;

	var marcaPuntosMapa = function(map){
		var myLatlng = null,
			image = 'img/pinMapa.png';
		
		var infowindow = new google.maps.InfoWindow();
		
		for (var i=0, max = info.techos.length; i<max; i++){
			myLatlng = new google.maps.LatLng(info.techos[i].latitud, info.techos[i].longitud);
		
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image,
				title: info.techos[i].pico + " (" + info.techos[i].altura + "m)"
			});	

		   google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
				  infowindow.setContent(templateInfowindow(info.techos[i]));
				  infowindow.open(map, marker);
				}
			  })(marker, i));
		}
	};
	
	return{	
		clickFila: function(e){		
			e.preventDefault();
			var ascendido = $(this).parent().find('input:checked').length === 1;
			
			if (!ascendido)
			{
				$(this).parent().find('input').prop('checked', true);
				puntosAcumulados += parseInt($(this).closest('tr').data('dificultad'));
			}
			else
			{
				$(this).parent().find('input').prop('checked', false);
				puntosAcumulados -= parseInt($(this).closest('tr').data('dificultad'));				
			}
			
			$(this).parent().find('.ascendido').toggleClass('no');
			
			var ascendidos = $(this).closest('table').find('input:checked').length,
				resultado = ascendidos*100/78 + "%",
				resultadoPonderado = Math.round(puntosAcumulados*100/totalPuntosDificultad) + "%";
			
			$progreso.css('width', resultado).find('.sr-only').html(ascendidos + '/78');
			$progresoPonderado.css('width', resultadoPonderado).find('.sr-only').html(resultadoPonderado);
		},

		asignaDificultades: function(){
			var filas = $('tbody tr');
			for(var i = 0, nf = filas.length; i<nf; i++)
			{
				filas.eq(i).data('dificultad', info.techos[i].dificultad);
			}
		}, 
		
		init: function(data){
			info = data;
			templateInfowindow = Handlebars.compile(baseInfowindow);
			
			$progreso = $('#resultado').find('.progress-bar');
			$progresoPonderado = $('#resultadoPonderado').find('.progress-bar');

			Handlebars.registerHelper('dificultadTextual', function(num) {
				switch(num){
					case 1:return 'Fácil';
					case 2:return 'Media';
					case 3:return 'Difícil';
					default: return '-';
				}				
			});			
			
			Handlebars.registerHelper('alturaPorcentaje', function(alt) {
				/* El coeficiente se obtiene de dividir 365/2648.
				365 es la altura máxima en la gráfica y 2648 la altura máxima en la realidad */
				return (alt*0.137839);
			});	

			Handlebars.registerHelper('distanciaIzquierda', function(index) {
				return (index*160);
			});	
		},
		
		initializeMap: function() {
		  var mapOptions = {
			scrollwheel: false,
			zoom: 9,
			center: new google.maps.LatLng(43.319183,-5.844727),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		  };

		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		  marcaPuntosMapa(map);
		},

		loadMapScript: function () {
		  var script = document.createElement('script');
		  script.type = 'text/javascript';
		  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
			  'callback=TechosModule.initializeMap';
		  document.body.appendChild(script);
		},
		
		startHeaderAnimation: function(){
			$('body').removeClass('unanimated');
		}		
		
	};
	
})();