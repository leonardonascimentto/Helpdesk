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
	}, function() {});
	
	ativaValidacao();
	
});
function salvar() {
	if ($('#formEdicao').valid()) {
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
}
function editar() {
	$('.pmbb-view').hide();
	$('.pmbb-edit').show();	
}
function visualizar() {
	$('.pmbb-view').show();
	$('.pmbb-edit').hide();
}

function ativaValidacao() {
    $("#strCpf").mask("000.000.000-00");
    $("#strTel1").mask("(00) 0000-0000");
    $("#strTel2").mask("(00) 00000-0000");
    
    $('#formEdicao').validate({
        rules: {
            strNome: {
                required: true,
                maxlength: 50
            },
            strEmail: {
                required: true,
                email: true,
                maxlength: 100,
                remote: configuracoes.baseURL + 'entities/VerificarEmail.asp'
            },
            strMatricula: {
                number: true,
                maxlength: 10
            },
            strSenha: {
                required: true,
                minlength: 4,
                maxlength: 15

            }
        },
        messages: {
            strNome: {
                required: "Digite seu nome",
<<<<<<< HEAD
                maxlength: "O campo \"Nome\" pode ter, no máximo, 50 caracteres"
            },
            strEmail: {
                required: "Digite seu email",
                email: "O campo \"Email\" deve conter um email válido",
                maxlength: "O campo \"Email\" pode ter, no máximo, 100 caracteres",
                remote: "O email informado já está em uso. Escolha outro email"
            },
            strMatricula: {
                number: "Digite apenas números",
                maxlength: "O campo \"Ra\" pode ter, no máximo, 10 caracteres"
            },
            strSenha: {
                required: "Digite uma senha",
                minlength: "A senha deve conter, no mínimo, 4 caracteres",
                maxlength: "A senha pode ter, no máximo, 15 caracteres"
=======
                maxlength: "O campo \"Nome\" pode ter, no mÃ¡ximo, 50 caracteres"
            },
            strEmail: {
                required: "Digite seu email",
                email: "O campo \"Email\" deve conter um email vÃ¡lido",
                maxlength: "O campo \"Email\" pode ter, no mÃ¡ximo, 100 caracteres",
                remote: "O email informado jÃ¡ estÃ¡ em uso. Escolha outro email"
            },
            strMatricula: {
                number: "Digite apenas nÃºmeros",
                maxlength: "O campo \"Ra\" pode ter, no mÃ¡ximo, 10 caracteres"
            },
            strSenha: {
                required: "Digite uma senha",
                minlength: "A senha deve conter, no mÃ­nimo, 4 caracteres",
                maxlength: "A senha pode ter, no mÃ¡ximo, 15 caracteres"
>>>>>>> origin/master
            }
        }
    });


}