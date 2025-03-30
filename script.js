document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const resumeInput = document.getElementById('resumeInput');
    const fileName = document.getElementById('fileName');
    const uploadForm = document.getElementById('uploadForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingContainer = document.getElementById('loadingContainer');
    const skillsContainer = document.getElementById('skillsContainer');
    const skillsTags = document.getElementById('skillsTags');
    const errorMessage = document.getElementById('errorMessage');
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMessage = document.getElementById('toast-message');

    // Color palette for skill tags
    const colorClasses = [
        { bg: '#e3f2fd', text: '#1565c0' }, // Blue
        { bg: '#e8f5e9', text: '#2e7d32' }, // Green
        { bg: '#f3e5f5', text: '#7b1fa2' }, // Purple
        { bg: '#fff8e1', text: '#ff8f00' }, // Amber
        { bg: '#fce4ec', text: '#c2185b' }, // Pink
        { bg: '#e0f7fa', text: '#00838f' }  // Cyan
    ];

    // Event Listeners for drag and drop
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    dropZone.addEventListener('click', () => resumeInput.click());
    
    resumeInput.addEventListener('change', handleFileSelect);
    uploadForm.addEventListener('submit', handleSubmit);

    // Functions
    function highlight(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('active');
    }

    function unhighlight(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('active');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dt = e.dataTransfer;
        const files = dt.files;
        
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        
        if (file.type !== 'application/pdf') {
            showToast('Please upload a PDF file', 'error');
            return;
        }
        
        fileName.textContent = file.name;
        submitBtn.disabled = false;
    }

    function handleSubmit(e) {
        // Prevent the default form submission to avoid page refresh
        e.preventDefault();
        
        const file = resumeInput.files[0];
        if (!file) {
            showToast('Please select a file first', 'warning');
            return;
        }
        
        // Show loading animation
        uploadForm.classList.add('hidden');
        loadingContainer.classList.remove('hidden');
        skillsContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        const formData = new FormData();
        formData.append('resume', file);
        
        // Send the file to the server - Updated port to 5000
        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server error: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Hide loading animation
            loadingContainer.classList.add('hidden');
            
            // Display the skills
            displaySkills(data.skills);
            
            // Show success toast
            showToast('Resume analyzed successfully!', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Hide loading animation
            loadingContainer.classList.add('hidden');
            
            // Show error message
            errorMessage.textContent = 'Error analyzing resume. Make sure the server is running on port 5000.';
            errorMessage.classList.remove('hidden');
            
            // Show error toast
            showToast('Error analyzing resume', 'error');
            
            // Show upload form again
            uploadForm.classList.remove('hidden');
        });
    }

    function displaySkills(skills) {
        skillsTags.innerHTML = '';
        
        if (skills.length === 0) {
            const noSkillsMsg = document.createElement('p');
            noSkillsMsg.textContent = 'No skills detected in the uploaded resume.';
            noSkillsMsg.style.color = 'var(--light-text)';
            skillsTags.appendChild(noSkillsMsg);
        } else {
            skills.forEach(skill => {
                const colorClass = getColorForSkill(skill);
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skillTag.style.backgroundColor = colorClass.bg;
                skillTag.style.color = colorClass.text;
                skillsTags.appendChild(skillTag);
            });
        }
        
        skillsContainer.classList.remove('hidden');
        uploadForm.classList.remove('hidden');
    }

    function getColorForSkill(skill) {
        // Generate a consistent color based on the skill name
        const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colorClasses[hash % colorClasses.length];
    }

    function showToast(message, type = 'success') {
        // Configure toast based on type
        toastMessage.textContent = message;
        
        // Reset classes
        toastIcon.className = 'fas';
        
        // Set icon and color based on type
        if (type === 'success') {
            toastIcon.classList.add('fa-check-circle');
        } else if (type === 'error') {
            toastIcon.classList.add('fa-exclamation-circle');
        } else if (type === 'warning') {
            toastIcon.classList.add('fa-exclamation-triangle');
        }
        
        // Show the toast
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 3000);
    }
});
