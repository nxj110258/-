// 首先可以将整体封装成一个匿名的自运行函数
(function($){
    // 本函数每次调用只负责产生一个轮播图的功能。
    // 也就是说只会产生一个轮播图，所以这个函数的作用域只能分配给一个轮播图
    // 所以要求在调用本函数的时候，请务必将当前轮播图的标签传递过来
    var slide=function(ele,options){
        // 转为jQ标签对象
        var $ele=$(ele);
        // 默认的设置选项
        var setting={
            // 控制刚炸开的时间
            delay:1000,
            // 控制time(定时器)的时间(轮播速度)
            speed:2000,
        }

        // 对象合并
        // para1:boolean类型，指的是是否深度合并对象，默认值是false（一般不支持该参数为false）。若为true，且多个对象的某个同名属性也是对象，则该“属性对象”的属性也将进行合并
        // para2,para3,para4.....都是要合并的对象
        $.extend(true,setting,options)
        // 设置轮播样式
        // 规定每张图片处于的位置和状态
        var states=[
            {ZIndex:1,width:120,height:150,top:69,left:134,opacity:0.2},
            {ZIndex:2,width:130,height:170,top:59,left:0,opacity:0.5},
            {ZIndex:3,width:170,height:218,top:24,left:110,opacity:0.7},
            {ZIndex:4,width:224,height:288,top:0,left:263,opacity:1},
            {ZIndex:3,width:170,height:218,top:24,left:470,opacity:0.7},
            {ZIndex:2,width:130,height:170,top:59,left:620,opacity:0.5},
            {ZIndex:1,width:120,height:150,top:69,left:500,opacity:0.2},
        ];
        var lis=$(ele).find('li');
        function move(){
            lis.each(function(index,item){
                var state=states[index];
                $(item).css('z-index',state.ZIndex).finish().animate(state,setting.delay).find('img').css('opacity',state.opacity);
            })
        }
        move();
        // 下一张
        function next(){
            states.unshift(states.pop())
            move()
        }
         // 上一张
         function prev(){
            states.push(states.shift())
            move()
        }
        $(ele).find('.slide-prev').click(function(){
            prev()
        })
        $(ele).find('.slide-next').click(function(){
            next()
        })
        // 自动轮播
        var time=null
        function autoPlay(){
            time=setInterval(function(){
                next()
            },setting.speed)
        }
        autoPlay()
        // 停止轮播
        $ele.find('section').add(lis).hover(function
        (){
            clearInterval(time)
        },function(){
            autoPlay()
        })
    }
    $.fn.ZYSlide=function(options){
        $(this).each(function(i,ele){
            slide(ele,options)
        })
        // 支持链式调用
        return this
    }

})(jQuery)

// 用jQuery封装插件的集中写法：
    // 1.插件类写法：
    // $.fn.customFun=function(){
        // 自定义插件代码
    // }
    // 2.用法：
    // $('div').customFun()

    // 工具类的写法：  $.ajax 用法：
    // $.customFun=function(){
        // 自定义工具类的代码

    // }
    // 
