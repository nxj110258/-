// 规定每张图片处于的位置和状态
var states=[
    {ZIndex:1,width:120,height:150,top:69,left:134,opacity:0.2},
    {ZIndex:2,width:130,height:170,top:59,left:0,opacity:0.5},
    {ZIndex:3,width:170,height:218,top:24,left:110,opacity:0.7},
    {ZIndex:4,width:224,height:288,top:0,left:263,opacity:1},
    {ZIndex:3,width:170,height:218,top:24,left:470,opacity:0.7},
    {ZIndex:2,width:130,height:170,top:59,left:620,opacity:0.5},
    {ZIndex:1,width:120,height:150,top:69,left:500,opacity:0.2},
]
// 将状态 和位置赋值给li标签
var lis=$('#box li');
function move(){
    lis.each(function(index,ele){
        var state=states[index]
        $(ele).css('z-index',state.ZIndex).finish().animate(state,1000).find('img').css('opacity',state.opacity)
    })
}
move()

function next(){
    states.unshift(states.pop())
    move();
}
next()

// 下一张
    $('.next').click(function(){
    // 原理：把数组中的最后一个元素移动到数组中的第一个
    // states.unshift(states.pop())
    // move();
    next()
})
    $('.prev').click(function(){
    // 原理：把数组的第一个元素移动到最后一位
    states.push(states.shift())
    move()
})

// 自动轮播
var time=null
function autoPlay(){
    time=setInterval(function(){
        next()
    },3000)
}
autoPlay()

// 停止轮播
$('#box section').add('#box li').hover(function(){
    clearInterval(time)
},function(){
    autoPlay()
})

// 封装为插件
// 能够使得只要使用这个插件，就能被重复的使用效果，会产生什么问题？
    // 1.在插件中，最好不要使用id。原因：插件是为了能够被重复使用，也就是说在一个页面上可能会重复调用，会造成页面的冲突，并且id具有唯一性的特性。
    // 2.变量命名以及方法的命名：states、time、move(),用户在使用插件的时候，可能还会引入自己创建的文件，也有这样的命名，那么就会产生冲突
    // 3.标签class的值的问题：prev、next，这些class名太大众化了大多数编写者都会使用这样的含义，势必会造成冲突
    // 4.插件的文件命名问题：index.js、index.css，命名太大众化。比如：jQuery.Slide.js