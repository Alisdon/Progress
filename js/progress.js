/**
 * Created by Zer壹 on 2017/3/6.
 */

$(document).ready(function (){
        $('#progress').Progress();
    }
);


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
             * 进度条下方的文字说明
             * @type {Array}
             */
            title:['第一步','第二步','第三步','第四步','第五步','第六步','第七步','第八步','第九步','第十步','第十一步'],
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
         * @param p
         * @returns {*|HTMLElement}
         */

        var initProgress=function(p){
            var $content=$('<ul class="progress-content"><li class="step-list"><i class="fa fa-chevron-left step-prev"></i>'
                +'</li><li class="step-list"><i class="fa fa-chevron-right step-next"></i></li></ul>');

            for(var i=0;i<setting.title.length;i++){
                var steplist=$('<li class="step-list"></li>'),
                    stepdiv=$('<div><span class="list-num">' + (i + 1) + '</span></div>'),
                    stepp=$('<p>' + setting.title[i] + '</p>');

                if(i <= (setting.initstep-1)) steplist.addClass('active');

                if(setting.line&&i != (setting.title.length - 1)) stepdiv.find('.list-num').before('<span class="step-line"></span>');

                steplist.append(stepdiv,stepp);
                $content.find('li:last').before(steplist);
            }

            $content.find('.step-list').css({
                width:(setting.title.length+2)>$self.width()?1+'%':100/(setting.title.length+2)+'%'
            });

            $content.find('.step-next').on('click',function(e){
                if(setting.nextStep && typeof setting.nextStep=='function'){
                    if(setting.nextStep()){
                        var active=$self.find('.active');
                        if(active.next().find('.list-num').length==active.length){
                            active.next().addClass('active');
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
                var active=$self.find('.active');
                if(active.length>1){
                    if(active.prev().find('.list-num').length==active.length-1){
                        $(active[active.length-1]).removeClass('active');
                    }
                }
            });

            return $content;
        };

        return this.each(function(){
            $(this).append(initProgress());
        })
    }
})(jQuery);