// DOM Elements
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mainContent = document.getElementById('mainContent');
        const pages = document.querySelectorAll('.page');
        const menuLinks = document.querySelectorAll('.menu-items a');
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        const closeLogin = document.getElementById('closeLogin');
        const closeSignup = document.getElementById('closeSignup');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const logoutBtn = document.getElementById('logoutBtn');
        const sendBtn = document.getElementById('sendBtn');
        const voiceBtn = document.getElementById('voiceBtn');
        const userInput = document.getElementById('userInput');
        const chatMessages = document.getElementById('chatMessages');
        const aiBtns = document.querySelectorAll('.ai-btn');
        const notificationIcon = document.getElementById('notificationIcon');
        const addChallengeBtn = document.getElementById('addChallengeBtn');

        

        // Speech Recognition
      let recognition;
    let isListening = true;
    let currentAI = 'guide';
        
        // AI Responses
const aiResponses = {
    guide: [
        "Welcome to EDUSENSE! I'm your Guide Bot. Let me show you around our platform designed specifically for ADHD and dyslexia support.",
        "To create a challenge, click the '+ New' button on the challenges card. You can set daily goals, custom rewards, and even invite friends!",
        "Our ADHD-friendly features include: Focus timers, voice interaction, simplified UI, progress tracking, and gamified rewards to keep you engaged.",
        "You can switch between me and the Skill Companion anytime. He's better at helping with specific study techniques and motivation!",
        "Check out the Collaboration section to team up with friends on challenges. You get 30% extra XP when working together!",
        "The Competitive Arena has time-based challenges that can earn you special badges and trophies. Perfect for when you need an extra push!",
        "Remember to check your badges section - we have mystery badges that appear only after you complete special hidden challenges!",
        "Use the voice chat feature by clicking the microphone button. I can understand natural speech and respond conversationally!"
    ],
    companion: [
        "Hey friend! I'm your Skill Companion. Ready to crush those study goals together?",
        "I notice you've been consistent with your morning study challenge. That's amazing progress! How about we increase it by 15 minutes this week?",
        "For ADHD focus, try the Pomodoro technique: 25 minutes study, 5 minutes break. I can help you time it!",
        "Feeling overwhelmed? Break big tasks into smaller chunks. Let's create micro-challenges together!",
        "Remember to take movement breaks. How about a quick 5-minute stretch challenge right now?",
        "Your current streak is impressive! Maintaining consistency is key for building strong study habits.",
        "I can help you with study techniques that work well with dyslexia: color-coding, text-to-speech, and chunking information.",
        "Let's celebrate your wins! Every completed challenge, no matter how small, is a step toward your goals.",
        "Need motivation? Think about why you started. Your future self will thank you for the effort you're putting in today!"
    ]
};

        // Initialize the page
        function init() {
            // Setup sidebar toggle
            hamburgerMenu.addEventListener('click', toggleSidebar);
            sidebarOverlay.addEventListener('click', toggleSidebar);
            
            // Setup menu links
            menuLinks.forEach(link => {
                if (link.id !== 'logoutBtn') {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const pageId = link.getAttribute('data-page');
                        showPage(pageId);
                        toggleSidebar();
                    });
                }
            });
            
            // Setup modal navigation
            closeLogin.addEventListener('click', () => loginModal.classList.remove('active'));
            closeSignup.addEventListener('click', () => signupModal.classList.remove('active'));
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.classList.remove('active');
                signupModal.classList.add('active');
            });
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                signupModal.classList.remove('active');
                loginModal.classList.add('active');
            });
            
            // Setup forms
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                loginModal.classList.remove('active');
                alert('Login successful! Welcome to EDUSENSE.');
            });
            
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                signupModal.classList.remove('active');
                alert('Account created successfully! Welcome to EDUSENSE.');
            });
            
            // Setup logout
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    showPage('home');
                    loginModal.classList.add('active');
                    toggleSidebar();
                }
            });
            
            // Setup AI chat
            sendBtn.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            // Setup voice button
            voiceBtn.addEventListener('click', () => {
                alert('Voice feature activated! In a full implementation, this would enable speech recognition.');
                userInput.placeholder = "Speak now...";
                setTimeout(() => {
                    userInput.placeholder = "Type your message here...";
                }, 2000);
            });
            
            // Setup AI selector
            aiBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    aiBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentAI = btn.getAttribute('data-ai');
                    
                    // Add greeting from new AI
                    const greeting = currentAI === 'guide' 
                        ? "Hi! I'm your Guide Bot. How can I help you navigate EDUSENSE today?"
                        : "Hey there! Skill Companion here. Ready to work on some awesome skills together?";
                    
                    addMessageToChat(greeting, 'ai');
                });
            });
            
            // Setup notifications
            notificationIcon.addEventListener('click', () => {
                alert('You have 3 notifications:\n1. Friend request from @StudyBuddy\n2. Challenge completed: Morning Exercise\n3. New badge unlocked: Team Player');
            });
            
            // Setup add challenge button
            if (addChallengeBtn) {
                addChallengeBtn.addEventListener('click', () => {
                    const challengeName = prompt('Enter a name for your new challenge:');
                    if (challengeName) {
                        alert(`Challenge "${challengeName}" created successfully!`);
                        addMessageToChat(`Great! I've created the "${challengeName}" challenge for you. Remember to check in daily to track your progress!`, 'ai');
                    }
                });
            }
            
            // Auto-hide login modal after 3 seconds for demo
            setTimeout(() => {
                if (loginModal.classList.contains('active')) {
                    loginModal.classList.remove('active');
                }
            }, 3000);
        }
        
        // Toggle sidebar
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            mainContent.classList.toggle('sidebar-open');
        }
        
        // Show specific page
        function showPage(pageId) {
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // Scroll to top when changing pages
                window.scrollTo(0, 0);
            }
        }
        
        // Send chat message
        function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;
            
            // Add user message to chat
            addMessageToChat(message, 'user');
            
            // Clear input
            userInput.value = '';
            
            // Generate AI response after a short delay
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessageToChat(response, 'ai');
            }, 500);
        }
        
        // Add message to chat
        function addMessageToChat(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const senderName = sender === 'ai' 
                ? (currentAI === 'guide' ? 'Guide Bot:' : 'Skill Companion:') 
                : 'You:';
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            messageDiv.innerHTML = `
                <strong>${senderName}</strong> ${message}
                <div style="text-align: right; font-size: 0.8rem; color: #B0B0D0; margin-top: 5px;">${timeString}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Generate AI response
        function getAIResponse(input) {
            const inputLower = input.toLowerCase();
            
            // Check for specific keywords
            if (inputLower.includes('adhd') || inputLower.includes('dyslexia')) {
                return currentAI === 'guide' 
                    ? "EDUSENSE is designed with ADHD and dyslexia in mind! Features include: Simplified navigation, voice interaction, focus timers, color-coded tasks, text-to-speech support, and gamified rewards to maintain engagement."
                    : "For ADHD/dyslexia support, I recommend: Breaking tasks into smaller chunks, using the Pomodoro timer, enabling text-to-speech, color-coding your challenges, and setting up reminder notifications.";
            }
            
            if (inputLower.includes('challenge') || inputLower.includes('create')) {
                return "To create a challenge: 1) Click '+ New' on the challenges card, 2) Choose a type (daily, weekly, custom), 3) Set your goal and duration, 4) Add friends for collaboration, 5) Set rewards (XP, badges).";
            }
            
            if (inputLower.includes('motivat') || inputLower.includes('bored')) {
                return "I get it! Motivation can be tricky. Here's what helps: 1) Remember your 'why' - why is this important? 2) Break it down - what's one tiny step you can take now? 3) Use the 5-minute rule - just start for 5 minutes. 4) Reward yourself after small wins.";
            }
            
            if (inputLower.includes('friend') || inputLower.includes('collaborat')) {
                return "Collaboration is awesome! You can: 1) Invite friends from the friends list, 2) Create group challenges, 3) Compete in team battles, 4) Earn 20% extra XP when working together.";
            }
            
            if (inputLower.includes('level') || inputLower.includes('xp')) {
                return "You're at Level 15 with 2,450 XP. You need 2,550 more XP for Level 16. You get XP from: Completing challenges (+50), Collaborating (+20%), Winning competitions (+30%), and Daily streaks!";
            }
            
            // Return random response from current AI
            const responses = aiResponses[currentAI];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', init);