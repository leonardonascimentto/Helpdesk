var trEdicao = null;

function editarUsuario(link) {
	if ($('#formEdicao').valid()) {
		var tr = $(link).parents('tr:eq(0)');
		trEdicao = tr;
		var nome = tr.find('td[data=strNome]').text();
		var email = tr.find('td[data=strLogin]').text();
		var codUsuario = tr.find('td[data=codUsuario]').text();
 
		var codPerfil = cacheUsuarios.where(function(u) { return u.codUsuario == codUsuario; })[0].codPerfil;
		
		
		$('#nomeEdicao').val(nome);
		$('#emailEdicao').val(email);
		$('#codUsuarioEdicao').val(codUsuario);
		$('#perfilEdicao').val(codPerfil);
	}
}

function salvarUsuario() {
    var nome = $('#nomeEdicao').val();    //Pega valor do campo nome
    var email = $('#emailEdicao').val();  //Pega valor do campo email
    var codUsuario = $('#codUsuarioEdicao').val();
	var codPerfil = $('#perfilEdicao').val();

    var usuarioData = { nome: nome, email: email, codUsuario: codUsuario, codPerfil: codPerfil };
    var success = function (result) {         //Sucesso no AJAX
        if (result != '0') {
            $('.modal:visible').modal('hide');
			$('.MSGnomeUsuario').text(nome);
            $('#successEditar').show();
            usuarioData.codUsuario = result;
            alterarTabela(usuarioData);
        } else {
            alert('Erro ao incluir dados');
        }
    };

    usuarioService.insert(usuarioData, success);
    return false;
}
var link;

function excluirUsuario(link_) {	
	$('#confirmaExclusao').show();
	link = link_;
}

function concluirExclusao() {
    tredicao = $(link).parents('tr:eq(0)');
    var codUsuario = tredicao.find('td[data=codUsuario]').text();
	var nome = tredicao.find('td[data=strNome]').text();
    var usuariodata = { codUsuario: codUsuario };
    usuarioService.delete(usuariodata, function () {
		$('.MSGnomeUsuario').text(nome);
        $('#successExcluir').show();
        tredicao.remove();
    });
	
	$('#confirmaExclusao').hide();
}

function inserirUsuario() {
	
	if ($('#formInclusao').valid()) {
		var nome = $('#nome').val();    //Pega valor do campo nome
		var email = $('#email').val();  //Pega valor do campo email
		var password = $('#password').val();  //Pega valor do campo senha

		var usuarioData = { nome: nome, email: email, password: password, codPerfil: 0 };
		var success = function (result) {         //Sucesso no AJAX
			result = $.parseJSON(result);
			if (result.length > 0) {
				$('.modal:visible').modal('hide');
				$('.MSGnomeUsuario').text(nome);
				$('#success').show();
				usuarioData.codUsuario = result[0].codUsuario;
				usuarioData.Perfil = result[0].strPerfil;
				usuarioData.Adm = result[0].boolAdm;

				linkEditar = $('<a href="javascript:void(0)" onclick="editarUsuario(this)" data-toggle="modal" data-target="#formModalEdicao" alt="Alterar"><i class="fa fa-user"></i></a>');
				usuarioData.linkEditar = linkEditar;
				
				linkExcluir = $('<a href="javascript:void(0);" onclick="excluirUsuario(this)" alt="Excluir"><i class="fa fa-times"></i></a>');
				usuarioData.linkExcluir = linkExcluir;
				
				inserirTabela(usuarioData);
				
				$('#formModal').find('input').val('');
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
    table.rows.add([{
        0: u.codUsuario,
        1: u.nome,
        2: u.email,
        3: u.Perfil,
        4: u.linkEditar,
        5: u.linkExcluir
    }]).draw();


}

function alterarTabela(u) {
    trEdicao.find('td[data=strNome]').text(u.nome);
    trEdicao.find('td[data=strEmail]').text(u.email);
	
	if (u.codPerfil > 0) {
		
		strPerfil = perfis.where(function(p) { return p.codPerfil == u.codPerfil; })[0].strPerfil;
		trEdicao.find('td[data=strPerfil]').text(strPerfil);
		
		
	}
}

function ativaValidacao() {
	
	$('#formInclusao, #formEdicao').validate({
                    rules:{
                        nome:{ 
                            required: true
                        },
                        email:{ 
                            required: true,
                            email: true
                        },
                        password:{ 
                            required: true,
                            minlength: 4,
                            maxlength: 15
                             
                        },
                        confirmapassword:{ 
                            required: true, 
                            minlength: 4,
                            maxlength: 15,
                            equalTo: '#password'
                        }
                    },
                    messages:{
                        nome:{ 
                            required: "Digite seu nome"  
                        },
                        email:{ 
                            required: "Digite seu email" , 
                            email: "O campo \"Email\" deve conter um email válido",
                            remote: "O email informado já está em uso. Escolha outro email"
                        },                        
                        password:{ 
                            required: "Digite uma senha" , 
                            minlength: "A senha deve conter, no mínimo, 4 caracteres" ,
                            maxlength: "A senha pode ter, no máximo, 15 caracteres"
                        },
                        confirmapassword:{ 
                            required: "Repita a senha" ,
                            minlength: "A confirmação da senha deve conter, no mínimo, 4 caracteres" ,
                            maxlength: "A confirmação da senha pode ter, no máximo, 15 caracteres" ,
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
		
    }, function() {});
	
}

function montaComboPerfis() {
	
	var combo = $('#perfilEdicao');
	
	$(perfis).each(function(i,e) {
		
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
					{ "orderable": false },
					{ "orderable": false },
                ],
                order: [[1, "asc"]],
                colReorder: true,
                //rowReorder: true,
                select: {
                    style: 'os'
                },
                columnDefs: [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: -5 }
                ],
				dom: 'Bfrtip',
                buttons: ['print', 'excel', 'pdf']

            });

        },

        complete: function () {
            $('#loader').hide();
        }
    })
});