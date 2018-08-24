$(function(){
	changeWindowSize();
	changeCurNav();
	headNavRoate();
	headeImgRoate();
	showHideNav();
	CarouselImg();
	replyComment();
	replyReply();
	//barrageEffect();
})

function changeWindowSize(){
	var primitiveWindowWidth = 1366;
	var primitiveContentMargin = 150;
	
	changeContentMargin(primitiveContentMargin,primitiveWindowWidth);
	
	addHeaderMin()
	
	fadeInoutSearch();

	changeNavLeftPosition();
	
	changePhotoFrameHeight();
	
	//setmaxContentHeight();
	
	setCommentTarget();
	

	
	$(window).resize(function(){
		changeContentMargin(primitiveContentMargin,primitiveWindowWidth);
		
		addHeaderMin()
		
		fadeInoutSearch();
		
		changeNavLeftPosition();
		
		changePhotoFrameHeight();
		
		//setmaxContentHeight();
		
		setCommentTarget();
		

	})
}

function changeContentMargin(x,y){
	var windowWidth = $(window).width();
	var yushiContent = $(".yushi .yushi-content");
	if(windowWidth<992){
		yushiContent.removeClass(".yushi .yushi-content").css({
			"margin":"0"
		})
	}else{
		var realContentMar =  Math.floor(x * (1-(y-windowWidth)/374));	
		yushiContent.removeClass(".yushi .yushi-content").css({
			"margin-left":realContentMar,
			"margin-right":realContentMar,
			"margin-top":"0px",
			"margin-bottom":"0px"
		})
	}
}

function changeCurNav(){
	var url = window.location.href
	var urlattr = url.split("/")
	if(urlattr[3]=='article_list'){
		var curindex = urlattr[4];
		var curNav = $(".yushi-nav li");
		var headerCurNav = $(".header-navbar li");
		curNav.eq(curindex).addClass("current-nav").siblings().removeClass("current-nav");
		headerCurNav.eq(curindex).addClass("header-current-nav").siblings().removeClass("header-current-nav");
	}
	// var curNav = $(".yushi-nav li a");
	// var headerCurNav = $(".header-navbar li")
	// curNav.on("click",function(){
	// 	if ($(this).parent().hasClass("current-nav")) {
	// 		return false;
	// 	} else{
	// 		$(this).parent().addClass("current-nav").siblings().removeClass("current-nav");
	// 		headerCurNav.eq($(this).parent().index()).addClass("header-current-nav").siblings().removeClass("header-current-nav");
	// 	}
	// })
	// headerCurNav.on("click",function(){
	// 	if ($(this).hasClass("header-current-nav")) {
	// 		return false;
	// 	} else{
	// 		$(this).addClass("header-current-nav").siblings().removeClass("header-current-nav");
	// 		curNav.parent().eq($(this).index()).addClass("current-nav").siblings().removeClass("current-nav");
	// 	}
	// })
}

function fadeInoutSearch(){
	var windowWidth = $(window).width();
	var searchBox = $(".serarch-box");
	if (windowWidth<850) {
		searchBox.fadeOut("fast");
	} else{
		searchBox.fadeIn("fast");
	}
}

function headNavRoate(){
	var nav = $(".header-nav")
	nav.on("mouseenter",function(){
		nav.addClass("header-nav-roate")
	})
	nav.on("mouseleave",function(){
		nav.removeClass("header-nav-roate")
	})
}

function changeNavLeftPosition(){
	var windowWidth = $(window).width()
	if (windowWidth < 768) {
		var nav = $(".header-nav");
		left = nav.offset().left - 150;
		var navbar = $(".header-navbar")
		navbar.css({
			"left":left
		})
	} else{
			return false;
		}
}

function showHideNav(){
	var nav = $(".header-nav");
	var navbar = $(".header-navbar");
	nav.on("click",function(e){
		e.stopPropagation()
		navbar.slideToggle("normal",function(){
			$(window).resize(function(){
				navbar.slideUp("fast")
			})
			$(document).click(function(e){
				if ($(this).hasClass("header-nav")) {
					return false;
				} else{
					navbar.slideUp("normal");
				}
			})
		});
	});
}

function addHeaderMin(){
	var windowWidth = $(window).width();
	var header = $(".header");
	if (windowWidth < 750) {
		if (header.hasClass("header-min")) {
			return false;
		} else{
			header.addClass("header-min");
		}
	} else{
		if (header.hasClass("header-min")) {
			header.removeClass("header-min");
		} else{
			return false;
		}
	}
}

function changePhotoFrameHeight(){
	if($("body").width() > 768){
		var phoFrame = $(".photo-frame");
		var innerFrame = $(".inner-frame");
		var imgFrame = $(".photo-frame .inner-frame img");
		var frameHeight = phoFrame.innerWidth() * 0.5;
		var inerWidth = innerFrame.width();
		var inerHeight = frameHeight-20-20;
		var imgWidth = inerWidth - 10 * 2;
		var imgHeight = inerHeight - 10 * 2;
		phoFrame.css({
			"height":frameHeight
		})
		innerFrame.css({
			"height":inerHeight
		})
		imgFrame.css({
			"width":inerWidth,
			"height":imgHeight
		})
	}
}


function CarouselImg(){
	var carouselImg = $("#content-carousel"); 
	carouselImg.carousel('cycle');
	carouselImg.carousel('prev');
	carouselImg.carousel('next');
}

function setmaxContentHeight(){
	var maxHeight = $(".article-main > .article-img").height();
	var titleHeight = $(".article-main > .article-content > .title").outerHeight();
	var textobj = $(".article-main > .article-content > .text > .abstract")
	var textHeight = maxHeight - titleHeight -20 -40 ;
	var realHeight = Math.floor(textHeight / 18) *18 ;
	textobj.css({
		"height":realHeight
	})
}

function headeImgRoate(){
	var nav = $(".new-comment-list > ul > li")
	nav.on("mouseenter",function(){
		$(this).find("img").addClass("header-nav-roate")
	})
	nav.on("mouseleave",function(){
		$(this).find("img").removeClass("header-nav-roate")
	})
}

// 文章显示页面
function setCommentTarget(){
	var co = $("#comment");
	var cWidth = $(".column-comment").width();
	co.css({
		"width":cWidth
	})
}

function replyComment(){
	var _replystr = '<form class="reply-form form-group" action="" method="post">'+
					'<div class="column-comment">'+
						'<p>回复评论</p>'+
					'</div>'+ 
					'<div class="comment-input">'+
						'<input type="text" name="" id="" value="" placeholder="姓名（必填）"/>'+
						'<input type="text" name="" id="" value="" placeholder="邮箱（必填）"/>'+
						'<textarea id="comment" class="form-control" name="" rows="" cols="" placeholder="说点什么……"></textarea>'+
						'<input type="submit" class="reply-btn" value="提交回复"/>'+
					'</div>'+
				'</form>'
	var reply = $(".c-reply")
	reply.on("click",function(){
		var curr = $(this).parents(".comment-content");
		if (curr.children("form").hasClass("reply-form")) {
			curr.children("form").slideToggle(function(){
				$(this).remove("form")
			})
		} else{
			curr.append(_replystr).animate(function(){
				return false;
			},function(){
				curr.children("form").slideToggle()
			})
		}
	})
}

function replyReply(){
	var _replystr = '<form class="reply-form form-group" action="" method="post">'+
					'<div class="column-comment">'+
						'<p>回复评论</p>'+
					'</div>'+ 
					'<div class="comment-input">'+
						'<input type="text" name="" id="" value="" placeholder="姓名（必填）"/>'+
						'<input type="text" name="" id="" value="" placeholder="邮箱（必填）"/>'+
						'<textarea id="comment" class="form-control" name="" rows="" cols="" placeholder="说点什么……"></textarea>'+
						'<input type="submit" class="reply-btn" value="提交回复"/>'+
					'</div>'+
				'</form>'
	var reply = $(".deep-reply")
	reply.on("click",function(){
		var cuur = $(this).parents(".reply-content")
		if (cuur.children("form").hasClass("reply-form")) {
			cuur.children("form").slideToggle(function(){
				$(this).remove("form")
			})
		} else{
			cuur.append(_replystr).animate(function(){
				return false;
			},function(){
				cuur.children("form").slideToggle();
			})
		}
	})
}

// 弹幕效果   暂不使用
function barrageEffect(){
	var box = $(".blackboard");
	var message = ['python','HTML5','CSS3','Django','自动化运维','前端','后端'];
	var jqueryDom = ''
	for (j = 0,len = message.length;j < len ; j++) {
		jqueryDom = createScreenbullet(message[j])
		addInterval(jqueryDom)
		//sleep(200)
	}
}

function createScreenbullet(text) {
    var jqueryDom = $("<div class='bullet'>" + text + "</div>");
    var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var fontSize = Math.floor((Math.random()+0.2) * 24) + "px";
    var left = $(".blackboard").width() -30;
    var top = Math.floor(Math.random() * 190) + "px";
    top = parseInt(top) > 154 ? "154px" : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "left": left,
        "top": top
    });
    $(".blackboard").append(jqueryDom);
    return jqueryDom;
}

function addInterval(jqueryDom) {
    var left = jqueryDom.offset().left - $(".blackboard").offset().left;
    var timer = setInterval(function () {
        left--;
        jqueryDom.css("left", left + "px");
        if (jqueryDom.offset().left + jqueryDom.width() - 80< $(".blackboard").offset().left) {
            jqueryDom.remove();
            clearInterval(timer);
        }
    }, 10);
}

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}