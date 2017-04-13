
不懂得知识点：
promise，lodash（学习），react，vue2.0
iview中notice组件实现的原理
CSS3动画
去设计一个编译器
mobx
momentjs
express
redux
bluebird
async和await
webpack plugin和loader的区别
js事件队列理解（Event Loop）
express中间件开发


模糊的知识点：
变量提升
backbone实现mvc的原理
jQuery的实现原理
设计模式：工厂，构造器，观察者模式
ES6的新特性：模板字符串，
原型，原型链，闭包
requirejs的并行加载，预执行，seajs的懒执行
对象的继承，重载和多态
webpack的热更新配置，gulp的watch配置
vue的实现vm动态绑定的原理
http和https的区别：（端口号不同）
node  
transform和transtion
base64,utf-8编码解码
冒泡和捕获，事件代理
session和cookie的区别
网络安全和XSS攻击:
	SQL注入：前端执行url查询，后端拿到url参数后执行了数据库查询，如果后端没过滤就执行语句，攻击者就可以随意操控数据库。
			前后端对参数都进行过滤。
	XSS攻击：标签内容需要过滤、转义
	将cookie设为http only，不允许用户随意修改。实现session标记。HTTP引用头检查。对请求的所有内容进行可靠验证，包括url，查询关键字，HTTP头，POST数据。仅支持符合预期的内容，其他一概过滤。
	img、script、iframe标签都是不受同源策略限制的


新学的知识点：
- 变量和函数声明的提升
- slide实现的原理：transform和tanslateZ(100%),transtion
- 移动端1px问题（设置一个height：1px的div）
- vue实现双向绑定：object.defineProperty给data中的数据设置getter和setter
- 图片实现懒加载:判断滚轮滚动的距离，和目标元素的offset.top比较，然后将data-src中的内容赋值到src中
- 图片懒加载原理：判断轮播的索引，然后将data-src中的内容赋值到src中
- arguments.callee的妙用：用于函数表达式中的递归
- 移动端（tap）点透问题：因为touchstart早于touchend早于click，touch事件结束也会触发下面元素的click事件。
- 移动端解决点击延迟的问题（fastclick）：解决方法：使用最新的zepto，阻止事件源元素的默认preventDefault()(不触发click事件),fastclick.js
- 字符串第一位不包含某个字符：!~['2', '6'].indexOf(new String(str)[0])
- 对象复制：1):var newObject=JSON.parse(JSON.stringify(oldObject));
- 数组不要用for in：for in循环内部使用getOwnpropertyNames获取可轮询的属性，数据中有一些可enumable属性会被循环出来，如：array.prototype的自定义事件，都会被循环出来。所有有对原型扩展的对象使用for in都应该在其中使用hasOwnproperty判断一下。
- new对象的过程
- webpack import&require css的坑：import命令会有提升效果，会提升到模块的头部，首先执行。
- instanceof运算符可以用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上。如a instanceof A ,判断A.prototype是否在a的__proto__上。
	但这不能准确判断一些值的类型，比较稳妥的办法是使用Object.prototype.toString.call(arr) ==="[object Array]";
- 传入参数作为key来组成对象。利用JSON.parse('{"'+key+'" : "'+value+'"}');
- git版本管理的问题
- svn为什么大家都不用切换分支的方法，因为svn切换分支太慢了。

	
	
- 前端资源缓存：设置 Cache-Control里的max-age，使页面资源请求的返回码为304，让浏览器直接使用本地缓存
	参考http://web.jobbole.com/90167/
	Cache-control: max-age=5
	表示当访问此网页后的5秒内再次访问不会去服务器

	
- fetch 中params中的credentials属性表示cookies是否能跨域得到。有三个值"omit"（默认）,"same-origin"以及"include"。
	参考https://www.w3ctech.com/topic/854
react:
1):react createClass，创建的组件只能有一个根节点，这个根节点可以有任意层的子节点。
2):不要直接修改state,而应该使用setState（应该是用于触发组件lifecycle hook）。唯一一个可以直接修改state的地方是constructor。
3):循环list时需要给每个子项加个string类型的key，如ul下的li，react会根据key来确认items have changed or add or removed。不给的话会报警告
4):使用shouldComponentUpdate判断组件是否应该更新，如果应该，再对比新旧Dom树来判断是够需要更新dom树
5):pureComponent的使用：http://www.open-open.com/lib/view/1484466792204,注意state对象的使用
6):immutable优化react的re-render操作



日常错误集合：
1) 打包的文件含一个common的方法，该方法不规范导致页面执行两次。
2) Jquery实例有index方法可以获取当前元素的下标，如$("ul li").index(this);


（module定义）[https://webpack.js.org/concepts/modules/]
（js事件队列与执行栈）http://www.ruanyifeng.com/blog/2014/10/event-loop.html
(全站HTTPS来了)[http://mp.weixin.qq.com/s?__biz=MzA3NTYzODYzMg==&mid=402615812&idx=1&sn=b6dae639119bb66e7025321254b8d973&scene=1&srcid=122439MA3l7gRwfjgNOB76pA#rd]
(魅族SF博客)[https://segmentfault.com/blog/meizu]

http://172.31.3.94:6601/category/product/detail/279600049?searchRedirect=1

