(function () {
  $(function () {

    var iframeSelector = "#atrDialogIframe_save", $iframe;

    setInterval(function(){
      if(iframeExists()){

        addFormatButton();
        addMaxButton();

        addShotTitle();
      }
    }, 1000);


    function iframeExists(){
      $iframe = $(iframeSelector).contents();
      return $iframe.size() > 0;
    }

    function addShotTitle(){
      var title = $iframe.find("#form_bk_lname").val();
      var $shotTitle = $iframe.find("#form_bk_short_title");
      if($shotTitle.val() == ''){
        $shotTitle.val(title);
        $shotTitle.parent().append("（请保存）");
      }
    }

    function addFormatButton(){
      var $btnCtn = $(".aui_buttons:visible");
      var hasExists = $btnCtn.find(".format_btn").size() > 0;
      if(!hasExists){
        $btnFormat = $('<button class="aui_state_highlight format_btn" type="button">转码</button>');

        $btnCtn.prepend($btnFormat);

        $btnCtn.find(".format_btn").click(function(){
          formatList("#xlist");
          formatList("#ylist");
        });
      }
    }

    function formatList(selector){
      var $textArea = $iframe.find(selector);
      var jsonVal = $textArea.val();
      var formatedJson = JSON.stringify(JSON.parse(jsonVal), null, "    ");
      $textArea.val(formatedJson);
    }

    function addMaxButton(){
      var $content = $(iframeSelector).parents("div.aui_content");
      $content.width('100%');
      $content.height('100%');
      $(iframeSelector).width('100%');
      $(iframeSelector).height('100%');

      var $titleBar = $(iframeSelector).parents('.aui_dialog').find('.aui_titleBar');
      if($titleBar.find('.aui_max').size() == 0){
        $titleBar.find('.aui_close').before('<a class="aui_max aui_close" style="margin-right:20px;" href="javascript:void(0);" style="display: block;">o</a>');
        $titleBar.find('.aui_max').click(function(){
          var $win = $(iframeSelector).parents("div.aui_state_focus");
          $win.css({left: 0, top: 0});
          $win.width($('body').width());
          $win.height($('body').height());

          var $main = $(iframeSelector).parents("td.aui_main");
          $main.width($('body').width());
          $main.height($('body').height() - 80);

          var $xlist = $iframe.find('#xlist');
          var $ylist = $iframe.find('#ylist');
          $xlist.width($('body').width() - 150);
          $ylist.width($('body').width() - 150);
          $xlist.height(300);
          $ylist.height(300);
        });
      }
    }

  });
})();