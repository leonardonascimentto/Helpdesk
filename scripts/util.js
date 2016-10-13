var session = {
    get: function (name) {
        if (window.localStorage) {
            return window.localStorage.getItem(name);
        } else {
            return $.cookie(name);
        }
    },
    set: function (name, value) {
        if (window.localStorage) {
            window.localStorage.setItem(name, value);
        } else {
            $.cookie(name, value);
        }
    }
};

function signout() {
    session.set("codUsuario", '');
    session.set("nomeUsuario", '');
    session.set("perfilUsuario", '')
    location.href = 'index.html';
}

function redirect(pagina, name, value) {

    session.set(name, value);
    location.href = pagina;

}

function carregaDadosUsuario() {
    var codUsuario, nomeUsuario, perfilUsuario;

    codUsuario = session.get("codUsuario");
    nomeUsuario = session.get("nomeUsuario");
    perfilUsuario = session.get("perfilUsuario");

    if (codUsuario == '' || codUsuario == null || codUsuario === undefined || codUsuario == 'null') {
        location.href = 'index.html';
    }

    var carrega = function (u) {
        var nomeUsuario = u.strNome;
        var perfilUsuario = u.strPerfil;
        $('.nomeUsuario').text(nomeUsuario);
        $('.perfilUsuario').text(perfilUsuario);
		
		if (perfilUsuario != 'Administrador')
			$('.so_adm').remove();
    }

    

    if (codUsuario && nomeUsuario && perfilUsuario) {
        carrega({ strNome: nomeUsuario, strPerfil: perfilUsuario });
    }
    else
        $.ajax({            //Função AJAX
            url: configuracoes.baseURL + "entities/usuarios.asp",          //Arquivo asp
            type: "post",                //Método de envio
            data: "codUsuario=" + codUsuario,   //Dados
            success: function (arrayDeDados) {         //Sucesso no AJAX
                var a = $.parseJSON(arrayDeDados);
                var u = a[0];
                session.set("nomeUsuario", u.strNome);
                session.set("perfilUsuario", u.strPerfil);

                carrega(u);
            }
        })
}

function dataBr() {
	
	var d = new Date;
    return [d.getDate(),
					d.getMonth()+1,
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
	
}

$(function(){
	$('.avatar .img-circle').attr('onError', "this.src = 'images/profile.jpg'");
	$('.avatar .img-circle').attr('src',configuracoes.baseURL + 'imagens/fotos/u' + session.get('codUsuario') + '.png');
})
