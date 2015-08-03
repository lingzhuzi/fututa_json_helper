(function () {
  $(function () {

    var iframeSelector = "#atrDialogIframe_save", $iframe;

    setInterval(function(){
      if(iframeExists()){
        var $main = $(iframeSelector).parents("td.aui_main");
        $(iframeSelector).width($main.width());
        $(iframeSelector).height($main.height() - 10);
        addButton();
      }
    }, 1000);

    function iframeExists(){
      $iframe = $(iframeSelector).contents();
      return $iframe.size() > 0;
    }

    function addButton(){
      var $btnCtn = $(".aui_buttons:visible");
      var hasExists = $btnCtn.find(".format_btn").size() > 0;
      if(!hasExists){
        $btnFormat = $('<button class="aui_state_highlight format_btn" type="button">转换</button>');

        $btnCtn.prepend($btnFormat);

        $btnCtn.find(".format_btn").click(function(){
          formatList("#xlist");
          formatList("#ylist");
        });
      }
    }

    function formatList(selector){
      var $xlist = $iframe.find(selector);
      var jsonVal = $xlist.val();
      var formatedJson = JSON.stringify(JSON.parse(jsonVal), null, "    ");
      $xlist.val(formatedJson);
    }

  });
})();