$(function(){
	imgLocation();
	var dataImg = [];
	var page = 1;
	window.onscroll = function(){
		if(scrollSide()){
			$.ajax({
				url:'/getphotos',
				type:'GET',
				dataType:'json',
				data:{"page":page},
				success:function (data) {
					dataImg = data['photodata'];
					page += 1
				}
			});
			$.each(dataImg,function(index,value){
				var box = $("<div>").addClass("album-box").appendTo($("#photo"));
				var content = $("<div>").addClass("album-content").appendTo(box);
				$("<img>").attr("src","http://127.0.0.1:8008/uploads/"+$(value).attr("src")).appendTo(content);
				$("<p>").html($(value).attr("info")).appendTo(content)
			})
		}
		imgLocation()
	}
});

function scrollSide(){
	var box = $(".album-box");
	var lastBoxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
	var documentHeight = $(document).width();
	var scrollHeight = $(window).scrollTop();
	return (lastBoxHeight<scrollHeight+documentHeight)?true:false
}

function imgLocation(){
	var box = $(".album-box");
	var boxWidth = box.eq(0).width();
	var num = Math.floor($(".photo-album").width()/boxWidth);
	var boxArr = [];
	var numArr = [0,0,0];
	box.each(function(index,value){
		console.log(index+","+value);
		var boxHeight = box.eq(index).height();
		if(index<num){
			boxArr[index] = boxHeight
//			console.log(boxHeight)
		}else{
			var minBoxHeight = Math.min.apply(null,boxArr);
//			console.log(minBoxHeight)
			var minBoxIndex = $.inArray(minBoxHeight,boxArr);
			numArr[minBoxIndex] += 1;
//			console.log(minBoxIndex)
			$(value).css({
				"position":"absolute",
				"top":minBoxHeight + numArr[minBoxIndex] * 10,
				"left":box.eq(minBoxIndex).position().left
			});
			boxArr[minBoxIndex] = minBoxHeight+box.eq(index).height()
		}
	})
}

