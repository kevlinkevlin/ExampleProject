/**
 * Created by zhouxinyu on 2017/7/11.
 * 生成蛇和食物
 */
window.onload = function () {
    class_game._init();
};

//游戏类
var class_game = {
    _column : 10,      //列数
    _row : 10,         //行数
    _box_width : 30,   //小方块的宽度
    _box_height : 30,  //小方块的高度
    _snake_x : null,
    _snake_y : null,
    _snake : [],        //蛇
    _food_x : null,       //食物
    _food_y : null,
    _map : [],          //地图

    _init : function () {
        //这里我们设置地图的大小
        var _map_width = this._column*this._box_width;
        var _map_height = this._row*this._box_height;
        class_base._get("game_panel").setAttribute("style","width:"+ _map_width + "px; height:" + _map_height + "px;");
        //这里我们生成地图的二维数组,并且初始化
        for (let i = 0 ; i < this._row ; i++){
            this._map[i] = [];
            for (let j = 0 ; j < this._column ; j++)
                this._map[i][j] = 0;     //将地图初始化为0
        }
        //我们生成蛇和食物的随机数，而且要保证随机数不能一样。
        do {
            this._snake_x = Math.floor(Math.random()*this._row);   //表示蛇的第一个部分，也就是蛇头
            this._snake_y = Math.floor(Math.random()*this._column);   //表示蛇的第一个部分，也就是蛇头
            this._food_x = Math.floor(Math.random()*this._row);      //同样的道理，我们生成食物
            this._food_y = Math.floor(Math.random()*this._column);      //同样的道理，我们生成食物
        }while((this._snake_x === this._food_x) && (this._snake_y === this._food_y));          //保证了蛇头和食物不在同一个点
        //然后我们在地图上标注，我们规定 1 为蛇 2 为食物 0 为地面
        this._map[this._snake_x][this._snake_y] = 1;
        this._map[this._food_x][this._food_y] = 2;
        for (let i = 0 ; i < this._row ; i++){
            for (let j = 0 ; j < this._column ; j++){
                var _div = class_base._create("div");    //创建一个div元素
                /*
                * 我们通过id判断该div元素是否是蛇或者食物
                * 我们规定左上角为原点，x轴向下，y轴向右
                * this._map[x][y]代表第x行第y列
                * */
                switch (this._map[i][j]) {
                    case 1 :
                        _div.setAttribute("class","snake");
                        break;
                    case 2 :
                        _div.setAttribute("class","food");
                        break;
                    case 0 :
                        _div.setAttribute("class","box");
                        break;
                }
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