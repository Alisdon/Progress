/**
 * Created by Alisdon on 2017/3/6.
 */
;(function($){
    /**
     * 进度条
     * @param opt
     * @returns {Progress}
     * @constructor
     */
    $.fn.Progress=function(opt){
        var defaults= {
            /**
             * 进度条起始值，从1开始
             * @type {number}
             */
            initstep: 1,
            /**
             * 进度条下一步事件，需返回值，若为true则继续进行流程，否则反之
             * @returns {boolean}
             */
            nextStep:function(){return true},
            /**
             * 进度条上一步事件，需返回值，若为true则继续进行流程，否则反之
             * @returns {boolean}
             */
            prevStep:function(){return true},
            /**
             * 流程完后点击下一步是否提交
             * @type {boolean}
             */
            apply:true,
            /**
             * 是否需要流程条中的横线
             * @type {boolean}
             */
            line:true,
            /**
             * 进度完成事件
             * @returns {boolean}
             */
            onSubmit:function(){alert('ok')}
        };
        var $self=$(this);
        var setting= $.extend({},defaults,opt);

        /**
         * 初始化进度条
         * @returns {*|HTMLElement}
         */

        var initProgress=function(){
            var stepChild=$self.find('.stepchild'),
                $content=$('<ul class="progress-content">'
                +'<li class="step-list"><i class="fa fa-chevron-left step-prev"></i></li>'
                +'<li class="step-list"><i class="fa fa-chevron-right step-next"></i></li>'
                +'</ul>');

            for(var i=0;i<stepChild.length;i++){
                var steplist=$('<li class="step-list"></li>'),
                    stepContainer=$('<div><span class="list-num">' + (i + 1) + '</span></div>'),
                    stepDes=stepChild.eq(i).attr('stepDes'),
                    stepp=$('<p>' + stepDes + '</p>');

                if(i <= (setting.initstep-1)) steplist.addClass('active');
                if(setting.line&&i != (stepChild.length - 1)) stepContainer.find('.list-num').before('<span class="step-line"></span>');

                steplist.append(stepContainer,stepp);
                $content.find('li:last').before(steplist);
            }

            $content.find('.step-list').css({
                width:100/(stepChild.length+2)+'%'
            });

            $content.find('.step-next').on('click',function(e){
                if(setting.nextStep && typeof setting.nextStep=='function'){
                    if(setting.nextStep()){
                        var active=$self.find('.step-list.active');
                        if(active.next().find('.list-num').length==active.length){
                            active.next().addClass('active');
                            $self.find('.stepchild').removeClass('active');
                            $self.find('.stepchild').eq(active.length).addClass('active');
                        }else{
                            if(setting.apply){
                                if(setting.onSubmit && typeof setting.onSubmit=='function'){
                                    if(confirm('是否完成进度？')){
                                        setting.onSubmit();
                                    }
                                }else{
                                    alert('提供的方法有误！');
                                }
                            }
                        }
                    }
                }

                e.stopPropagation();
            });

            $content.find('.step-prev').on('click',function(param){
                if(setting.prevStep && typeof setting.prevStep=='function'){
                    if(!setting.prevStep()){
                        return;
                    }
                }
                var active=$self.find('.step-list.active');
                if(active.length>1){
                    $self.find('.stepchild').removeClass('active');
                    if(active.prev().find('.list-num').length==active.length-1){
                        $(active[active.length-1]).removeClass('active');
                        $self.find('.stepchild').eq(active.length-2).addClass('active');
                    }
                }
            });

            return $content;
        };

        return this.each(function(){
            $(this).find('div:first').before(initProgress());
        })
    }
})(jQuery);