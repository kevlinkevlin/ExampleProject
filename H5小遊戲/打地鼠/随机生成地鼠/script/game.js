
/**
 * Created by zhouxinyu on 2017/7/9.
 */
window.onload = function () {
    //初始化画布
    class_game._init();
};
var class_game = {
    _column : 6, //行数
    _row : 7,   //列数
    _box_width : 100,  //画布格子宽度
    _box_height : 100,  //画布格子高度


    _init : function() {
        this._draw();       //绘制地图
        this._draw_diglett();      //生成地鼠
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
                //然后将它添加到DOM树中
                class_base._get("game_panel").appendChild(_div);
            }
        }
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


    _draw_diglett : function () {
        this._clear();
        //随机生成地鼠id
        var num = this._row*this._column;
        var _diglett_id = Math.floor(Math.random() * 1000)%num;
        console.log(_diglett_id);
        //生成地鼠
        class_base._get(_diglett_id).setAttribute("class","diglett_up");
        setTimeout(function () {
            class_game._draw_diglett();
        },1000);
    }
};


//封装一个类，为了简化代码。
var class_base = {
    //封装document.getElementById
    _get : function(_id){
        return document.getElementById(_id);
    },
    _create : function (_element) {
        return document.createElement(_element);
    }
};