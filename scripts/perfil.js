$(function () {
	
	carregaDadosUsuario();
	
	codUsuario = session.get("codUsuario");
	
	usuarioService.get(codUsuario, function(usuario) {
		usuario = $.parseJSON(usuario)[0];
		
		for (var key in usuario) {
			if (usuario.hasOwnProperty(key)) {
				$('dd[data-field="'+key+'"]').html(usuario[key]);
				$('input[data-field="'+key+'"]').val(usuario[key]);
			}
		};
	}, function() {})
	
});
function salvar() {
	var usuario = {};
	$('input.campo').each(function(i, e) {
		var input = $(e);
		var key = input.attr('data-name');
		var valor = input.val();
		
		usuario[key] = valor;
	});	

	visualizar();
	$('.page-loader').show();
	usuarioService.insert(usuario, function() {
		$('input.campo').each(function(i, e) {
			var input = $(e);
			var key = input.attr('data-field');
			var valor = input.val();
			
			$('dd[data-field="'+key+'"]').html(valor);
		});	
		
		$('.page-loader').hide();

	}, function() {
		$('.page-loader').hide();
	});
}
function editar() {
	$('.pmbb-view').hide();
	$('.pmbb-edit').show();	
}
function visualizar() {
	$('.pmbb-view').show();
	$('.pmbb-edit').hide();
}