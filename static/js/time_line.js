$(function(){
	showhideyearlist();
})

function showhideyearlist(){
	var event_start = $(".event-list > h3")
	event_start.on("click",function(){
		var event_obj = $(this).parent().children("li")
		event_obj.each(function(index,value){
			event_obj.eq(index).slideToggle()
		})
	})
}
