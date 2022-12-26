$(document).ready(function(){
	
		var mainUrl = 'https://www.yourURL.com/'
		var am = '-am';
		var pm = '-pm';
	
		//reset the search filters
	
		$('#reset_search').on('click',function(){
			$('.combine').each(function(e){
				$(this).val('');
			});
			$('.event').show();
			$('.month').show();
			
			$('.accordion_content').hide();
		});
	
		//combine the results into one selector
	
		$('.combine').on('change',function(){
			//
			var month_option = $('#month').val();
			var sector_option = $('#sector').val();
			var vendor_option = $('#vendor').val();
			var theme_option = $('#theme').val();
			
			$('.event').hide();
			$('.month').hide();
			
			// create an empty variable, so we can add parts to it
			var selector = "";
			
			// when checking a variable to see if it has any matching values or not, treat it as a boolean. 
			// it will either be true or false - if it's true then the value will be added to the 'selector' variable
			if (month_option){
				selector += "[data-month*=" +  month_option + "]";
			}
			// when checking a variable to see if it has any matching values or not, treat it as a boolean. 
			// it will either be true or false - if it's true then the value will be added to the 'selector' variable
			if (sector_option){
				selector += "[data-sector*=" +  sector_option + "]";
			}
			// when checking a variable to see if it has any matching values or not, treat it as a boolean. 
			// it will either be true or false - if it's true then the value will be added to the 'selector' variable
			if (vendor_option){
				selector += "[data-vendor*=" +  vendor_option + "]";
			}
			// when checking a variable to see if it has any matching values or not, treat it as a boolean. 
			// it will either be true or false - if it's true then the value will be added to the 'selector' variable
			if (theme_option){
				selector += "[data-theme*=" +  theme_option + "]";
			}
			
			
			// when checking a variable to see if it has any matching values or not, treat it as a boolean. 
			// it will either be true or false - if it's true then the code in the if statement will run
			if(selector){
				var matches = $(selector);
				
				//show and matched elements as needed
				matches.fadeIn();
				//as the parent container is also hidden, show that too
				matches.parent().fadeIn();
				
				//use length to check the number of matched elements and if there aren't any then alert the user
				if(!matches.length){
					//alert('no matches');
					$('#no_event').addClass('active');
					
				}
				
				//keep a track on the values and number found and log them to the console
				console.log(selector + " length:" + $(selector).length);		
			}else{
				//if none of the above are found then show all
				$('.event').show();
				$('.month').show();
			}
			
		});
	
/* ====================
=======================
=======================
==================== */
	
	//CLICK EVENT TO SHOW MODAL POP UP

	$('.showModal').on('click',function(){
		var targetId = $(this).attr('href');
		var eventLink = $(this).data("link-href");
		$(targetId).addClass('active');
		$(targetId + " a#am").attr("href", mainUrl + eventLink + am);
		$(targetId + " a#pm").attr("href", mainUrl + eventLink + pm);
		return false;
	});	
	
	$('.closeModal').on('click',function(){
		$('.modal').removeClass('active');
		$('.event').show();
		$('.month').show();
		$('.combine').each(function(e){
				$(this).val('');
			});
	});
	
/* ====================
=======================
=======================
==================== */
	

});