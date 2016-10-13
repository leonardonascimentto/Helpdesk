
$(function () {
	carregaDadosUsuario();
});


function enviarFoto() {
	
	var foto = $('.fileupload img:eq(1)').attr('src');
	
	usuarioService.sendFoto(foto, function() {
		alert('Sucesso');
	}, function() {
		alert('Erro');
	});
	
}