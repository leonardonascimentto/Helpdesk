<<<<<<< HEAD
﻿var trEdicao = null;

function editarUsuario(link) {
    if ($('#formEdicao').valid()) {
        var tr = $(link).parents('tr:eq(0)');
        trEdicao = tr;
        
        var codUsuario = tr.find('td[data=codUsuario]').text();

		var registro = cacheUsuarios.where(function (u) { return u.codUsuario == codUsuario; })[0];
		
        var codPerfil = registro.codPerfil;
		var nome = registro.strNome;
        var email = registro.strEmail;
        var ra = registro.strMatricula;
        var cpf = registro.strCpf;
        var telefone = registro.strTel1;
        var celular = registro.strTel2;

        $('#nomeEdicao').val(nome);
        $('#emailEdicao').val(email);
        $('#raEdicao').val(ra);
        $('#cpfEdicao').val(cpf);
        $('#telefoneEdicao').val(telefone);
        $('#celularEdicao').val(celular);
        $('#codUsuarioEdicao').val(codUsuario);
        $('#perfilEdicao').val(codPerfil);

        $('#formModalEdicao').modal('show');
    }
}

function salvarUsuario() {
    var nome = $('#nomeEdicao').val();    //Pega valor do campo nome
    var email = $('#emailEdicao').val();  //Pega valor do campo email
    var ra = $('#raEdicao').val();  //Pega valor do campo ra
    var cpf = $('#cpfEdicao').val();  //Pega valor do campo cpf
    var telefone = $('#telefoneEdicao').val();  //Pega valor do campo telefone
    var celular = $('#celularEdicao').val();  //Pega valor do campo celular
    var codUsuario = $('#codUsuarioEdicao').val();
    var codPerfil = $('#perfilEdicao').val();

    var usuarioData = { nome: nome, email: email, ra: ra, cpf: cpf, telefone: telefone, celular: celular, codUsuario: codUsuario, codPerfil: codPerfil };
    var success = function (result) {         //Sucesso no AJAX
        if (result != '0') {
            $('.modal:visible').modal('hide');
            $('.MSGnomeUsuario').text(nome);

            var nFrom = "top";
            var nAlign = "center";
            var nIcons = '';
            var nType = 'success';
            var nAnimIn = '';
            var nAnimOut = '';

            notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, 'O usuário ' + nome + ' foi alterado com sucesso.');

            usuarioData.codUsuario = result;
            alterarTabela(usuarioData);

            cacheUsuarios.where(function (u) { return u.codUsuario == codUsuario; })[0].codPerfil = codPerfil;
        } else {
            alert('Erro ao incluir dados');
        }
    };

    usuarioService.insert(usuarioData, success);
    return false;
}
var link;

function excluirUsuario(link_) {

    swal({
        title: "Atenção: ",
        text: "Deseja realmente excluir o usuário?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
    }).then(function () {
        concluirExclusao();
        //swal("Excluído!", "O usuário ' + nome + ' foi excluído com sucesso.", "success");
    });

    //$('#confirmaExclusao').show();
    link = link_;
}

function concluirExclusao() {
    tredicao = $(link).parents('tr:eq(0)');
    var codUsuario = tredicao.find('td[data=codUsuario]').text();
    var nome = tredicao.find('div[data=strNome]').text();
    var usuariodata = { codUsuario: codUsuario };
    usuarioService.delete(usuariodata, function () {
        $('.MSGnomeUsuario').text(nome);
        $('#successExcluir').show();
        tredicao.remove();

        swal("Excluído!", "O usuário " + nome + " foi excluído com sucesso.", "success");
    });

    //$('#confirmaExclusao').hide();
}

function inserirUsuario() {

    if ($('#formInclusao').valid()) {
        var nome = $('#nome').val();    //Pega valor do campo nome
        var email = $('#email').val();  //Pega valor do campo email
        var ra = $('#ra').val();  //Pega valor do campo ra
        var cpf = $('#cpf').val();  //Pega valor do campo cpf
        var telefone = $('#telefone').val();  //Pega valor do campo telefone
        var celular = $('#celular').val();  //Pega valor do campo celular
        var password = $('#password').val();  //Pega valor do campo senha

        var usuarioData = { nome: nome, email: email, ra: ra, cpf: cpf, telefone: telefone, celular: celular, password: password, codPerfil: 0 };
        var success = function (result) {         //Sucesso no AJAX
            result = $.parseJSON(result);
            if (result.length > 0) {
                $('.modal:visible').modal('hide');
                $('.MSGnomeUsuario').text(nome);

                var nFrom = "top";
                var nAlign = "center";
                var nIcons = '';
                var nType = 'success';
                var nAnimIn = '';
                var nAnimOut = '';

                notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, 'O usuário ' + nome + ' foi inserido com sucesso.');

                //$('#success').show();
                usuarioData.codUsuario = result[0].codUsuario;
                usuarioData.Perfil = result[0].strPerfil;
                usuarioData.Adm = result[0].boolAdm;

                linkEditar = '<div class="pull-right"><div class="actions dropdown"><a href="#" data-toggle="dropdown" aria-expanded="true"><i class="zmdi zmdi-more-vert"></i></a><ul class="dropdown-menu dropdown-menu-right"><li><a href="javascript:void(0);" onclick="editarUsuario(this)" alt="Alterar"><i class="zmdi zmdi-edit"></i> Alterar</a></li><li><a href="javascript:void(0);" onclick="excluirUsuario(this)" alt="Excluir"><i class="zmdi zmdi-delete"></i> Excluir</a></li></ul></div></div>'
                usuarioData.linkEditar = linkEditar;

                /*linkExcluir = $('<a href="javascript:void(0);" onclick="excluirUsuario(this)" alt="Excluir"><i class="zmdi zmdi-delete"></i></a>');
                usuarioData.linkExcluir = linkExcluir;*/

                inserirTabela(usuarioData);

                $('#formModal').find('input').val('');
				
				cacheUsuarios.push({ strNome: nome, strEmail: email, strMatricula: ra, strCpf: cpf, strTel1: telefone, strTel2: celular, codUsuario: usuarioData.codUsuario,codPerfil:  result[0].codPerfil});
            } else {
                alert('Erro ao incluir dados');
            }
        };

        usuarioService.insert(usuarioData, success);
        return true;
    } else {
        return false;
    }

}

function inserirTabela(u) {
    /*
    var tr = $('<tr>');
    $('<td>').addClass('field').attr('data', 'codUsuario').text(u.codUsuario).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strNome').text(u.nome).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strLogin').text(u.email).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strPerfil').text(u.Perfil).appendTo(tr);
    $('<td>').css('textAlign', 'center').html(u.linkEditar).appendTo(tr);
    $('<td>').css('textAlign', 'center').html(u.linkExcluir).appendTo(tr);

    $('#example tbody').prepend(tr);
    */

    var table = $('#example').DataTable();
    var linha = table.rows.add([{
        0: u.codUsuario,
        1: u.nome,
        2: u.ra,
        3: u.email,
        4: u.cpf,
        5: u.Perfil,
        6: u.telefone,
        7: u.celular,
        8: u.linkEditar
    }]).draw();

	var tr = $(linha.nodes()[0]);
	
	var acertaNome = '<div data="strNome" style="width:160px; overflow: hidden">' + u.nome + '</div>'
	
	tr.find('td').eq(0).attr('data', 'codUsuario');
	tr.find('td').eq(1).attr('data', 'strNome').html(acertaNome);
	tr.find('td').eq(2).attr('data', 'strMatricula');
	tr.find('td').eq(3).attr('data', 'strEmail');
	tr.find('td').eq(4).attr('data', 'strCpf');
	tr.find('td').eq(5).attr('data', 'strPerfil');
	tr.find('td').eq(6).attr('data', 'strTel1');
	tr.find('td').eq(7).attr('data', 'strTel2');
	
	
}

function alterarTabela(u) {
    trEdicao.find('div[data=strNome]').html(u.nome);
    trEdicao.find('td[data=strMatricula]').text(u.ra);
    trEdicao.find('td[data=strEmail]').text(u.email);
    trEdicao.find('td[data=strCpf]').text(u.cpf);
    trEdicao.find('td[data=strTel1]').text(u.telefone);
    trEdicao.find('td[data=strTel2]').text(u.celular);

    if (u.codPerfil > 0) {
        strPerfil = perfis.where(function (p) { return p.codPerfil == u.codPerfil; })[0].strPerfil;
        trEdicao.find('td[data=strPerfil]').text(strPerfil);
    }

	alteraDetalhe();    
}

function ativaValidacao() {
    $("#cpf").mask("000.000.000-00");
    $("#telefone").mask("(00) 0000-0000");
    $("#celular").mask("(00) 00000-0000");
    $("#cpfEdicao").mask("000.000.000-00");
    $("#telefoneEdicao").mask("(00) 0000-0000");
    $("#celularEdicao").mask("(00) 00000-0000");
    $('#formInclusao, #formEdicao').validate({
        rules: {
            nome: {
                required: true,
                maxlength: 50
            },
            email: {
                required: true,
                email: true,
                maxlength: 100,
                remote: configuracoes.baseURL + 'entities/VerificarEmail.asp'
            },
            ra: {
                number: true,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 4,
                maxlength: 15

            },
            confirmapassword: {
                required: true,
                minlength: 4,
                maxlength: 15,
                equalTo: '#password'
            }
        },
        messages: {
            nome: {
                required: "Digite seu nome",
                maxlength: "O campo \"Nome\" pode ter, no máximo, 50 caracteres"
            },
            email: {
                required: "Digite seu email",
                email: "O campo \"Email\" deve conter um email válido",
                maxlength: "O campo \"Email\" pode ter, no máximo, 100 caracteres",
                remote: "O email informado já está em uso. Escolha outro email"
            },
            ra: {
                number: "Digite apenas números",
                maxlength: "O campo \"Ra\" pode ter, no máximo, 10 caracteres"
            },
            password: {
                required: "Digite uma senha",
                minlength: "A senha deve conter, no mínimo, 4 caracteres",
                maxlength: "A senha pode ter, no máximo, 15 caracteres"
            },
            confirmapassword: {
                required: "Repita a senha",
                minlength: "A confirmação da senha deve conter, no mínimo, 4 caracteres",
                maxlength: "A confirmação da senha pode ter, no máximo, 15 caracteres",
                equalTo: "O campo \"Confirmar Senha\" deve ser igual ao campo \"Senha\"!"
            }
        }
    });


}

var perfis = [];
function carregaPerfis() {
    usuarioService.getPerfis(function (data) {

        perfis = $.parseJSON(data);

        montaComboPerfis();

    }, function () { });

}

function montaComboPerfis() {

    var combo = $('#perfilEdicao');

    $(perfis).each(function (i, e) {

        var option = $('<option>').val(e.codPerfil).text(e.strPerfil);
        combo.append(option);

    });

}

var cacheUsuarios = [];

$(function () {
    carregaDadosUsuario();
    ativaValidacao();
    carregaPerfis();

    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/usuarios.asp",          //Arquivo asp
        type: "post",                //Método de envio
        data: "{}",   //Dados
        success: function (arrayDeDados) {         //Sucesso no AJAX
            var repetidor = $('.repeat').clone();
            var pai = $('.repeat').parent();
            $('.repeat').remove();
            cacheUsuarios = $.parseJSON(arrayDeDados);
            $($.parseJSON(arrayDeDados)).each(function (posicao, dado) {

                var clone = repetidor.clone();

                $(clone).find('.field').each(function (numObjeto, objetoContainer) {

                    $(objetoContainer).text(dado[$(objetoContainer).attr('data')]);

                });

                clone.appendTo(pai);

            });

            $('td[data=codUsuario]').each(function (i, e) {
                var td = $(e);

                td.html('<div data="codUsuario" style="width:30px; overflow: hidden">' + td.text() + '</div>');

            });

            $('td[data=strNome]').each(function (i, e) {
                var td = $(e);

                td.html('<div data="strNome" style="width:160px; overflow: hidden">' + td.text() + '</div>');

            });

            var table = $('#example').DataTable({
                language: {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.11/i18n/Portuguese-Brasil.json"
                },
                pageLength: 25,
                columns: [
					{ "orderable": true },
					{ "orderable": true },
                    { "orderable": true },
					{ "orderable": true },
					{ "orderable": true },
                    { "orderable": true },
                    { "orderable": false },
                    { "orderable": false },
			        { "orderable": false },
                ],
                order: [[1, "asc"]],
                //colReorder: true,
                //rowReorder: true,
                select: {
                    style: 'os'
                },
                columnDefs: [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: -8 },
                    { responsivePriority: 3, targets: -1 }
                ]
                //dom: 'Bfrtip',
                //buttons: ['print', 'excel', 'pdf']

            });

        },

        complete: function () {
            $('#loader').hide();
        }
    })
=======
﻿var trEdicao = null;

function editarUsuario(link) {
    if ($('#formEdicao').valid()) {
        var tr = $(link).parents('tr:eq(0)');
        trEdicao = tr;
        
        var codUsuario = tr.find('td[data=codUsuario]').text();

		var registro = cacheUsuarios.where(function (u) { return u.codUsuario == codUsuario; })[0];
		
        var codPerfil = registro.codPerfil;
		var nome = registro.strNome;
        var email = registro.strEmail;
        var ra = registro.strMatricula;
        var cpf = registro.strCpf;
        var telefone = registro.strTel1;
        var celular = registro.strTel2;

        $('#nomeEdicao').val(nome);
        $('#emailEdicao').val(email);
        $('#raEdicao').val(ra);
        $('#cpfEdicao').val(cpf);
        $('#telefoneEdicao').val(telefone);
        $('#celularEdicao').val(celular);
        $('#codUsuarioEdicao').val(codUsuario);
        $('#perfilEdicao').val(codPerfil);

        $('#formModalEdicao').modal('show');
    }
}

function salvarUsuario() {
    var nome = $('#nomeEdicao').val();    //Pega valor do campo nome
    var email = $('#emailEdicao').val();  //Pega valor do campo email
    var ra = $('#raEdicao').val();  //Pega valor do campo ra
    var cpf = $('#cpfEdicao').val();  //Pega valor do campo cpf
    var telefone = $('#telefoneEdicao').val();  //Pega valor do campo telefone
    var celular = $('#celularEdicao').val();  //Pega valor do campo celular
    var codUsuario = $('#codUsuarioEdicao').val();
    var codPerfil = $('#perfilEdicao').val();

    var usuarioData = { nome: nome, email: email, ra: ra, cpf: cpf, telefone: telefone, celular: celular, codUsuario: codUsuario, codPerfil: codPerfil };
    var success = function (result) {         //Sucesso no AJAX
        if (result != '0') {
            $('.modal:visible').modal('hide');
            $('.MSGnomeUsuario').text(nome);

            var nFrom = "top";
            var nAlign = "center";
            var nIcons = '';
            var nType = 'success';
            var nAnimIn = '';
            var nAnimOut = '';

            notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, 'O usuário ' + nome + ' foi alterado com sucesso.');

            usuarioData.codUsuario = result;
            alterarTabela(usuarioData);

            cacheUsuarios.where(function (u) { return u.codUsuario == codUsuario; })[0].codPerfil = codPerfil;
        } else {
            alert('Erro ao incluir dados');
        }
    };

    usuarioService.insert(usuarioData, success);
    return false;
}
var link;

function excluirUsuario(link_) {

    swal({
        title: "Atenção: ",
        text: "Deseja realmente excluir o usuário?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
    }).then(function () {
        concluirExclusao();
        //swal("Excluído!", "O usuário ' + nome + ' foi excluído com sucesso.", "success");
    });

    //$('#confirmaExclusao').show();
    link = link_;
}

function concluirExclusao() {
    tredicao = $(link).parents('tr:eq(0)');
    var codUsuario = tredicao.find('td[data=codUsuario]').text();
    var nome = tredicao.find('div[data=strNome]').text();
    var usuariodata = { codUsuario: codUsuario };
    usuarioService.delete(usuariodata, function () {
        $('.MSGnomeUsuario').text(nome);
        $('#successExcluir').show();
        tredicao.remove();

        swal("Excluído!", "O usuário " + nome + " foi excluído com sucesso.", "success");
    });

    //$('#confirmaExclusao').hide();
}

function inserirUsuario() {

    if ($('#formInclusao').valid()) {
        var nome = $('#nome').val();    //Pega valor do campo nome
        var email = $('#email').val();  //Pega valor do campo email
        var ra = $('#ra').val();  //Pega valor do campo ra
        var cpf = $('#cpf').val();  //Pega valor do campo cpf
        var telefone = $('#telefone').val();  //Pega valor do campo telefone
        var celular = $('#celular').val();  //Pega valor do campo celular
        var password = $('#password').val();  //Pega valor do campo senha

        var usuarioData = { nome: nome, email: email, ra: ra, cpf: cpf, telefone: telefone, celular: celular, password: password, codPerfil: 0 };
        var success = function (result) {         //Sucesso no AJAX
            result = $.parseJSON(result);
            if (result.length > 0) {
                $('.modal:visible').modal('hide');
                $('.MSGnomeUsuario').text(nome);

                var nFrom = "top";
                var nAlign = "center";
                var nIcons = '';
                var nType = 'success';
                var nAnimIn = '';
                var nAnimOut = '';

                notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, 'O usuário ' + nome + ' foi inserido com sucesso.');

                //$('#success').show();
                usuarioData.codUsuario = result[0].codUsuario;
                usuarioData.Perfil = result[0].strPerfil;
                usuarioData.Adm = result[0].boolAdm;

                linkEditar = '<div class="pull-right"><div class="actions dropdown"><a href="#" data-toggle="dropdown" aria-expanded="true"><i class="zmdi zmdi-more-vert"></i></a><ul class="dropdown-menu dropdown-menu-right"><li><a href="javascript:void(0);" onclick="editarUsuario(this)" alt="Alterar"><i class="zmdi zmdi-edit"></i> Alterar</a></li><li><a href="javascript:void(0);" onclick="excluirUsuario(this)" alt="Excluir"><i class="zmdi zmdi-delete"></i> Excluir</a></li></ul></div></div>'
                usuarioData.linkEditar = linkEditar;

                /*linkExcluir = $('<a href="javascript:void(0);" onclick="excluirUsuario(this)" alt="Excluir"><i class="zmdi zmdi-delete"></i></a>');
                usuarioData.linkExcluir = linkExcluir;*/

                inserirTabela(usuarioData);

                $('#formModal').find('input').val('');
				
				cacheUsuarios.push({ strNome: nome, strEmail: email, strMatricula: ra, strCpf: cpf, strTel1: telefone, strTel2: celular, codUsuario: usuarioData.codUsuario,codPerfil:  result[0].codPerfil});
            } else {
                alert('Erro ao incluir dados');
            }
        };

        usuarioService.insert(usuarioData, success);
        return true;
    } else {
        return false;
    }

}

function inserirTabela(u) {
    /*
    var tr = $('<tr>');
    $('<td>').addClass('field').attr('data', 'codUsuario').text(u.codUsuario).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strNome').text(u.nome).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strLogin').text(u.email).appendTo(tr);
    $('<td>').addClass('field').attr('data', 'strPerfil').text(u.Perfil).appendTo(tr);
    $('<td>').css('textAlign', 'center').html(u.linkEditar).appendTo(tr);
    $('<td>').css('textAlign', 'center').html(u.linkExcluir).appendTo(tr);

    $('#example tbody').prepend(tr);
    */

    var table = $('#example').DataTable();
    var linha = table.rows.add([{
        0: u.codUsuario,
        1: u.nome,
        2: u.ra,
        3: u.email,
        4: u.cpf,
        5: u.Perfil,
        6: u.telefone,
        7: u.celular,
        8: u.linkEditar
    }]).draw();

	var tr = $(linha.nodes()[0]);
	
	var acertaNome = '<div data="strNome" style="width:160px; overflow: hidden">' + u.nome + '</div>'
	
	tr.find('td').eq(0).attr('data', 'codUsuario');
	tr.find('td').eq(1).attr('data', 'strNome').html(acertaNome);
	tr.find('td').eq(2).attr('data', 'strMatricula');
	tr.find('td').eq(3).attr('data', 'strEmail');
	tr.find('td').eq(4).attr('data', 'strCpf');
	tr.find('td').eq(5).attr('data', 'strPerfil');
	tr.find('td').eq(6).attr('data', 'strTel1');
	tr.find('td').eq(7).attr('data', 'strTel2');
	
	
}

function alteraDetalhe(td) {
	if (td!=undefined)
	{
		trEdicao = $(td).parent();
	}
	
	var exec = function() {		
		var achou = false;
		trEdicao.find('td').each(function (i, e) {
			var td = $(e);
			trEdicao.next().find('li[data-dtr-index=' + i + ']').html(td.html());
			
			if (!achou)
			{
				achou = trEdicao.next().find('li[data-dtr-index=' + i + ']').length > 0
			}
		});	
		
		if (!achou) {
			setTimeout(exec, 100);
		}
	}
	
	setTimeout(exec, 100);
	
}

function alterarTabela(u) {
    trEdicao.find('div[data=strNome]').html(u.nome);
    trEdicao.find('td[data=strMatricula]').text(u.ra);
    trEdicao.find('td[data=strEmail]').text(u.email);
    trEdicao.find('td[data=strCpf]').text(u.cpf);
    trEdicao.find('td[data=strTel1]').text(u.telefone);
    trEdicao.find('td[data=strTel2]').text(u.celular);

    if (u.codPerfil > 0) {
        strPerfil = perfis.where(function (p) { return p.codPerfil == u.codPerfil; })[0].strPerfil;
        trEdicao.find('td[data=strPerfil]').text(strPerfil);
    }

	alteraDetalhe();    
}

function ativaValidacao() {
    $("#cpf").mask("000.000.000-00");
    $("#telefone").mask("(00) 0000-0000");
    $("#celular").mask("(00) 00000-0000");
    $("#cpfEdicao").mask("000.000.000-00");
    $("#telefoneEdicao").mask("(00) 0000-0000");
    $("#celularEdicao").mask("(00) 00000-0000");
    $('#formInclusao, #formEdicao').validate({
        rules: {
            nome: {
                required: true,
                maxlength: 50
            },
            email: {
                required: true,
                email: true,
                maxlength: 100,
                remote: configuracoes.baseURL + 'entities/VerificarEmail.asp'
            },
            ra: {
                number: true,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 4,
                maxlength: 15

            },
            confirmapassword: {
                required: true,
                minlength: 4,
                maxlength: 15,
                equalTo: '#password'
            }
        },
        messages: {
            nome: {
                required: "Digite seu nome",
                maxlength: "O campo \"Nome\" pode ter, no máximo, 50 caracteres"
            },
            email: {
                required: "Digite seu email",
                email: "O campo \"Email\" deve conter um email válido",
                maxlength: "O campo \"Email\" pode ter, no máximo, 100 caracteres",
                remote: "O email informado já está em uso. Escolha outro email"
            },
            ra: {
                number: "Digite apenas números",
                maxlength: "O campo \"Ra\" pode ter, no máximo, 10 caracteres"
            },
            password: {
                required: "Digite uma senha",
                minlength: "A senha deve conter, no mínimo, 4 caracteres",
                maxlength: "A senha pode ter, no máximo, 15 caracteres"
            },
            confirmapassword: {
                required: "Repita a senha",
                minlength: "A confirmação da senha deve conter, no mínimo, 4 caracteres",
                maxlength: "A confirmação da senha pode ter, no máximo, 15 caracteres",
                equalTo: "O campo \"Confirmar Senha\" deve ser igual ao campo \"Senha\"!"
            }
        }
    });


}

var perfis = [];
function carregaPerfis() {
    usuarioService.getPerfis(function (data) {

        perfis = $.parseJSON(data);

        montaComboPerfis();

    }, function () { });

}

function montaComboPerfis() {

    var combo = $('#perfilEdicao');

    $(perfis).each(function (i, e) {

        var option = $('<option>').val(e.codPerfil).text(e.strPerfil);
        combo.append(option);

    });

}

var cacheUsuarios = [];

$(function () {
    carregaDadosUsuario();
    ativaValidacao();
    carregaPerfis();

    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/usuarios.asp",          //Arquivo asp
        type: "post",                //Método de envio
        data: "{}",   //Dados
        success: function (arrayDeDados) {         //Sucesso no AJAX
            var repetidor = $('.repeat').clone();
            var pai = $('.repeat').parent();
            $('.repeat').remove();
            cacheUsuarios = $.parseJSON(arrayDeDados);
            $($.parseJSON(arrayDeDados)).each(function (posicao, dado) {

                var clone = repetidor.clone();

                $(clone).find('.field').each(function (numObjeto, objetoContainer) {

                    $(objetoContainer).text(dado[$(objetoContainer).attr('data')]);

                });

                clone.appendTo(pai);

            });

            $('td[data=codUsuario]').each(function (i, e) {
                var td = $(e);

                td.html('<div data="codUsuario" style="width:30px; overflow: hidden">' + td.text() + '</div>');

            });

            $('td[data=strNome]').each(function (i, e) {
                var td = $(e);

                td.html('<div data="strNome" style="width:160px; overflow: hidden">' + td.text() + '</div>');

            });

            var table = $('#example').DataTable({
                language: {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.11/i18n/Portuguese-Brasil.json"
                },
                pageLength: 25,
                columns: [
					{ "orderable": true },
					{ "orderable": true },
                    { "orderable": true },
					{ "orderable": true },
					{ "orderable": true },
                    { "orderable": true },
                    { "orderable": false },
                    { "orderable": false },
			        { "orderable": false },
                ],
                order: [[1, "asc"]],
                //colReorder: true,
                //rowReorder: true,
                select: {
                    style: 'os'
                },
                columnDefs: [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: -8 },
                    { responsivePriority: 3, targets: -1 }
                ]
                //dom: 'Bfrtip',
                //buttons: ['print', 'excel', 'pdf']

            });

        },

        complete: function () {
            $('#loader').hide();
        }
    })
>>>>>>> origin/master
});