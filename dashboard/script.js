
// JavaScript for tab switching functionality
function switchTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Show the selected tab content
  const selectedContent = document.getElementById(`${tabId}-content`);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }
  
  // Set the active class on the clicked tab button
  const clickedButton = document.querySelector(`.tab-button[onclick="switchTab('${tabId}')"]`);
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}

// Initialize with the dashboard tab open
document.addEventListener('DOMContentLoaded', function() {
  // Default to dashboard tab
  switchTab('dashboard');
});
