var ticketService = {};
ticketService.insert = function (ticketData, success) {
    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketsInserir.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "categoria=" + ticketData.categoria + "&assunto=" + ticketData.assunto + "&descricao=" 
		+ ticketData.descricao + "&codUsuarioCriador=" + ticketData.codUsuarioCriador + "&codUsuario=" + ticketData.codUsuario,   //Dados
        success: success,
        complete: function () {
            $('#loader').hide();
        }
    })

};
ticketService.delete = function (ticketData, success) {
    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketsDelete.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codTicket=" + ticketData.codTicket,   //Dados
        success: success,
        complete: function () {
            $('#loader').hide();
        }
    })
};
ticketService.insertComentario = function (comentarioData, success) {
    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketsInserirComentario.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codTicket=" + comentarioData.codTicket + "&codUsuario=" + comentarioData.codUsuario + "&Acompanhamento=" + comentarioData.Acompanhamento,   //Dados
        success: success,
        complete: function () {
            $('#loader').hide();
        }
    });
};

ticketService.getComentarios = function (codTicket, success) {
    $('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketAcompanhamento.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codTicket=" + codTicket ,   //Dados
        success: success,
        complete: function () {
            $('#loader').hide();
        }
    });
};

ticketService.getAgrupados = function (codUsuario, success) {
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketsAgrupadosPorStatus.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codUsuario=" + codUsuario,   //Dados
        success: success
    });
};

ticketService.getTickets = function(success) {
	
	$('#loader').show();
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/Ticket.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codUsuario=" + session.get("codUsuario"),   //Dados
        success: success,
        complete: function () {
            $('#loader').hide();
        }
    })
	
}

ticketService.getStatus = function(success) {
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/Status.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "",   //Dados
        success: success,
    })
}

ticketService.getCategorias = function(success) {
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/Categoria.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "",   //Dados
        success: success,
    })
}


ticketService.salvaStatus = function(codTicket, codStatus) {
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketUpdateStatus.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codTicket="+codTicket+"&codStatus="+codStatus,   //Dados
        success: success,
    })
}


ticketService.salvaCategoria = function(codTicket, codCategoria) {
    $.ajax({            //Função AJAX
        url: configuracoes.baseURL + "entities/TicketUpdateCategoria.asp",          //Arquivo asp
        type: "get",                //Método de envio
        data: "codTicket="+codTicket+"&codCategoria="+codCategoria,   //Dados
        success: success,
    })
}
