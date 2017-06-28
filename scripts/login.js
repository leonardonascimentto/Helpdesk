$(document).ready(function () {
    $('#errologin').hide();  //Esconde o elemento com id erro
    $('#form').submit(function () { //Ao submeter formulário
        var email = $('#emailLogin').val();  //Pega valor do campo email
        var password = $('#passwordLogin').val();    //Pega valor do campo senha
        $.ajax({            //Função AJAX
            url: configuracoes.baseURL + "entities/Login.asp",  //Arquivo asp
            type: "post",   //Método de envio
            data: "email=" + email + "&password=" + password,   //Dados
            success: function (Usuarios) {  //Sucesso no AJAX
                Usuarios = $.parseJSON(Usuarios);
                if (Usuarios.length > 0) {
                    var usuario = Usuarios[0];
                    session.set("codUsuario", usuario.codUsuario);
                    session.set("nomeUsuario", usuario.strNome);
					session.set("codPerfil", usuario.codPerfil);
					session.set("email", email);
					session.set("password", password);
                    if (navigator.notification)
                        navigator.notification.beep(1);
                    location.href = 'home.html';
                }
                else {
                    $('#errologin').show();
                }
            }
        })
        return false;   //Evita que a página seja atualizada
    })
})