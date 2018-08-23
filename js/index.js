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
lis.each(function(index,ele){
    var state=states[index]
    $(ele).css('z-index',state.ZIndex).finish().animate(state,5000)
})
var count=0;
$('.prev').click(function(){
   
    count++;
    if(count>=states.length){
        count=0
    }else{
        count=count;
    }
    lis.each(function(index,ele){
        var num=index+count;
        if(num>states.length-1){
            num=num-states.length
        }else{
            num=num
        }
        var state=states[num]
        $(ele).css('z-index',state.ZIndex).finish().animate(state,1000)
         clearInterval(start)
        start=setInterval(move,2000)
    })
})
$('.next').click(function(){
    count--;
    if(count<0){
        count=states.length
    }
    lis.each(function(index,ele){
        var num=index+count;
        if(num>states.length-1){
            num=num-states.length
        }
        var state=states[num]
        $(ele).css('z-index',state.ZIndex).finish().animate(state,1000)
        clearInterval(start)
        start=setInterval(move,2000)
    })
})

function move(){
    count--;
    count=count<0?states.length:count
    lis.each(function(index,ele){
        var num=index+count
    num=num>states.length-1?num-states.length:num
    console.log(num);
    
    var state=states[num]
    $(ele).css('z-index',state.ZIndex).finish().animate(state,1000)
    })
}
var start=setInterval(move,2000)
