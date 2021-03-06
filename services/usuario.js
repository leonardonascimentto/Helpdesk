	var usuarioService = {};
	usuarioService.insert = function(usuarioData, success, error) {
		$('#loader').show();
		$.ajax({            //Fun��o AJAX
            url: configuracoes.baseURL + "entities/UsuariosInserir.asp",          //Arquivo asp
            type:"get",                //M�todo de envio
            data: "nome="+usuarioData.nome+"&email="+usuarioData.email+"&ra="+usuarioData.ra+"&cpf="+usuarioData.cpf+"&telefone="+usuarioData.telefone+"&celular="+usuarioData.celular+"&password="+usuarioData.password+"&codUsuario="+usuarioData.codUsuario+"&codPerfil="+usuarioData.codPerfil+"&codStatusMatricula="+ usuarioData.codStatusMatricula,   //Dados
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
		
	};
	usuarioService.delete = function(usuarioData, success, error) {
		$('#loader').show();
		$.ajax({            //Fun��o AJAX
            url:configuracoes.baseURL + "entities/UsuariosDelete.asp",          //Arquivo asp
            type:"get",                //M�todo de envio
            data: "codUsuario="+usuarioData.codUsuario,   //Dados
            success: success,
			error: error,
			complete: function() {
				$('#loader').hide();
			}
        })
	};
	usuarioService.getStatusMatricula = function(success, error) {		
		$.ajax({
			url:configuracoes.baseURL + "entities/StatusMatricula.asp",          //Arquivo asp
            type:"get",                //M�todo de envio
            data: "",   //Dados
            success: success,
			error: error
		});
		
	};
	usuarioService.getPerfis = function(success, error) {		
		$.ajax({
			url:configuracoes.baseURL + "entities/Perfil.asp",          //Arquivo asp
            type:"get",                //M�todo de envio
            data: "",   //Dados
            success: success,
			error: error
		});
		
	};
	usuarioService.sendFoto = function(foto, success, error) {
		$('#loader').show();
		$.ajax({            //Fun��o AJAX
            url:configuracoes.baseURL + "entities/FotoInserir.asp",          //Arquivo asp
            type:"post",                //M�todo de envio
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
        });
	}
	usuarioService.get = function(codUsuario, success, error) {		
		$.ajax({
            url:configuracoes.baseURL + "entities/Usuarios.asp",
            type:"get", 
            data: "codUsuario="+codUsuario,
            success: success,
			error: error
        });
	}
	usuarioService.getByTurma = function(codTurma, success, error) {
		
		$.ajax({
            url:configuracoes.baseURL + "entities/Usuarios.asp",
            type:"get", 
            data: "codTurma="+codTurma,
            success: success,
			error: error
        })
		
	}
