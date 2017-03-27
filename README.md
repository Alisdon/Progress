
该插件需要jquery+font支持，文件中已经添加这两个依赖，只需要拉下来后就可以直接打开文件；


插件提供了以下方法：

            initstep: 1,进度条起始值，从1开始

            title:['第一步','第二步','第三步'],流程下方的文字说明；

            nextStep:null,进度条下一步事件，需返回值，若为true则继续进行流程，否则反之

            prevStep:null,进度条上一步事件，需返回值，若为true则继续进行流程，否则反之

            apply:true,流程完后点击下一步是否提交

            line:true,是否需要流程条中的横线

            onSubmit:null进度完成事件，需要配合apply为true时使用；