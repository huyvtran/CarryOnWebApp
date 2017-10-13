
/* It add a gray/disabled element in the area where the data is being loaded for a minimum time
  Parameter passed if of type:
  objParam {
     hasImage       -- If the loading has to have an image (gif, for example) on the overlap element
     imgSource      -- Image path on the overlap element
     classToOverlap -- The class to assign to the element that we use to overlap
     minOverlapTime -- The minimum time the overlap window keep being present  
  } */
jQuery.fn.CarryonLoading = function (objParam) {
    var self = this;

    /* Add the option to ignore the 'Open loading command' if the loading is already opened or 
         * the 'Close loading command' if the loading is already close.
         * This is achived by setting the passed parameter to directly to true or false */
    if (this.hasClass("carryon_loading") && objParam === true) {
        return;
    } else if (!this.hasClass("carryon_loading") && objParam === false) {
        return;
    };

    /* Otherwise implement the method regularly */
    var classToOverlap = (objParam && objParam.classToOverlap) ? objParam.classToOverlap : 'carryon_loading_layer_light';
    var imgElement = '<div class="loader">< div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" /></svg></div ></div >';
    if (objParam && objParam.hasImage === true) {
        if (objParam.imgSource) {
            imgElement = objParam.imgSource;
        } else {
            imgElement = '<div class="loader">< div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" /></svg></div ></div >';
        };
    };
    var minOverlapTime = (objParam && minOverlapTime) ? objParam.minOverlapTime : 800;

    if (!this.hasClass("carryon_loading")) {
        var layer = $('<div class="' + classToOverlap + '">' + imgElement + '</div>');
        layer.css({ "line-height": Math.round(this.outerHeight()) + "px", "font-size": Math.min(30, Math.round(this.outerHeight() / 2)) + "px" });
        layer.click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
        this.append(layer);
        this.addClass("carryon_loading");

        setTimeout(function () {
            if (self.hasClass("carryon_loading_toclose")) {
                self.removeClass("carryon_loading_toclose");
                self.removeClass("carryon_loading_closable");
                self.removeClass("carryon_loading");
                self.find("div." + classToOverlap).remove();
            } else {
                self.addClass("carryon_loading_closable");
            }
        }, minOverlapTime);
    } else {

        if (!this.hasClass("carryon_loading_closable")) {
            this.addClass("carryon_loading_toclose");
        } else {
            this.removeClass("carryon_loading_toclose");
            this.removeClass("carryon_loading_closable");
            this.removeClass("carryon_loading");
            this.find("div." + classToOverlap).remove();
        };
    }
    // finish with chaining
    return this;
};

String.prototype.format = function () {

    var args = arguments[0];
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return args[n];
    });
};
