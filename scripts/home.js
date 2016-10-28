$(function () {
	
	carregaDadosUsuario();
	
	carregaDadosTickets();
});

function carregaDadosTickets() {
	
	ticketService.getAgrupados(session.get('codUsuario'), function(data) {
		var tickets = $.parseJSON(data);
		
		var total = 0;
		
		$(tickets).each(function(i, e) {
			
			$('.' + e.strStatus.replace(' ', '_')).text(e.Quantidade);
			
			total += e.Quantidade;			
			
		});
		
		$('.todos').text(total);		
	});
	
}