// переделанный скрипт JwgSlider.js
  var Slider = function(){ //types = [tabs, arrows, both]
    var jsS = this;
    
    this.move = function(where){          
      var next, left;

      if(typeof(where) != "number"){ //arrows
        if(where == "right") next = this.index += 1;
        else next = this.index -= 1;
      } else { // tabbed nav
        next = where;
        if(next > (this.index + 1) || next < (this.index - 1)){ //check if next slide is more than 1 slides across
          this.skipToSlide(next);
            return;
        }
      }

      if(next == this.slides.length || next == -1){
        if(next == -1) next = this.slides.length - 1;
        else next = 0;

        this.loopSlide(next)
      } else {                      
        left = "-"+(next * 100)+"%";  
        this.setIndex(next);
        this.x.stop(true,true).animate({'left': left}, this.speed, function(){
            jsS.left = left;          
        });      
      }
      
    } 

    this.skipToSlide = function(ind){
      var left;      
      if(ind > (this.index + 1)){ //sliding right
        this.current.nextUntil(this.slides.eq(ind)).css('display','none');
        left = "-"+ ((this.index + 1)*100) + "%";
        this.setIndex(ind);                
        this.x.stop(true,true).animate({'left':left},this.speed,function(){
          left = "-"+ (ind * 100) + "%";                      
          jsS.x.css('left', left)
          jsS.slides.css('display','block');
        });          
      } else { //sliding left
        this.current.prevUntil(this.slides.eq(ind)).css('display','none');
        left = "-"+ ((ind + 1)*100) + "%";          
        this.x.css('left',left);
        left = "-"+ (ind *100) + "%";   
        this.setIndex(ind);        
        this.x.stop(true,true).animate({'left':left},this.speed,function(){
          jsS.slides.css('display','block');
        });
      }
    }
    
    this.loopSlide = function(end){
      var dupe,left,dupeLeft,remove;
      if(end == this.slides.length - 1){
        left = end * 100;
        dupeLeft = (end-1) * 100;        
        dupe = this.slides.eq(0);
        dupe.css('display','none').clone().appendTo(this.x).css('display','block');
        remove = jsS.x.find(".slider__item:last");
      }
      else { 
        left = 0;
        dupeLeft = 100;        
        dupe = this.slides.eq(this.slides.length - 1);
        dupe.css('display','none').clone().prependTo(this.x).css('display','block');
        remove = jsS.x.find(".slider__item:first");
      }

      this.x.css({'left': "-"+left+"%"});
      this.setIndex(end); 
      this.x.stop(true,true).animate({'left': "-"+dupeLeft+"%"}, this.speed, function(){
        remove.remove();
        dupe.css('display','block');
        jsS.x.css({'left': "-"+left+"%"});
        jsS.left = left;                                  
      });      


    }    
    
    this.setIndex = function(ind){
      this.index = ind;
        this.tabs.removeClass('current').eq(ind).addClass('current');
        this.slides.removeClass('current').eq(ind).addClass('current');
        this.info.removeClass('current').eq(ind).addClass('current');
        this.current = this.slides.eq(ind);
    };
    
    this.init = function(sldr, type, speed){
      this.slider = sldr;
      this.type = type;
      this.x = this.slider.find('.slider__items');
      this.slides = this.x.children('.slider__item');
      this.arrows = this.slider.find('.arrow_navigation > div');
      this.tabs = this.slider.find('.slider__nav ul li');
      this.info = this.slider.parent().find('.slider__info ul li');
      this.index = 0;
      this.speed = speed;
      this.left = "0%";
      this.current = this.slides.eq(0);      
      this.setWidths();
      this.addActions();
      this.setCurrent();
    }

    this.setCurrent = function(){
      this.slides.eq(0).addClass('current');
      this.tabs.eq(0).addClass('current');
      this.info.eq(0).addClass('current');
    }
    
    this.addActions = function(){
      var arrowNav = this.slider.find('.arrow_navigation');
      
      if(this.type == "arrows" || this.type == "both"){ 
        this.arrows.click(function(){
          var dir = $(this).attr("class");
          if(!jsS.x.is(":animated"))
            jsS.move(dir);
        });
      }

      if(this.type == "tabs" || this.type == "both"){
        this.tabs.click(function(){
          var ind = $(this).index();
          if(!jsS.x.is(":animated"))
              jsS.move(ind);
        });
      }

      this.slider.on({
        'mouseover' : function(){arrowNav.addClass('on');}, 
        'mouseleave': function(){arrowNav.removeClass('on');}
      });      
    }

    
    this.setWidths = function(){
      var width = (100 / this.slides.length) + "%";
      var xWidth = (this.slides.length * 100)+"%";
      this.slides.css('width', width);
      this.x.css('width', xWidth)           
    }

  }

  $.fn.Slider = function(type, speed){ // type : tabs, arrows, both
    return this.each(function(){
      var slider = $(this);
      (new Slider).init(slider, type, speed);
    });
  }