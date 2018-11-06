/**
 * Created by zhouxinyu on 2017/7/11.
 * 生成蛇和食物
 */
window.onload = function () {
    class_game._init();
};

//获取键盘事件，控制贪吃蛇的移动方向
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]; //获取事件，这里是为了适应不同浏览器的兼容性
    var _key_value = e.which || e.keyCode;       //这里是获取点击事件的键值，也是兼容的写法
    /*
    * keyCode 37 = Left
    * keyCode 38 = Up
    * keyCode 39 = Right
    * keyCode 40 = Down
    * */
    switch (_key_value) {
        case 37 :
            class_game._direction === "right" ? class_game._direction = "right" : class_game._direction = "left" ;
            break;
        case 38 :
            class_game._direction === "down" ? class_game._direction = "down" : class_game._direction = "up" ;
            break;
        case 39 :
            class_game._direction === "left" ? class_game._direction = "left" : class_game._direction = "right" ;
            break;
        case 40 :
            class_game._direction === "up" ? class_game._direction = "up" : class_game._direction = "down" ;
            break;
    }
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
    _direction : null,

    _init : function () {
        this._draw();
        this._move();
    },

    _draw : function () {
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
        this._snake[0] = this._snake_x*this._column + this._snake_y;                    //我们得到蛇头的ID，方便下面的计算
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
    },

    //控制贪吃蛇移动的函数,该函数需要设置定时器
    _move : function () {
        /**
         * 我们只需要获取蛇头也就是_snake[0]的值。
         * 进过一次移动，就将移动后蛇头的位置添加到蛇的最前面就是_snake[0]，移动前蛇头的位置就到第二个了也就是_snake[1]。
         * 如果吃到了食物，就不用再处理蛇了。
         * 如果没有吃到食物，因为蛇移动了，所以我们需要把尾巴去了，就是_snake[snake.length] = 0
         */
        //获取移动前蛇头的位置，以方便判断移动后蛇头在哪
        var _snake_head = this._snake[0];
        //通过移动方向判断蛇头之后的位置
        switch (this._direction) {
            case "left" :
                _snake_head -- ;         //向左运动，头部减一就行
                break;
            case "right" :
                _snake_head ++ ;         //向右运动，头部加一就行
                break;
            case "up" :
                _snake_head -= this._column;  //向上运动，头部要减去一行所有的列
                break;
            case "down" :
                _snake_head += this._column;    //向下运动，头部加上一行所有的列
                break;
        }
        this._snake.unshift(_snake_head);      //将新的蛇头放到数组第一个
        class_base._get(_snake_head).setAttribute("class","snake");         //让新头显示出来
        //如果已经移动了的话，我们就每次让尾巴去掉就行
        if(this._direction !== null){
            class_base._get(this._snake[this._snake.length-1]).setAttribute("class","box");
        }
        this._snake.pop();                   //去掉最后一位
        //设置定时器
        setTimeout(function () {
            class_game._move();
        },200);
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