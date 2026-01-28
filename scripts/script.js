document.getElementById('waitlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const form = this;
    
    // Email validation
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address');
        emailInput.style.borderColor = '#ef4444';
        return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        time: new Date().toLocaleString(),
        company: document.getElementById('company').value || 'Not provided'
    };
    
    // Send email using EmailJS
    emailjs.send('service_k4olotp', 'template_pkg4hgp', templateParams)
        .then(function(response) {
            console.log('Notification sent!', response.status, response.text);
            return emailjs.send('service_k4olotp', 'template_zwz1p4n', {
                name: templateParams.name,
                email: templateParams.email
            });
        })
        .then(function(response) {
            console.log('Auto-reply sent!', response.status, response.text);
            form.style.display = 'none';
            successMessage.classList.add('show');
        })
        .cach(function(error) {
            console.error('FAILED...', error);
            alert('Something went wrong. Please try again!');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join Waitlist';
        })
});