
// JavaScript contact form Document
$(document).ready(function() {
	$('form#contact-form').submit(function(e) {
		e.preventDefault(); // Prevent default form submission
		
		$('form#contact-form .error').remove();
		var hasError = false;
		
		$('.requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
				var labelText = $(this).prev('label').text();
				$(this).parent().append('<span class="error" style="color: #ff6b6b; font-size: 0.8rem; margin-top: 5px; display: block;">You forgot to enter your '+labelText+'</span>');
				$(this).addClass('inputError').css('border-color', '#ff6b6b');
				hasError = true;
			} else if($(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(jQuery.trim($(this).val()))) {
					var labelText = $(this).prev('label').text();
					$(this).parent().append('<span class="error" style="color: #ff6b6b; font-size: 0.8rem; margin-top: 5px; display: block;">You entered an invalid '+labelText+'</span>');
					$(this).addClass('inputError').css('border-color', '#ff6b6b');
					hasError = true;
				}
			}
		});
		
		if(!hasError) {
			// Show loading state
			$("#loader").show();
			$('form#contact-form button[type="submit"]').prop('disabled', true);
			
			// Get form data
			var name = $('#name').val();
			var email = $('#email').val();
			var subject = $('#subject').val();
			var message = $('#message').val();

			// Create mailto link with subject and message directly
			var mailtoLink = "mailto:rj1342627@gmail.com";
			mailtoLink += "?subject=" + encodeURIComponent(subject);
			mailtoLink += "&body=" + encodeURIComponent(message);
			
			// Small delay to show loading, then open mail client
			setTimeout(function() {
				// Hide loader
				$("#loader").hide();
				
				// Open default mail client
				window.location.href = mailtoLink;
				
				// Show success message
				$('#form-messages').removeClass('hidden').html(
					'<div class="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">' +
					'<div class="flex items-center">' +
					'<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">' +
					'<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>' +
					'</svg>' +
					'<span><strong>Success!</strong> Your default mail client should open with the message pre-filled. Please send the email to complete your message.</span>' +
					'</div>' +
					'</div>'
				);
				
				// Re-enable submit button
				$('form#contact-form button[type="submit"]').prop('disabled', false);
				
				// Optional: Clear form after success
				setTimeout(function() {
					$('form#contact-form')[0].reset();
					$('#form-messages').addClass('hidden');
				}, 5000);
				
			}, 1000);
		}
		
		// Remove error styling on input focus
		$('.requiredField').on('focus', function() {
			$(this).removeClass('inputError').css('border-color', '');
			$(this).parent().find('.error').remove();
		});
		
		return false;
	});
	
	// Alternative button for direct mailto (optional)
	$('#direct-email-btn').on('click', function(e) {
		e.preventDefault();
		
		// Get form data
		var name = $('#name').val() || 'Your Name';
		var email = $('#email').val() || 'your.email@example.com';
		var subject = $('#subject').val() || 'Portfolio Inquiry';
		var message = $('#message').val() || 'Please write your message here...';
		
		// Create email body
		var emailBody = "Hello,\n\n";
		emailBody += "Name: " + name + "\n";
		emailBody += "Email: " + email + "\n";
		emailBody += "Subject: " + subject + "\n\n";
		emailBody += "Message:\n" + message + "\n\n";
		emailBody += "Best regards,\n" + name;
		
		// Create and open mailto link
		var mailtoLink = "mailto:rj1342627@gmail.com";
		mailtoLink += "?subject=" + encodeURIComponent("Portfolio Contact: " + subject);
		mailtoLink += "&body=" + encodeURIComponent(emailBody);
		
		window.location.href = mailtoLink;
	});
});
