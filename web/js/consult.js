!function(e){e.fn.extend({simulate:function(t,n){return this.each(function(){var i=e.extend({},e.simulate.defaults,n||{});new e.simulate(this,t,i)})}}),e.simulate=function(e,t,n){this.target=e,this.options=n,/^drag$/.test(t)?this[t].apply(this,[this.target,n]):this.simulateEvent(e,t,n)},e.extend(e.simulate.prototype,{simulateEvent:function(e,t,n){var i=this.createEvent(t,n);return this.dispatchEvent(e,t,i,n),i},createEvent:function(e,t){return/^mouse(over|out|down|up|move)|(dbl)?click$/.test(e)?this.mouseEvent(e,t):/^key(up|down|press)$/.test(e)?this.keyboardEvent(e,t):void 0},mouseEvent:function(t,n){var i,o=e.extend({bubbles:!0,cancelable:"mousemove"!=t,view:window,detail:0,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:void 0},n);e(o.relatedTarget)[0];return e.isFunction(document.createEvent)?(i=document.createEvent("MouseEvents"),i.initMouseEvent(t,o.bubbles,o.cancelable,o.view,o.detail,o.screenX,o.screenY,o.clientX,o.clientY,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.button,o.relatedTarget||document.body.parentNode)):document.createEventObject&&(i=document.createEventObject(),e.extend(i,o),i.button={0:1,1:4,2:2}[i.button]||i.button),i},keyboardEvent:function(t,n){var i,o=e.extend({bubbles:!0,cancelable:!0,view:window,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:0,charCode:0},n);if(e.isFunction(document.createEvent))try{i=document.createEvent("KeyEvents"),i.initKeyEvent(t,o.bubbles,o.cancelable,o.view,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.keyCode,o.charCode)}catch(a){i=document.createEvent("Events"),i.initEvent(t,o.bubbles,o.cancelable),e.extend(i,{view:o.view,ctrlKey:o.ctrlKey,altKey:o.altKey,shiftKey:o.shiftKey,metaKey:o.metaKey,keyCode:o.keyCode,charCode:o.charCode})}else document.createEventObject&&(i=document.createEventObject(),e.extend(i,o));return void 0!==e.browser&&(e.browser.msie||e.browser.opera)&&(i.keyCode=o.charCode>0?o.charCode:o.keyCode,i.charCode=void 0),i},dispatchEvent:function(e,t,n){return e.dispatchEvent?e.dispatchEvent(n):e.fireEvent&&e.fireEvent("on"+t,n),n},drag:function(e){var t=this.findCenter(this.target),n=this.options,i=Math.floor(t.x),o=Math.floor(t.y),a=n.dx||0,c=n.dy||0,s=this.target,r={clientX:i,clientY:o};this.simulateEvent(s,"mousedown",r),r={clientX:i+1,clientY:o+1},this.simulateEvent(document,"mousemove",r),r={clientX:i+a,clientY:o+c},this.simulateEvent(document,"mousemove",r),this.simulateEvent(document,"mousemove",r),this.simulateEvent(s,"mouseup",r)},findCenter:function(t){var t=e(this.target),n=t.offset();return{x:n.left+t.outerWidth()/2,y:n.top+t.outerHeight()/2}}}),e.extend(e.simulate,{defaults:{speed:"sync"},VK_TAB:9,VK_ENTER:13,VK_ESC:27,VK_PGUP:33,VK_PGDN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40})}(jQuery);

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function() {

	$('.custom-select').focusout(function(){    
        $(this).closest('.custom-select-wrapper').removeClass('focus');
    });

	if($('#birthday').length > 0 ){
        $('#birthday').datepicker({
            minDate: new Date(1930,1-1,1), maxDate:'-13Y',
            changeMonth: true,
            changeYear: true,
            hideIfNoPrevNext: true,
            yearRange: '-77:-13',
            defaultDate: '01/01/1930',
            onSelect: function(dateText, inst) {
                console.log(dateText);
                this.setAttribute('value', this.value);
                $("input[value='']:not(:checkbox,:button):visible:empty:first").focus(); 
            }
        });
    }

    $('.gender select').change(function(){

        if($(this).val() !="0") {
            
            $('.gender').find('.custom-select-display').css({'color' : '#000'});

            if($("input[value='']:not(:checkbox,:button):visible:empty:first").length > 0) {
                $("input[value='']:not(:checkbox,:button):visible:empty:first").focus();
            } else {
                $(".wing-form select").each(function(){
                    var  lengthEmpty = $(this).val();
                    
                    if(parseInt(lengthEmpty) == 0) {
                        $(this).simulate('mousedown');
                        $(this).closest('.custom-select-wrapper').addClass('focus');
                        console.log($(this));
                        return false; 
                    }
                });
            }

        } else {
            $('.gender').find('.custom-select-display').css({'color' : '#8d8d8d'});
        }
    });

    $('#consult-form').submit(function(e){
    	e.preventDefault();

    	$('.input-wrap:not(.no-error)').addClass('error');
        isvalidate = false;


        if( IsEmail($('#account-email').val() )) {
            $('#account-email').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( !$('#last-name').val() == '') {
            $('#last-name').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( !$('#first-name').val() == '') {
            $('#first-name').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( !$('#account-email').val() == '') {
            $('#account-email').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( $('#contact-num').val() != '' && $('#contact-num').val().length >= 11 ){
            $('#contact-num').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( $('#consult-message').val() != ''){
            $('#consult-message').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( IsEmail($('#account-email').val()) && !$('#last-name').val() == '' && $('#contact-num').val() != '' && $('#contact-num').val().length >= 11 && !$('#first-name').val() == '' && $('#consult-message').val() != '' ) {

            return false;
        } else {
            e.preventDefault();

            
        }
    });
});