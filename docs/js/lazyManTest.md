实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

以此类推。


```
	(function(window){
		var taskList=[];
	
		function LazyMan(){}
		LazyMan.prototype.sleep =function(num){
			subscribe("sleep",num);
			return this;
		}
		LazyMan.prototype.eat=function(args){
			subscribe("eat",args)
			return this;
		}
		LazyMan.prototype.sleepFirst=function(num){
			subscribe("sleepFirst",num)
			return this;
		}
		
		function subscribe(){
			var param={};
			var args=Array.prototype.slice.call(arguments);
			if(!args || !args.length){
				throw new Error("subscribe 参数不能为空！");
			}
			param.name=args[0];
			param.args=args.slice(1);
			if(param.name =='sleepFirst'){
				taskList.unshift(param);
			}else{
				taskList.push(param);
			}
		}
		
		function publish(){
			if(taskList.length>0){
				run(taskList.shift());
			}
		}
		
		function run(param){
			var args=param.args;
			switch (param.name){
				case "lazyMan" : lazyMan.call(null,args); break;
				case "sleepFirst" : sleepFirst.call(null,args);break;
				case "eat" : eat.call(null,args);break;
				case "sleep": sleep.call(null,args);break;
			}
				
		}
		
		function lazyManLog(str){
			console.log(str)
		}
		
		function lazyMan(args){
			lazyManLog("Hi This is "+args+"!")
			publish()
		}
		
		function eat(args){
			lazyManLog("Eat "+args);
			publish()
		}
		function sleep(time){
			setTimeout(function(){
				console.log("Wake up after "+time)
				publish()
			},time*1000);
		}
		
		function sleepFirst(time){
			setTimeout(function(){
				console.log("Wake up after "+time)
				publish()
			},time*1000);
		}
		
		window.LazyMan =function(str){
			subscribe("lazyMan",str)
			
			setTimeout(function(){
				publish();
			},0)
			return new LazyMan();
		}
	})(window)

```