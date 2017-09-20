
该插件需要jquery+font支持，文件中已经添加这两个依赖，只需要拉下来后就可以直接打开文件；


插件提供了以下方法：
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
