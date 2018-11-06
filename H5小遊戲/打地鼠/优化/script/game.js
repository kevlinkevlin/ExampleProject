
/**
 * Created by zhouxinyu on 2017/7/9.
 */
window.onload = function () {
    //初始化画布
    class_game._init();
};
//全局变量
var dingshiqi = null;
var clicked = 0;           //已经打到的地鼠
var all = 0;               //所有的地鼠
var text1Id = "p1";        //文字的ID
var text2Id = "p2";        //文字的ID
var isClick = false;   //判断按钮点击事件
var time = 2000;       //地鼠出来间隔的时间
var diglett_num = 1;          //每次出来的地鼠数量
var userNum = 0;             //用户输入的数量
var userTime = 0;            //用户输入的时间
var input1Id = "input1";     //输入框的ID
var input2Id = "input2";     //输入框的ID
//打地鼠事件
function click_box(_this) {
    var id = _this.id;
    var class_name = _this.className;
    if(class_name === "diglett_up"){
        class_base._get(id).setAttribute("class","diglett_down");
        clicked ++;
        class_base.setText(text1Id,clicked);    //给他同步打到地鼠的数量
    }
}
//按钮点击事件
function click_button(_this) {
    if(isClick === false){
        class_game._draw_diglett();
        isClick = true;
    }else if(isClick === true){
        window.clearTimeout(dingshiqi);
        isClick = false;
    }
}
var class_game = {
    _column : 6, //行数
    _row : 7,   //列数
    _box_width : 100,  //画布格子宽度
    _box_height : 100,  //画布格子高度


    _init : function() {
        this._draw();       //绘制地图,得到一些必要的元素
        //this._draw_diglett();      //生成地鼠
    },


    //生成地图
    _draw : function(){
        console.log(this._map_height);
        //设置地图的宽和高
        var _map_width = this._row * this._box_width;
        var _map_height = this._column * this._box_height;
        class_base._get("game_panel").setAttribute("style","width:" + _map_width + "px; height:" + _map_height + "px;")
        //生成画布
        for (let i = 0 ; i < this._column ; i++){
            for (let j = 0 ; j < this._row ; j++){
                //我们先创建一个div元素
                var _div = class_base._create("div");
                //然后给他添加属性
                _div.setAttribute("class","box");
                //再给他设置id，为了以后方便查找
                _div.setAttribute("id",i*this._row+j);
                //然后添加布局和长宽
                _div.setAttribute("style" , "left:"+this._box_width*j+"px; top:"+this._box_height*i+"px; width:"+ this._box_width+ "px; height:" + this._box_height + "px;");
                //设置点击事件
                _div.setAttribute("onclick","click_box(this)");
                //然后将它添加到DOM树中
                class_base._get("game_panel").appendChild(_div);
            }
        }
        //得到按钮
        var _button = class_base._get("button");
        _button.setAttribute("onclick","click_button(this)");
    },

    //清除函数，否则地鼠不会消失
    _clear : function () {
        for(let i = 0 ; i < this._column ; i ++){
            for (let j = 0 ; j < this._row ; j ++){
                var _diglett_id = i*this._row+j;
                class_base._get(_diglett_id).setAttribute("class","box");
            }
        }
    },

    //生成地鼠,动态的生成随机数量的地鼠
    _draw_diglett : function () {
        this._clear();  //清除以前的地鼠
        if(parseInt(diglett_num)%1 === 0){
            all += parseInt(diglett_num);         //添加地鼠总和
        }
        //随机生成地鼠id
        for (let i = 0 ; i < diglett_num ; i++){
            var num = this._row*this._column;
            var _diglett_id = Math.floor(Math.random() * 1000)%num;
            console.log(_diglett_id);
            //生成地鼠
            class_base._get(_diglett_id).setAttribute("class","diglett_up");
        }
        //重置文本
        var text2 = class_base._get(text2Id);
        text2.innerHTML = all ;
        //用户控制
        userNum = class_base._get(input1Id).value;
        if(userNum !== 0){
            diglett_num = parseInt(userNum);
        }
        userTime = class_base._get(input2Id).value;
        if(userTime !== 0){
            time = userTime;
        }
        dingshiqi = setTimeout(function () {
            class_game._draw_diglett();
        },time);
    }
};
//同步类
var tongbu = {
    text1 : null,
    text2 : null
};


//封装一个类，为了简化代码。
var class_base = {
    //封装document.getElementById
    _get : function(_id){
        return document.getElementById(_id);
    },
    _create : function (_element) {
        return document.createElement(_element);
    },
    setText : function (id , text) {
        document.getElementById(id).innerHTML = text;
    }
};