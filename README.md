
该插件需要jquery+font支持，文件中已经添加这两个依赖，只需要拉下来后就可以直接打开文件；


插件提供了以下方法：

            initstep: 1, {number} 进度条起始值，从1开始
          
            nextStep:function(){return true}, 进度条下一步事件，需返回值，若为true则继续进行流程，否则反之
            
            prevStep:function(){return true},进度条上一步事件，需返回值，若为true则继续进行流程，否则反之
            
            apply:true,流程完后点击下一步是否提交
            
            line:true,是否需要流程条中的横线
            
            onSubmit:function(){alert('ok')}进度完成事件
