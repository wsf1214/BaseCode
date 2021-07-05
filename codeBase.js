/*=================================1添加Cookie=======================================*/
///setCookie("姓名","张三",setCookieDate(3));
function setCookie(name,value,expires,path,domain,_secure){
	var cookieContent =encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(expires instanceof Date){
		cookieContent +=";expires="+expires;
	}
	else if(path){
		cookieContent +=";path="+path;
	}
	else if(domain){
		cookieContent +=";domain="+domain;
	}
	else if(_secure){
		cookieContent +=";secure"
	}
	document.cookie = cookieContent;
}
/*=================================2设定过期日期=======================================*/
function setCookieDate(daynum){	//daynum天后的日期
	var date = new Date();
	date.setDate(date.getDate()+daynum);
	return date;
}
/*=================================3获得指定Cookie=======================================*/
///getCookie("姓名");
function getCookie(name){

	var cookieName = encodeURIComponent(name);
	var cookieStart = document.cookie.indexOf(cookieName); //开始位置


	if(cookieStart>-1){//表示存在
		var cookieEnd = document.cookie.indexOf(";",cookieStart);//从cookieStart位置开始查找";"
		if(cookieEnd==-1){//最后位置没有";"
			cookieEnd = document.cookie.length;
		}
		return decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length+1,cookieEnd));
		//开始位置+name长度+"="的长度
	}
}
/*================================4统计字符串那种每个字母出现的次数==================================*/
/*
countStr("q,w,e,t,f,f,f,h,u,e,s,q")  
*/
function countStr(str){
	var strArr = str.split(",");//字符串转成数组
	for (var i = 97; i < 122; i++) {//26个小写字母
		var ch = String.fromCharCode(i);
		var sum = 0;
		for (var j in strArr) {
			if(ch==strArr[i]){
				sum++;
			}
		}
		if(sum!=0)
		document.write(ch+"出现的次数为:"+sum+"<br />");
	}
}
//countStr("q,w,e,r,d,f,f,d,s,h,y");
/*=================================5随机生成n个验证码 大小写字母和数字===============================*/
function veCode(n){
	var veCode=[];
	var rad = [];
	function add(a,b){
		for(var i = a;i<=b;i++){
			rad.push(String.fromCharCode(i));//ASCII码值转化成字符加到add数组中
		}
	}
	add(97,122);	//小写字母
	add(65,90);		//大写字母
	add(48,57);		//数字0-9
	function num(c,d){//c-d的随机数
		var e=d-c+1;
		return Math.floor(Math.random()*e+c);
	}
	for(var k = 1;k<=n;k++){
		veCode.push(rad[num(0,rad.length-1)]);//取rad中0-最后一位的随机元素至数组veCode；
	}
	return veCode.join("");//数组转化成字符串
}
/*=================================6获取class名=======================================*/
function getClassName(obj){
	if(obj.getAttribute("class")==null){//是IE
		return obj.getAttribute("className");
	}
	else{
		return obj.getAttribute("class");
	}
	//return (obj.getAttribute("class")!=null)?obj.getAttribute("class"):obj.getAttribute("className");
}
/*=================================7获取非行间样式=======================================*/
/*
 getStyle(div,"width");
 */
function getStyle(obj,styles){
	if(obj.currentStyle){//IE
		return obj.currentStyle[styles];
	}
	else{
		return getComputedStyle(obj)[styles];
	}
}
/*=================================8获得按下的功能键=======================================*/
function getKey(evt){
    var event = evt||window.event;
    var keys =[]; //保存我点下的key
    if(event.shiftKey){//如果我们按下了shift键，那这个event.shiftKey就会返回true
        keys.push("shift");
    }else if(event.altKey){
        keys.push("alt");
    }else if(event.ctrlKey){
        keys.push("ctrl");
    }
    return keys;
}
/*=================================9获得按下的任意非功能键=======================================*/
function getCode(evt){
    var event = evt||window.event;
    if((typeof event.charCode)=="number"){//非IE
        return event.charCode;
    }else{
        return event.keyCode;//IE显示undefined
    }
}//获得的值为键对应的ASCII码
/*window.onload = function(){
  document.onkeypress = function(evt){
       alert(getCode(evt));
   }
}
*/
/*=================================10缓冲运动 包括透明度=======================================*/
/*
 
startMove(div,{left:100,top:200});

*/
 function startMove(obj,json,fnEnd){
    if(obj.timer){
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function(){
        doMove(obj,json,fnEnd);
    },30);
 }
function doMove(obj,json,fnEnd){
    var iCur = 0;
    var attr = null;     var bStop = true;
    for(attr in json){
        if(attr=='opacity'){
            iCur = parseInt(100*parseFloat(getStyle(obj,attr)));
        }
        else{
            iCur = parseInt(getStyle(obj,attr));
        }
        var iSpeed = (json[attr] - iCur)/8;
        iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(json[attr]!=iCur){
            bStop = false;
        }
        if(attr=='opacity'){
            obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
            obj.style.opacity = (iCur + iSpeed)/100;
        }
        else{
            obj.style[attr] = iCur + iSpeed + 'px';
        }
    }
    if(bStop){
        clearInterval(obj.timer);
        obj.timer = null;
        if(fnEnd){
            fnEnd();
        }
    }
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj)[attr];
    }
}
/*=================================12 随机颜色=======================================*/
/*
var ball =document.getElementById("ball");
ball.style.background=randomColor();
*/
/*1*/function randomColor(){
	var colors="";
	var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
	for(var i = 0;i<6;i++){
		colors+=arr[radNum()];
	}
	return "#"+colors;
	function radNum(){
		return Math.floor(Math.random()*16);
	}
}
/*2*/function getRandomColor(){
	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}
// 1
/*=================================13 提示信息缓慢消失=======================================*/
/**
 * 使用示例：
 * var toast = new Toast();
 * toast.show("错误"); //默认显示3秒后消失
 * toast.show("错误", 5000);  //显示5秒后消失
 * toast.show();  //显示默认的提示信息
 */
function Toast() {
	this.msg = null;//显示的信息
	this.livetime = null;
	this.timer = null;
	this.isMoving = true;
	this._css = {//赋给逐渐消失的DIV的CSS属性 
		display: "block",
		position: "absolute", /* 固定位置O */
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		margin: "auto",
		width:"200px",
		height: "35px",
		border: "1px solid #666",   
        backgroundColor: "#333333",
		padding: "10px",
		textAlign: "center",
		color: "#EEEEEE",
		borderRadius: "5px",
		opacity: 0, /* 透明度，取值0.1~0.9 */
//		-webkit-transition: "opacity 0.5s ease-out;"
//		-moz-transition: "opacity 0.5s ease-out;" 
//		-ms-transition: "opacity 0.5s ease-out;" 
//		-o-transition: "opacity 0.5s ease-out;"
		transition: "opacity 0.5s ease-out" /* 透明度的过渡效果，0.5秒，以慢速结束 */
	};
	
	this.ele = document.createElement("div");//创建DIV
	
	//懒加载
	this.show = function(msg,time){
//		for(var attr in this._css){
//			this.ele.style[attr] = this._css[attr];			
//		}
		this.msg = msg || "默认提示";//有msg参数则使用  无则显示“默认提示”
		this.livetime = time || 3000;//有time参数则使用 无则默认为3000毫秒
		this.init();//调用init函数
		this.show = function(msg,time){
			//取消之前正在执行的动作
			clearTimeout(this.timer);
			this.isMoving = false;
			
			this.ele.innerHTML = msg || "默认提示";
			this.livetime = time || 3000;
			this.ele.style.display = "block";
			this.ele.style.opacity = 1;
			var that = this;
			
			this.timer = setTimeout(function(){
				that.isMoving = true;
				that.hide();//调用hide函数
			},this.livetime);
		}
	}
	
	this.hide = function(){
		this.ele.style.opacity = 0;
		var that = this;
		setTimeout(function(){
			if(that.isMoving) {
				that.ele.style.display = "none";
			}
		},500);
	}
	
	this.init = function(){
		for(var attr in this._css){
			this.ele.style[attr] = this._css[attr];			
		}
		this.ele.id = "toast";
		this.ele.innerHTML = this.msg;
		document.body.appendChild(this.ele);
		var that = this;
		setTimeout(function(){
			that.ele.style.opacity = 1;
			that.timer = setTimeout(function(){
				that.isMoving = true;
				that.hide();
			},that.livetime);
		}, 100);
	}
}
/*==============================14 AjaxXMLHttpRequest对象=====================================*/

//Ajax 能够无刷新的向服务器请求数据
//var xhr = new XMLHttpRequest();
//document.write(xhr);
/*try{
	//可能出现的异常代码
}catch(e){
	//当异常发生时，执行这里的代码
	//TODO handle the exception
}*/

//兼容  获得 XMLHttpRequest对象
function createXHR(){
	try{
		return new XMLHttpRequest();//Firefox opera safari chrome
	}catch(e){
		//TODO handle the exception
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			//TODO handle the exception
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				//TODO handle the exception
			}
		}
	}
}
//按钮点击获得服务器时间函数
function getTime(){
	var xhr = createXHR();
	//open 三个参数
	/*
	参数1、请求的方式  get post 大写
	参数2、请求文件的路径
	参数3、true 异步操作  false同步操作
	异步：按照一定的次序一次完成一个任务
	同步：同时运行，相互写作完成一个任务
	*/
	//xhr.open("GET","index.jsp",true);//访问服务端  IE访问时访问的是第一次的缓存 内容不会变 所有需要加随机的参数
	xhr.open("GET","index.jsp+random="+Math.random(),true);
	xhr.send();//发送数据
	//readyState 发生变化时 执行下面函数
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){//readyState  五个值 0 请求未初始化  1  服务器连接建立状态 2 3 4 
			document.getElementById("showtime").innerHTML=xhr.responseText;
		}
	}
}
/*==============================15 两个结构相同数组 合并=====================================*/
/*
var a=[
		{"name":111,"num":2},
		{"name":222,"num":2},
		{"name":333,"num":1}
	];
var b=[
	{"name":111,"num":1},
	{"name":111,"num":3},
	{"name":555,"num":2},
	{"name":666,"num":3}
];
var c=combineArr(a,b);
console.log(c)
 */
function combineArr(a,b){
	/*
	a b 为数组
	 */
	var aL=a.length,
		bL=b.length;
	for(var i=0;i<aL;i++){
		var item=a[i];
		for(var j=0;j<bL;j++){
			if(item.name==b[j].name){
				b[j].num=parseInt(b[j].num)+parseInt(a[i].num);
				break;
			}else if(item.name!=b[j].name&&j==bL-1){
				b.push(a[i]);
				break;
			}
		}
	}
	return b;
}
/*==============================16 伪数组转化为真正的数组=====================================*/
/*什么是伪数组
这里把符合以下条件的对象称为伪数组：
1， 具有length属性
2， 按索引方式存储数据
3， 不具有数组的push, pop等方法
如
1， function内的arguments。
2， 通过document.forms， Form.elements， Select.options， document.getElementsByName()，
document.getElementsByTagName()， childNodes / children 等方式获取的集合（ HTMLCollection， NodeList） 等。
3， 特殊写法的对象， 如
Js代码 收藏代码
var obj = {};
obj[0] = "一";
obj[1] = "二";
obj[2] = "三";
obj.length = 3;
它们不具有数组的一些方法如push, pop, shift, join等。 有时候需要将这些伪数组转成真正的数组， 这样可以使用push, pop等方法。
 */
/*
使用示例
var oDiv=document.getElementsByTagName("div");
console.log(oDiv instanceof Array);//false
var oDiv1=makeArray(oDiv);
console.log(oDiv1 instanceof Array);//true
 */
function makeArray(obj) {
	var rs = [],
		len = obj.length;
	try {
		rs = [].slice.call(obj, 0);
	}
	catch(e) { //for IE
		for(var i = 0; j = obj[i++];) {
			rs.push(j);
		}
	}
	return rs;
}









