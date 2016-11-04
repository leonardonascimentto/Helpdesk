function enviarEmail() {
	var strTo = $('#emailesqueci').val();
    usuarioService.enviarEmailEsqueciSenha(strTo, function (data) {
		if (data=='Email nao encontrado')
			$('#erroesqueci').show();
		else
			$('#sucessoesqueci').show();
    },
	function () {
	    $('#erroesqueci').show();
    });
	
	$('#confirmaExclusao').hide();
}
