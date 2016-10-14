var menuService = {};
menuService.get = function(success) {
   $.ajax({
      url: configuracoes.baseURL + "entities/menu.asp",
      type: "get",
      data: "codUsuario=" + session.get("codUsuario"),
      success: success
   });
};