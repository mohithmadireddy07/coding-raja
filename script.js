document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    let previewContent = '<p><strong>Full Name:</strong> ' + formData.get('fullName') + '</p>';
    previewContent += '<p><strong>Email:</strong> ' + formData.get('email') + '</p>';
    previewContent += '<p><strong>Education:</strong></p><p>' + formData.get('education') + '</p>';
    previewContent += '<p><strong>Work Experience:</strong></p><p>' + formData.get('workExperience') + '</p>';
    previewContent += '<p><strong>Skills:</strong></p><p>' + formData.get('skills') + '</p>';
  
    document.getElementById('previewContent').innerHTML = previewContent;
  });
  