function inserirTicket() {
    var categoria = $('#categoria').val();  //Pega valor do campo categoria
    var assunto = $('#assunto').val();  //Pega valor do campo assunto
    var descricao = $('#descricao').val();  //Pega valor do campo descricao
    var codUsuario = session.get("codUsuario");  //Pega valor do codUsuario
	
	var nome = nomeUsuarioSelecionado;
	if (nome == '')
	{
		nome = session.get("nomeUsuario");
	}
	
    var ticketData = { categoria: categoria, assunto: assunto, descricao: descricao, codUsuarioCriador: codUsuario, codUsuario: codUsuarioSelecionadoInclusao, nome: nome};
    var success = function (result) {         //Sucesso no AJAX
        if (result != '0') {
            $('.modal:visible').modal('hide');
            $('.MSGassuntoTicket').text(assunto);
            $('#success').show();
            ticketData.codTicket = result;
            inserirTabela(ticketData);
			
			$('#assunto').val('');  
			$('.textarea').data("wysihtml5").editor.clear();
			
			$('#usuario').val('');
			$('#categoria').val('Administrativo');

			codUsuarioSelecionadoInclusao = 0;
			nomeUsuarioSelecionado = "";

			
        } else {
            alert('Erro ao incluir dados');
        }
    };

    ticketService.insert(ticketData, success);
    return false;
}
var srcPadrao = configuracoes.baseURL + "imagens/fotos/u#cod#.png";
//var cloneLi = $('<li><div class="date"><span><img class="img-circle fotoAluno" src="" width="44" height="45" onerror="this.src=\'images/profile.jpg\'"></img></span></div><h4 class="comentarioNomeUsuario"></h4><h5 class="data"></h5><p class="comentario"></p></li>');
var cloneLi = $('<li class="media"><a href="#" class="tvh-user pull-left"><img class="img-responsive fotoAluno" src="" width="44" height="45" onerror="this.src=\'images/profile.jpg\'"></a><div class="media-body"><strong class="d-block comentarioNomeUsuario"></strong><small class="c-gray data"></small><div class="m-t-10 comentario"></div></div></li>');
function inserirComentario() {
	var comentarioData = {
		codTicket: session.get('codTicket'),
		codUsuario: session.get('codUsuario'),
		Acompanhamento: $('#Descricao_Modal1').val()		
	};
	
	ticketService.insertComentario(comentarioData, function() {
		$('#Descricao_Modal1').val('');
		
		var li = cloneLi.clone();
		li.find('.data').text(dataBr());
		li.find('.comentarioNomeUsuario').text(session.get("nomeUsuario"));
		li.find('.comentario').text(comentarioData.Acompanhamento);
		
		li.find('.fotoAluno').attr('src', srcPadrao.replace('#cod#', comentarioData.codUsuario));		
		$('#ulComentarios').append(li);		
		$('#ulComentarios').find('.semcomentario').remove();
		
		trSelecionada.find('td[data=strStatus]').find('span').text('Respondido');
	});
	
}

function inserirTabela(u) {		
    /*var tr = $('<tr class="repeat odd" role="row">');
    $('<td class="field sorting_1" data="codTicket" tabindex="0"><span class="codTicket">'+ u.codTicket +'</span></td>').appendTo(tr);
    $('<td class="field" data="strAssunto" style="cursor: pointer;"><span class="strAssunto">' + u.assunto + '</span></td>').appendTo(tr).click(abreModal);
	$('<td class="field" data="strNome"><span class="strNome">' + session.get("nomeUsuario") + '</span></td>').appendTo(tr);
    $('<td class="field" data="strCategoria"><span class="strCategoria">' + u.categoria + '</span></td>').appendTo(tr);
    $('<td class="field" data="strStatus"><span class="strStatus">Aberto</span></td>').appendTo(tr);
    $('<td class="field" data="dtDataHora" style="display: none;"><span class="dtDataHora">' + dataBr + '</span></td>').appendTo(tr);
    $('<td>').text('').appendTo(tr);
    $('<td>').text('').appendTo(tr);

    $('#example tbody').prepend(tr);
	adicionaDescricao(tr, u.descricao);
	
	resetTable();
	*/
	
	var table = $('#example').DataTable();
	table.rows.add([{
		0: '<span class="codTicket">'+ u.codTicket +'</span>',
		1: '<span class="strAssunto">' + u.assunto + '</span>',
		2: '<span class="strNome">' + u.nome + '</span>',
		3: '<span class="strCategoria">' + u.categoria + '</span>',
		4: '<span class="strStatus label label-success">Aberto</span>',
		5: '<span class="dtDataHora">' + dataBr() + '</span>'
	}]).draw();


	todosTickets.push({
		codTicket: u.codTicket,
		codCategoria: 1,
		codStatus: 1
	});

	$('#example').find('tbody').find('tr:first').find('td:eq(1)').click(abreModal).css('cursor', 'pointer');
	acertaCorBotoes();
	
}

function adicionaDescricao(tr, texto) {
	var h = $('<span class="field" data="strDescricao"></span>').text(texto);
	h.hide();
	tr.find('td:eq(2)').append(h)
}

var trSelecionada = null;
var todosTickets = [];

function carregaComentarios(ID, tr) {
	
	trSelecionada = tr;
	ticketService.getComentarios(ID, function(data) {
		var comentarios = $.parseJSON(data);
		
		$('#ulComentarios').find('li').remove();
		if (comentarios.length > 0)
		{	
			$(comentarios).each(function(i, comentario) {				
				li = cloneLi.clone();
				li.find('.data').text(comentario.dtDataHora);
				li.find('.comentarioNomeUsuario').text(comentario.strNome);
				li.find('.comentario').text(comentario.strAcompanhamento);
				
				li.find('.fotoAluno').attr('src', srcPadrao.replace('#cod#', comentario.codUsuario));						
				
				$('#ulComentarios').append(li);				
			});
		} else {
			var li = '<li class="semcomentario"><p><span>Ainda não existem comentários</span></p></li>';
			$('#ulComentarios').append(li);			
		}
		
	});	
}

var codTicketSelecionado = 0;

function abreModal() {
	var td = $(this);	
	var tr = td.parents('tr:eq(0)');
	var ID = tr.find('td').eq(0).text();
	codTicketSelecionado = ID;
	var objTicket = todosTickets.where(function(t) { return t.codTicket == codTicketSelecionado; })[0];
	
	var Assunto = tr.find('td').eq(1).text();
	var Nome = tr.find('td').eq(2).find('.strNome').text();					
	var Descricao = tr.find('span[data=strDescricao]').text();
	var Data = tr.find('td').eq(5).text();
	var DataTicket = tr.find('span[data=DataTicket]').text();
	
	$('#codTicket_Modal').text(ID);
	session.set('codTicket', ID);					
	$('#Assunto_Modal').text(Assunto);
	$('#NomeUsuario_Modal').text(Nome);
	$('#Descricao_Modal').html(Descricao);
	$('.dataCriacao').html(DataTicket);
	$('#status').val(objTicket.codStatus);
	$('#categoriaModal').val(objTicket.codCategoria);
	
	$("#formModalAcompanhamento").modal();
	
	carregaComentarios(ID, tr);	
}

var codUsuarioSelecionadoInclusao = 0;
var nomeUsuarioSelecionado = "";

function carregaUsuariosParaAutoComplete() {
	
	usuarioService.getAll(function(data) {
		var usuarios = [];
		var codigos = [];
		var jdata = $.parseJSON(data);
		$(jdata).each(function(i, e) {
			
			usuarios.push({ value : e.strNome, label: e.strNome, id: e.codUsuario });
			//codigos.push(e.codUsuario);
			
		});
		
		$('#usuario').autocomplete({
			minLength: 3,
			source: usuarios,
			select: function(event, ui) {
				codUsuarioSelecionadoInclusao = ui.item.id;
				nomeUsuarioSelecionado = ui.item.value;
			}
		});
		
		
	}, function() {});
	
}

function resetTable() {
	
	
		$('#example').dataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.11/i18n/Portuguese-Brasil.json"
                },
                "pageLength": 25,
                "columns": [
                    { "orderable": true },
                    { "orderable": true },
                    { "orderable": true },
                    { "orderable": true },
                    { "orderable": true },
                    { "orderable": true }
                ],
                "order": [[0, "desc" ]],
				"destroy": true
            });
}

$(function () {
    //$('.textarea').wysihtml5();

	carregaDadosUsuario();
	
	if (session.get('codPerfil') != 37)
	{
	    $('.linhaUsuario').show();
	    $('.linhaAcompanhamento').show();
	} else {
	    $('.linhaUsuario').hide();
	    $('.linhaAcompanhamento').hide();
	}
	
	
	var success = function (arrayDeDados) {         //Sucesso no AJAX
            var repetidor = $('.repeat').clone();
            var pai = $('.repeat').parent();
            $('.repeat').remove();
			todosTickets = $.parseJSON(arrayDeDados);
            $(todosTickets).each(function (posicao, dado) {

                var clone = repetidor.clone();

                $(clone).find('.field').each(function (numObjeto, objetoContainer) {

					var span = $('<span>').addClass($(objetoContainer).attr('data'));
					span.html(dado[$(objetoContainer).attr('data')]);
				
                    $(objetoContainer).append(span);

                });

				var spanDataTicket = $('<span data="DataTicket" style="display:none">' + dado["dtDataHoraTicket"] + '</span>')
				clone.find('td:eq(2)').append(spanDataTicket);
				
				clone.find('[data=strStatus]').find('span').addClass(dado.strLabel).addClass('label');
				
                clone.appendTo(pai);
            });
			
			//$('td[data=codTicket]').each(function (i, e) {
            //    var td = $(e);

            //    td.html('<div data="codTicket" style="width:30px; overflow: hidden">' + td.text() + '</div>');

            //});
			
			$('td[data=strAssunto]').each(function(i, e) {
				var td = $(e);
				
				td.html('<div data="strAssunto" style="width:190px; overflow: hidden">' + td.text() + '</div>');
				
			});

			//Retira Ultima Coluna
			$('#example').find('tr').each(function(i, e) {
				var tr = $(e);
				var td = tr.find('td:last');
				if (td.length == 1)
				{
					var texto = td.find('span').html();
					td.remove();
					adicionaDescricao(tr, texto);
				}
				
			});

            resetTable();

			//Cria link no ID
			$('.field[data=strAssunto]').each(function(i, e) {
				var td = $(e);
				td.click(abreModal);
				td.css('cursor', 'pointer');
			});
			
			acertaCorBotoes();
			carregaComboStatus();
			carregaComboCategoria();
			carregaComboCategoriaCurso();
			carregaComboPersonagem();
        }
	
	ticketService.getTickets(success);
	
	carregaUsuariosParaAutoComplete();
   
});

function acertaCorBotoes() {

	$('tr').each(function(i, e) {

		var tr = $(e);
		var status = tr.find('.strStatus');
		if (status.length > 0)
		{
			var classe = status.attr('class');

			var td = tr.find('td:eq(0)').find('span');

			td.attr('class', classe)
		}

	});

}

function carregaComboPersonagem() {
	var combo = $('#profissional');	
	ticketService.getProfissionais(function(dado) {
		carregaCombo(combo, $.parseJSON(dado), 'codPersonagem', 'strPersonagem')
	});
}

function carregaComboStatus() {
	var combo = $('#status');	
	ticketService.getStatus(function(dado) {
		carregaCombo(combo, $.parseJSON(dado), 'codStatus', 'strStatus', 'strLabel')
	});
}

function carregaComboCategoria() {
	var combo = $('#categoriaModal');	
	ticketService.getCategorias(function(dado) {
		carregaCombo(combo, $.parseJSON(dado), 'codCategoria', 'strCategoria')
	});
}


function carregaComboCategoriaCurso() {
	var comboCategoria = $('#categoriacurso');	
	ticketService.getCategoriasCursos(function(dado) {
		carregaCombo(comboCategoria, $.parseJSON(dado), 'codCategoria', 'strCategoria')
		
		var comboCurso = $('#curso');
		var comboTurma = $('#turma');
		
		var changeCurso = function() {
			var codCurso = comboCurso.val();
			comboTurma.html('');
			ticketService.getTurmas(codCurso, function(dadoTurma) {
				carregaCombo(comboTurma, $.parseJSON(dadoTurma), 'codTurma', 'strTurma')
			});
			
		};
		
		var changeCategoria = function() {
			var codCategoria = comboCategoria.val();
			comboCurso.html('');
			ticketService.getCursos(codCategoria, function(dadoCurso) {
				carregaCombo(comboCurso, $.parseJSON(dadoCurso), 'codCurso', 'strCurso');
				changeCurso();
			});
		};
		
		comboCategoria.change(changeCategoria);
		changeCategoria();
		
		comboCurso.change(changeCurso);
	});
}

function carregaCombo(combo, dado, codigo, valor, d) {
	$(dado).each(function(i, e) {
		var option = $('<option>').val(e[codigo]).text(e[valor]);
		if (d)
			option.attr('data', e[d]);
		combo.append(option);
	});	
}

function salvaStatus(combo) {
	var codStatus = $(combo).val();
	var status = $(combo).find('option:selected').text();
	
	var span = trSelecionada.find('span.strStatus:last').text(status);
	var classe = 'strStatus label ' + $(combo).find('option:selected').attr('data');
	span.attr('class', classe);
	trSelecionada.find('span:eq(0)').attr('class', classe);
	
	ticketService.salvaStatus(codTicketSelecionado, codStatus);

	todosTickets.where(function(t){ return t.codTicket == codTicketSelecionado })[0].codStatus = codStatus;
}

function salvaCategoria(combo) {
	var codCategoria = $(combo).val();
	var categoria = $(combo).find('option:selected').text();
	
	trSelecionada.find('span.strCategoria').text(categoria);
	
	ticketService.salvaCategoria(codTicketSelecionado, codCategoria);

	todosTickets.where(function(t){ return t.codTicket == codTicketSelecionado })[0].codCategoria = codCategoria;
}