/**
 * Created by zhouxinyu on 2017/7/11.
 */
window.onload = function () {
    class_game._init();
};

//游戏类
var class_game = {
    _column : 30,      //列数
    _row : 20,         //行数
    _box_width : 30,
    _box_height : 30,

    _init : function () {
        var _map_width = this._column*this._box_width;
        var _map_height = this._row*this._box_height;
        class_base._get("game_panel").setAttribute("style","width:"+ _map_width + "px; height:" + _map_height + "px;");
        for (let i = 0 ; i < this._row ; i++){
            for (let j = 0 ; j < this._column ; j++){
                var _div = class_base._create("div");
                _div.setAttribute("class","box");
                _div.setAttribute("id",this._column*i + j);
                _div.setAttribute("style","width:"+ this._box_width + "px; height:" + this._box_height + "px; left:"+j*this._box_width + "px; top:" + i*this._box_height+ "px;");
                class_base._get("game_panel").appendChild(_div);
            }
        }
    }
};

//封装类
var class_base = {
    _get : function (_id) {
        return document.getElementById(_id);
    },
    _create : function (_element) {
        return document.createElement(_element);
    }
};