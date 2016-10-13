	var usuarioService = {};
	usuarioService.insert = function(usuarioData, success, error) {
		$('#loader').show();
		$.ajax({            //Função AJAX
            url: configuracoes.baseURL + "entities/UsuariosInserir.asp",          //Arquivo asp
            type:"get",                //Método de envio
            data: "nome="+usuarioData.nome+"&email="+usuarioData.email+"&password="+usuarioData.password+"&codUsuario="+usuarioData.codUsuario+"&codPerfil="+usuarioData.codPerfil,   //Dados
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
		
	};
	usuarioService.delete = function(usuarioData, success, error) {
		$('#loader').show();
		$.ajax({            //Função AJAX
            url:configuracoes.baseURL + "entities/UsuariosDelete.asp",          //Arquivo asp
            type:"get",                //Método de envio
            data: "codUsuario="+usuarioData.codUsuario,   //Dados
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
	};
	usuarioService.getPerfis = function(success, error) {		
		$.ajax({
			url:configuracoes.baseURL + "entities/Perfil.asp",          //Arquivo asp
            type:"get",                //Método de envio
            data: "",   //Dados
            success: success,
			error: error
		});
		
	};
	usuarioService.sendFoto = function(foto, success, error) {
		$('#loader').show();
		$.ajax({            //Função AJAX
            url:configuracoes.baseURL + "entities/FotoInserir.asp",          //Arquivo asp
            type:"post",                //Método de envio
            data: {foto:foto,codUsuario:session.get("codUsuario")},   //Dados
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
		
	};
	usuarioService.enviarEmailEsqueciSenha = function(strTo, success, error) {
		$('#loader').show();
		$.ajax({
            url:configuracoes.baseURL + "entities/EnviaEmail.asp",
            type:"get", 
            data: "strTo=" + strTo,
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
		
	};
	usuarioService.getAll = function(success, error) {
		
		$.ajax({
            url:configuracoes.baseURL + "entities/Usuarios.asp",
            type:"get", 
            data: "",
            success: success,
			error: error
        })
		
	}
