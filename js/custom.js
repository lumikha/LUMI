$(document).ready(function() {
	var current_page = document.location.pathname.match(/[^\/]+$/)[0];
	var specified_pos = window.location.href.split("#"); 

	if(current_page == 'about') {
		$('#aboutTab').addClass('active');
	}
	if(current_page == 'workAt') {
		$('#workAt_index_img').css('display', 'block');
		$('#workAt_index').css('display', 'block');
		$('#workTab').addClass('active');
		if(specified_pos[1]) {
			if($('#'+specified_pos[1]).length) {
        if(specified_pos[1] == 'apply_result') {
          window.location = 'workAt';
        } else {
          $('.position_list li a[href="#'+specified_pos[1]+'"]').addClass('active');
  				showPosition(specified_pos[1], null);
        }
			}
		}
	}
	if(current_page == 'engage') {
		$('#engageTab').addClass('active');
	}
	if(current_page == 'contact') {
		$('#contactTab').addClass('active');
	}

	displayCitySelectedRegion($('.region_option').val());
	//capitalFirstLetter();
  displayMajorSelectedDegree($('.degree_option').val());
});

/*
function capitalFirstLetter() {
	$('.cities option').text(function(i,oldtext){
		var lowered = oldtext.toLowerCase();
		str = lowered.split(' ');
		oldtext = '';
		for (var chr = 0; chr < str.length; chr++) {
	        oldtext += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' ';
	    }
	    return oldtext;
	});
}
*/

$('.position_list li a').on('click', function() {
	var posSelected = this.href.split("#");
  if($('#refer_friend_form').css('display') == 'none') {
    displayBackReferForm();
  }
	showPosition(posSelected[1], 1);
	$('.position_list li a').removeClass('active');
	$(this).addClass('active');
	$('body, html').animate({ scrollTop: 0 }, 400);
	//return false;
}); 

function showPosition(position, clicked) {
	if(position) {
		$('#applying_for').val(position);
    $('.workAt_form').css('display', 'block');
		if(!clicked) {
			$('#workAt_index').css('display', 'none');
			$('#workAt_index_img').css('display', 'none');
			$('#'+position).css('display', 'block');
			$('#'+position+'_img').css('display', 'block');
		} else {
			$('.workAt_left_content').css('display', 'none');
			$('.img_bg_page img').css('display', 'none');
			$('#workAt_index').css('display', 'none');
			$('#'+position+'_img').css('display', 'none');
			$('#'+position).fadeIn( "slow" );
			$('#'+position+'_img').fadeIn( "slow" );
		}
	}
}

function applyFormSubmittedOK() {
  window.location = 'workAt#apply_result';
  $('.workAt_form .email_not_sent').css('display','none');
  $('.position_list li a').removeClass('active');
  $('.img_bg_page img').css('display', 'none');
  $('#workAt_index').css('display', 'none');
  $('#workAt_index_img').css('display', 'none');
  $('.workAt_form').css('display', 'none');
  $('.workAt_left_content').css('display', 'none');
  $('#apply_result').css('display', 'block');
  $('#apply_result_img').css('display', 'block');
  $('body, html').animate({ scrollTop: 0 }, 600);
  $('#apply_now_form')[0].reset();
}

function applyFormSubmittedFAIL() {
  $('.workAt_form .email_not_sent').css('display','block');
}

function referFormSubmittedOK() {
  $('.apply_result_form .email_not_sent').css('display','none');
  $('#refer_friend_form').slideUp();
  $('.apply_result_form .email_sent').slideDown();
  $('#refer_friend_form')[0].reset();
}

function referFormSubmittedFAIL() {
  $('.apply_result_form .email_not_sent').css('display','block');
}

function displayBackReferForm() {
  $('.apply_result_form .email_sent').css('display','none');
  $('#refer_friend_form').css('display', 'block');
}

function worksubmitloadingshow() {
  $('.workAt_form .workAt_subBtn button').css('display','none');
  $('.workAt_form .workAt_subBtn .form_submitting_gif').css('display','block');
}

function worksubmitloadinghide() {
  $('.workAt_form .workAt_subBtn button').css('display','block');
  $('.workAt_form .workAt_subBtn .form_submitting_gif').css('display','none');
}

function refersubmitloadingshow() {
  $('.refer_friend_form_btns button').css('display','none');
  $('.refer_friend_form_btns .form_submitting_gif').css('display','block');
}

function refersubmitloadinghide() {
  $('.refer_friend_form_btns button').css('display','block');
  $('.refer_friend_form_btns .form_submitting_gif').css('display','none');
}

function displayCitySelectedRegion(region) {
	$('.cities').css('display', 'none');
	$('.cities').prop('disabled', 'disabled');
	if(region == 'Negros') {
		$('.cities_negros').css('display', 'block');
		$('.cities_negros').prop('disabled', false);
	}
	if(region == 'NCR-Manila') {
		$('.cities_ncrmanila').css('display', 'block');
		$('.cities_ncrmanila').prop('disabled', false);
	}
	if(region == 'Others') {
		$('.cities_capital').css('display', 'block');
		$('.cities_capital').prop('disabled', false);
	}
}

$('.region_option').on('change', function() {
	var selected_region = $(this).val();
	displayCitySelectedRegion(selected_region);
});

function displayMajorSelectedDegree(degree) {
  $('.major').css('display', 'none');
  $('.major').prop('disabled', 'disabled');
  if(degree == 'Bachelor') {
    $('.bachelor').css('display', 'block');
    $('.bachelor').prop('disabled', false);
  }
  if(degree == 'Bachelor of Arts') {
    $('.bachelor_of_arts').css('display', 'block');
    $('.bachelor_of_arts').prop('disabled', false);
  }
  if(degree == 'Bachelor of Elementary Education') {
    $('.bachelor_of_elementary_education').css('display', 'block');
    $('.bachelor_of_elementary_education').prop('disabled', false);
  }
  if(degree == 'Bachelor of Secondary Education') {
    $('.bachelor_of_secondary_education').css('display', 'block');
    $('.bachelor_of_secondary_educationr').prop('disabled', false);
  }
  if(degree == 'Bachelor of Science') {
    $('.bachelor_of_science').css('display', 'block');
    $('.bachelor_of_science').prop('disabled', false);
  }

}

$('.degree_option').on('change', function() {
  var selected_degree = $(this).val();
  displayMajorSelectedDegree(selected_degree);
});

$('#apply_now_form').validate({
  rules: {
    firstname: {
      required: true,
    },
    lastname: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
    region: {
      required: true,
    },
    city: {
      required: true,
    },
    landline: {
      required: true,
      //digits: true,
    },
    mobile: {
      required: true,
      //digits: true,
    },
    education: {
      required: true,
    },
    degree: {
      required: true,
    },
    major: {
      required: true,
    },
    company: {
      required: true,
    },
    position: {
      required: true,
    },
    startdateMM: {
      required: true,
      digits: true,
    },
    startdateYY: {
      required: true,
      digits: true,
    },
    enddateMM: {
      required: true,
      digits: true,
    },
    enddateYY: {
      required: true,
      digits: true,
    },
  },
  messages: {
    firstname: {
      required: "Please input firstname.",
    },
    lastname: {
      required: "Please input lastname.",
    },
    email: {
      required: "Please input email.",
    },
    region: {
      required: "Please select region.",
    },
    city: {
      required: "Please select city.",
    },
    landline: {
      required: "Please input landline.",
    },
    mobile: {
      required: "Please input mobile.",
    },
    education: {
      required: "Please input education.",
    },
    degree: {
      required: "Please specify degree.",
    },
    major: {
      required: "Please input major.",
    },
    company: {
      required: "Please input company name.",
    },
    position: {
      required: "Please input position.",
    },
    startdateMM: {
      required: "Please input month you started.",
    },
    startdateYY: {
      required: "Please input year you started.",
    },
    enddateMM: {
      required: "Please input month you ended.",
    },
    enddateYY: {
      required: "Please input year you ended.",
    },
  },
  submitHandler: function (form) {
    worksubmitloadingshow();
    $.ajax({
      url: form.action,
      type: form.method,
      data: $(form).serialize(),
      success: function (responseText) {
        if(responseText == "sent") {
          applyFormSubmittedOK();
          worksubmitloadinghide();
        } else {
          applyFormSubmittedFAIL();
          worksubmitloadinghide();
        }
      }
    });
    return false;
  }
});

$('#refer_friend_form').validate({
  rules: {
    youfirstname: {
      required: true,
    },
    youlastname: {
      required: true,
    },
    youemail: {
      required: true,
      email: true,
    },
    themfirstname: {
      required: true,
    },
    themlastname: {
      required: true,
    },
    thememail: {
      required: true,
      email: true,
    },
  },
  messages: {
    youfirstname: {
      required: "Please input your firstname.",
    },
    youlastname: {
      required: "Please input your lastname.",
    },
    youemail: {
      required: "Please input your email.",
    },
    themfirstname: {
      required: "Please input their firstname.",
    },
    themlastname: {
      required: "Please input their lastname.",
    },
    thememail: {
      required: "Please input their email.",
    },
  },
  submitHandler: function (form) {
    refersubmitloadingshow();
    $.ajax({
      url: form.action,
      type: form.method,
      data: $(form).serialize(),
      success: function (responseText) {
        if(responseText == "sent") {
          referFormSubmittedOK();
          refersubmitloadinghide();
        } else {
          referFormSubmittedFAIL();
          refersubmitloadinghide();
        }
      }
    });
    return false;
  }
});