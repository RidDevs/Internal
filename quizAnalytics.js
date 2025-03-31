// quizAnalytics.js - Analytics and storage for quiz results

// Initialize analytics storage in localStorage if it doesn't exist
if (!localStorage.getItem('quizAnalytics')) {
    localStorage.setItem('quizAnalytics', JSON.stringify({
      totalQuizzes: 0,
      skillScores: {},
      recentResults: []
    }));
  }
  
  // Function to store quiz results
  function storeQuizResults(quizData) {
    // Get current analytics data
    const analytics = JSON.parse(localStorage.getItem('quizAnalytics'));
    
    // Update total quiz count
    analytics.totalQuizzes += 1;
    
    // Store most recent results (keep last 10)
    analytics.recentResults.unshift(quizData);
    if (analytics.recentResults.length > 10) {
      analytics.recentResults.pop();
    }
    
    // Update skill scores
    quizData.skillResults.forEach(item => {
      if (!analytics.skillScores[item.skill]) {
        analytics.skillScores[item.skill] = {
          totalQuestions: 0,
          correctAnswers: 0,
          attempts: 0
        };
      }
      
      analytics.skillScores[item.skill].attempts += 1;
      analytics.skillScores[item.skill].totalQuestions += 1;
      
      if (item.isCorrect) {
        analytics.skillScores[item.skill].correctAnswers += 1;
      }
    });
    
    // Save updated analytics
    localStorage.setItem('quizAnalytics', JSON.stringify(analytics));
  }
  
  // Function to get analytics data
  function getQuizAnalytics() {
    return JSON.parse(localStorage.getItem('quizAnalytics'));
  }
  
  // Function to clear analytics data
  function clearQuizAnalytics() {
    localStorage.setItem('quizAnalytics', JSON.stringify({
      totalQuizzes: 0,
      skillScores: {},
      recentResults: []
    }));
  }
  
  // Export functions for use in other files
  window.quizAnalytics = {
    storeQuizResults,
    getQuizAnalytics,
    clearQuizAnalytics
  };