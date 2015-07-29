var Menu = function(){
    //ќживл€ем меню первого уровн€
    var $menuActiveSelector = "menu__lnk_t_active",
        $menu = ".menu",
        $menuItem = ".menu__item",
        $menuLnk = ".menu__lnk";

    $($menuItem).hover(
        function(){
            $(this).find($menuLnk).addClass($menuActiveSelector);
            $(this).find(".col-menu").css("display", "block");
        },
        function(){
            $(this).find($menuLnk).removeClass($menuActiveSelector);
            $(this).find(".col-menu").css("display", "none");
        }
    );
    //¬торой уровень меню
    var $colMenuActiveSelector = "col-menu__lnk_t_active",
        $colMenuItem = ".col-menu__item",
        $colMenuLnk = ".col-menu__lnk",
        $dataImgMenu = "data-img-menu",
        $colMenuImg = ".col-menu__img > img";
    $($colMenuItem).hover(
        function(){
            var attr = $(this).find($colMenuLnk).attr($dataImgMenu),
                src = $($colMenuImg).attr("src"),
                parsSrc = src.split("/");
            parsSrc[parsSrc.length - 1] = "menu-" + attr +".jpg";

            parsSrc = parsSrc.join("/");
            $($colMenuImg).attr("src", parsSrc);
            $(this).find($colMenuLnk).addClass($colMenuActiveSelector);
        },
        function(){
            $(this).find($colMenuLnk).removeClass($colMenuActiveSelector);
        }
    );
};
