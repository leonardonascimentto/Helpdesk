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
	
	carregaMenu();
})

function carregaMenu() {
   
   menuService.get(function(data) {
         var menuCompleto = $.parseJSON(data);
      
         var montaMenu = function(ulMenu, menu) {
            ulMenu.show();
            $(menu).each(function(i,e) {
            
            var filhos = menuCompleto.where(function(m) { return m.codMenuPai == e.codMenu;});
            
            var li;
            
            if (filhos.length == 0)
               li = getItemFilho(e.strMenu, e.strLink, e.strIcone);
            else {
               li = getItemPai(e.strMenu, e.strIcone);
               
               var ul = li.find('ul');
               montaMenu(ul, filhos);
            }
            
            ulMenu.append(li);
         });
      }
      
      var ulMenu = $('#ulMenu');
      data = $.parseJSON(data);
      data = data.where(function(m) {return m.codMenuPai == null; }).orderBy(function(m) { return m.intOrdem; });
      
      montaMenu(ulMenu, data);  
      
   });
   
}

function getItemFilho(label, link, icon) {   
   label = $.trim(label);
   link = configuracoes.baseSite + $.trim(link);
   
   var classeAtivo = '';
   var enderecoAtual = location.href;
   if (enderecoAtual.indexOf(link) > -1)
   {
       classeAtivo = 'toggled active';
   }
   
   var obj = '<li class="' + classeAtivo + '"><a href="' + link + '" title="Início"><i class="' + icon + '"></i>'+ label +'</a></li>';
   
   return $(obj);
}

function getItemPai(label, icon) {
   label = $.trim(label);
   
   var li = $('<li>').attr('class', 'sub-menu so_adm');
   var a = $('<a>').attr('href', '#').click(function() {
      var self = $(this);
      
      var liPai = self.parent();
      var ulFilha = liPai.find('ul');
      
      ulFilha.toggle();
      
   }).attr('title', label);
   li.append(a);
   
   var img = $('<i>').attr('class', icon);
   a.append(img);
   
   var span = $('<span>').text(label);
   a.append(span);
   
   var ul = $('<ul>').addClass('nav-sub');
   li.append(ul);  
  

   return li;
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
			trEdicao.next().find('li[data-dtr-index=' + i + ']').find('.dtr-data').html(td.html());
			
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