document.addEventListener("DOMContentLoaded", () => {
    // Safe storage wrapper to prevent crashes in private windows / file:/// protocols
    const safeStorage = {
        getItem(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                console.warn("Storage access failed:", e);
                return null;
            }
        },
        setItem(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                console.warn("Storage writing failed:", e);
            }
        }
    };

    // ----------------------------------------------------
    // State Management
    // ----------------------------------------------------
    let currentTheme = safeStorage.getItem("theme") || "dark";
    let activeView = "dashboard";
    let activeCategoryFilter = "all";
    let activeGlossaryLetter = "all";
    let chatHistory = [];

    // ----------------------------------------------------
    // Element Selectors
    // ----------------------------------------------------
    // Navigation
    const navItems = document.querySelectorAll(".nav-item");
    const viewSections = document.querySelectorAll(".view-section");
    
    // Theme
    const themeToggleBtn = document.querySelector(".theme-toggle-btn");
    
    // Stats
    const totalRightsStat = document.getElementById("stat-total-rights");
    const glossaryTermsStat = document.getElementById("stat-glossary-terms");
    const templatesStat = document.getElementById("stat-templates");

    // Emergency Buttons
    const headerEmergencyBtn = document.querySelector(".emergency-btn");
    
    // Chat Elements
    const chatMessagesContainer = document.querySelector(".chat-messages");
    const chatInput = document.getElementById("chat-input-field");
    const sendBtn = document.getElementById("chat-send-btn");
    const chatSuggestionsContainer = document.querySelector(".chat-suggestions");
    const recentQueriesList = document.querySelector(".recent-queries-list");
    const clearChatBtn = document.getElementById("clear-chat-btn");
    const chatInfoBtn = document.getElementById("chat-info-btn");
    const chatExitBtn = document.getElementById("chat-exit-btn");
    const chatClearHeaderBtn = document.getElementById("chat-clear-header-btn");

    // Library Elements
    const librarySearchInput = document.getElementById("library-search");
    const libraryCategoryDropdown = document.getElementById("library-category-select");
    const categoryTabsContainer = document.querySelector(".category-tabs");
    const libraryCardsGrid = document.querySelector(".library-cards-grid");
    
    // Library Modal Elements
    const rightsModal = document.querySelector(".rights-modal");
    const rightsModalContent = document.querySelector(".rights-modal-content");

    // Document Generator Elements
    const templateSelect = document.getElementById("template-select");
    const formFieldsContainer = document.getElementById("form-fields-container");
    const previewPaper = document.querySelector(".preview-paper");
    const printBtn = document.getElementById("print-doc-btn");
    const resetFormBtn = document.getElementById("reset-doc-btn");

    // Glossary Elements
    const glossarySearchInput = document.getElementById("glossary-search");
    const alphabetBar = document.querySelector(".alphabet-bar");
    const glossaryGrid = document.querySelector(".glossary-grid");

    // Set initial theme
    document.body.setAttribute("data-theme", currentTheme);
    updateThemeToggleUI();

    // ----------------------------------------------------
    // Core Layout & View Routing
    // ----------------------------------------------------
    function switchView(viewId) {
        activeView = viewId;
        
        // Update sidebar links
        navItems.forEach(item => {
            if (item.getAttribute("data-view") === viewId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
        
        // Update view visibility
        viewSections.forEach(section => {
            if (section.id === `${viewId}-view`) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Trigger dynamic loads or re-renders
        if (viewId === "library") {
            renderLibrary();
        } else if (viewId === "generator") {
            // Load default template if none selected
            if (!templateSelect.value) {
                templateSelect.value = "lease-termination";
                loadTemplateFields("lease-termination");
            }
        } else if (viewId === "glossary") {
            renderGlossary();
        } else if (viewId === "dashboard") {
            updateDashboardStats();
        } else if (viewId === "chat") {
            // Refresh suggestion chips if no conversation has started yet
            if (chatMessagesContainer.children.length <= 1) {
                chatSuggestionsContainer.innerHTML = "";
                suggestedPrompts.forEach(promptText => {
                    const chip = document.createElement("button");
                    chip.className = "suggestion-chip";
                    chip.innerText = promptText;
                    chip.addEventListener("click", () => {
                        chatInput.value = promptText;
                        handleUserSendMessage();
                    });
                    chatSuggestionsContainer.appendChild(chip);
                });
            }
        }
        
        // Auto scroll to top
        document.querySelector(".main-content").scrollTop = 0;
    }

    // Bind sidebar clicks
    const navButtons = document.querySelectorAll(".nav-item button");
    navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const li = btn.closest(".nav-item");
            if (li) {
                switchView(li.getAttribute("data-view"));
            }
        });
    });

    // Header Emergency Actions
    headerEmergencyBtn.addEventListener("click", () => {
        switchView("library");
        activeCategoryFilter = "all";
        renderCategoryTabs();
        
        // Apply emergency search filter
        librarySearchInput.value = "";
        libraryCategoryDropdown.value = "all";
        
        // Filter only emergency rights
        const emergencyRights = rightsLibrary.filter(r => r.emergency);
        renderLibraryCards(emergencyRights);
        showToast("Filtered: Essential Emergency Rights", "danger");
    });

    // Dashboard shortcuts
    document.querySelectorAll(".feature-card").forEach(card => {
        const btn = card.querySelector(".feature-card-btn");
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const targetView = card.getAttribute("data-target");
                if (targetView) {
                    switchView(targetView);
                    if (targetView === "chat") {
                        document.querySelector(".chat-layout").classList.add("show-conversation");
                    }
                }
            });
        }
    });

    // ----------------------------------------------------
    // Theme Management
    // ----------------------------------------------------
    themeToggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", currentTheme);
        safeStorage.setItem("theme", currentTheme);
        updateThemeToggleUI();
        showToast(`Switched to ${currentTheme === "dark" ? "Dark" : "Light"} Mode`, "info");
    });

    function updateThemeToggleUI() {
        if (currentTheme === "dark") {
            themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i> <span>Light Mode</span>`;
        } else {
            themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i> <span>Dark Mode</span>`;
        }
    }

    // ----------------------------------------------------
    // Dashboard Stats & widgets
    // ----------------------------------------------------
    function updateDashboardStats() {
        if (totalRightsStat) totalRightsStat.innerText = rightsLibrary.length;
        if (glossaryTermsStat) glossaryTermsStat.innerText = glossaryData.length;
        if (templatesStat) templatesStat.innerText = Object.keys(documentTemplates).length;
    }
    
    function renderDashboardWidgets() {
        const pocketListContainer = document.querySelector(".pocket-list");
        if (!pocketListContainer) return;
        
        pocketListContainer.innerHTML = "";
        
        // Get emergency items
        const emergencyRights = rightsLibrary.filter(r => r.emergency).slice(0, 4);
        
        emergencyRights.forEach(right => {
            const item = document.createElement("div");
            item.className = "pocket-item";
            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");
            item.innerHTML = `
                <div class="pocket-info">
                    <i class="fas fa-exclamation-triangle pocket-icon"></i>
                    <span class="pocket-title">${right.title}</span>
                </div>
                <i class="fas fa-chevron-right pocket-arrow"></i>
            `;
            item.addEventListener("click", () => {
                // Open right detail directly
                openRightsModal(right);
            });
            pocketListContainer.appendChild(item);
        });
    }

    // ----------------------------------------------------
    // AI Chatbot UI Controller
    // ----------------------------------------------------
    const suggestedPrompts = [
        "Can a landlord evict me without notice?",
        "Police stopped my car, do I have to let them search?",
        "I bought a broken laptop, how do I get a refund?",
        "What are my rights if I work overtime hours?"
    ];

    function initChat() {
        // Clear containers
        chatMessagesContainer.innerHTML = "";
        chatSuggestionsContainer.innerHTML = "";
        
        // Add welcome message
        appendChatMessage("assistant", getAIResponse("hello").reply, ["Constitution of India", "Civil Rights Guide"]);
        
        // Render suggestion chips
        suggestedPrompts.forEach(promptText => {
            const chip = document.createElement("button");
            chip.className = "suggestion-chip";
            chip.innerText = promptText;
            chip.addEventListener("click", () => {
                chatInput.value = promptText;
                handleUserSendMessage();
            });
            chatSuggestionsContainer.appendChild(chip);
        });
        
        // Bind input events
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserSendMessage();
        });
        sendBtn.addEventListener("click", handleUserSendMessage);
        clearChatBtn.addEventListener("click", () => {
            initChat();
            showToast("Conversation cleared", "info");
        });
        
        // Bind Current Chat button in sidebar to show chat container on mobile
        const currentChatBtn = document.querySelector(".recent-query-item.active button");
        if (currentChatBtn) {
            currentChatBtn.addEventListener("click", () => {
                document.querySelector(".chat-layout").classList.add("show-conversation");
            });
        }
    }

    function appendChatMessage(sender, text, citations = [], isRawHtml = true) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        
        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = sender === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-balance-scale"></i>';
        
        const bubble = document.createElement("div");
        bubble.className = "message-bubble";
        
        if (isRawHtml) {
            bubble.innerHTML = text;
        } else {
            bubble.innerText = text;
        }

        // Add citations if assistant
        if (sender === "assistant" && citations && citations.length > 0) {
            const citationDiv = document.createElement("div");
            citationDiv.style.marginTop = "0.75rem";
            citationDiv.style.borderTop = "1px solid var(--border-light)";
            citationDiv.style.paddingTop = "0.5rem";
            citationDiv.style.fontSize = "0.75rem";
            citationDiv.style.color = "var(--text-muted)";
            
            let citationHtml = "<strong>Legal Basis:</strong> ";
            citations.forEach((cite, index) => {
                citationHtml += `<span class="legal-citation">${cite}</span>`;
            });
            citationDiv.innerHTML = citationHtml;
            bubble.appendChild(citationDiv);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
        chatMessagesContainer.appendChild(messageDiv);
        
        // Auto scroll to bottom
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function handleUserSendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;
        
        // Append user query
        appendChatMessage("user", query, [], false);
        chatInput.value = "";
        
        // Clear suggestions when user sends a message
        chatSuggestionsContainer.innerHTML = "";
        
        // Record in recent queries list
        addToRecentQueries(query);

        // Append typing indicator
        const typingDiv = document.createElement("div");
        typingDiv.className = "message assistant typing-msg";
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-balance-scale"></i></div>
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatMessagesContainer.appendChild(typingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        // Simulate AI response delay
        setTimeout(() => {
            // Remove typing indicator
            const typingMsg = chatMessagesContainer.querySelector(".typing-msg");
            if (typingMsg) typingMsg.remove();
            
            // Get response
            const responseObj = getAIResponse(query);
            appendChatMessage("assistant", responseObj.reply, responseObj.citations);
        }, 1200);
    }

    function addToRecentQueries(query) {
        if (chatHistory.includes(query)) return;
        chatHistory.unshift(query);
        
        // Keep last 6 queries
        if (chatHistory.length > 6) chatHistory.pop();
        
        renderRecentQueries();
    }

    function renderRecentQueries() {
        recentQueriesList.innerHTML = "";
        chatHistory.forEach(query => {
            const li = document.createElement("li");
            li.className = "recent-query-item";
            li.innerHTML = `<button><i class="fas fa-history"></i> ${query}</button>`;
            li.querySelector("button").addEventListener("click", () => {
                chatInput.value = query;
                handleUserSendMessage();
            });
            recentQueriesList.appendChild(li);
        });
    }

    // ----------------------------------------------------
    // Rights Library Controller
    // ----------------------------------------------------
    function renderLibrary() {
        renderCategoryTabs();
        bindLibraryFilters();
        renderLibraryCards(rightsLibrary);
    }

    function renderCategoryTabs() {
        categoryTabsContainer.innerHTML = "";
        
        // Get unique categories
        const categories = ["all", ...new Set(rightsLibrary.map(r => r.category))];
        
        categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `category-tab-btn ${activeCategoryFilter === cat ? 'active' : ''}`;
            btn.innerText = cat === "all" ? "All Rights" : cat;
            btn.addEventListener("click", () => {
                activeCategoryFilter = cat;
                
                // Toggle active styles on tabs
                categoryTabsContainer.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                // Update select dropdown to match
                libraryCategoryDropdown.value = cat;
                
                filterLibrary();
            });
            categoryTabsContainer.appendChild(btn);
        });
    }

    function bindLibraryFilters() {
        librarySearchInput.addEventListener("input", filterLibrary);
        libraryCategoryDropdown.addEventListener("change", (e) => {
            activeCategoryFilter = e.target.value;
            // Update tabs selection
            categoryTabsContainer.querySelectorAll(".category-tab-btn").forEach(btn => {
                if (btn.innerText.toLowerCase() === activeCategoryFilter.toLowerCase() || (activeCategoryFilter === "all" && btn.innerText === "All Rights")) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
            filterLibrary();
        });
    }

    function filterLibrary() {
        const searchText = librarySearchInput.value.toLowerCase().trim();
        const selectedCat = libraryCategoryDropdown.value;
        
        const filtered = rightsLibrary.filter(right => {
            const matchesSearch = right.title.toLowerCase().includes(searchText) || 
                                  right.summary.toLowerCase().includes(searchText) || 
                                  right.explanation.toLowerCase().includes(searchText);
            
            const matchesCat = selectedCat === "all" || right.category === selectedCat;
            
            return matchesSearch && matchesCat;
        });
        
        renderLibraryCards(filtered);
    }

    function renderLibraryCards(items) {
        libraryCardsGrid.innerHTML = "";
        
        if (items.length === 0) {
            libraryCardsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No rights found matching your search criteria.</p>
                </div>
            `;
            return;
        }

        items.forEach(right => {
            const card = document.createElement("div");
            card.className = "rights-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            if (right.emergency) {
                card.style.borderLeft = "4px solid var(--danger)";
            }
            
            card.innerHTML = `
                <div class="rights-card-header">
                    <span class="rights-card-category">${right.category}</span>
                    ${right.emergency ? '<span style="color: var(--danger); font-size: 0.75rem; font-weight: 800;"><i class="fas fa-exclamation-triangle"></i> EMERGENCY</span>' : ''}
                </div>
                <h4 class="rights-card-title">${right.title}</h4>
                <p class="rights-card-summary">${right.summary}</p>
                <div class="rights-card-footer">
                    <span class="rights-card-citation">${right.citation}</span>
                    <span class="rights-card-link">View Details <i class="fas fa-arrow-right"></i></span>
                </div>
            `;
            
            card.addEventListener("click", () => {
                openRightsModal(right);
            });
            
            libraryCardsGrid.appendChild(card);
        });
    }

    // Modal Operations
    function openRightsModal(right) {
        rightsModalContent.innerHTML = `
            <button class="close-modal-btn" id="close-modal-btn"><i class="fas fa-times"></i></button>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--secondary); text-transform: uppercase;">${right.category}</span>
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; margin-bottom: 0.5rem; color: var(--text-primary); margin-top: 0.25rem;">${right.title}</h2>
            <div style="font-size: 0.85rem; font-family: monospace; color: var(--primary); margin-bottom: 1.5rem;">Legal Basis: ${right.citation}</div>
            
            <div class="modal-section-title">Legal Explanation</div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; text-align: justify; margin-bottom: 1.5rem;">${right.explanation}</p>
            
            <div class="modal-section-title">Emergency Action Checklist</div>
            <ul class="modal-checklist">
                ${right.checklist.map(item => `
                    <li class="modal-checklist-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        rightsModal.classList.add("open");
        
        // Bind close button click
        document.getElementById("close-modal-btn").addEventListener("click", closeRightsModal);
    }

    function closeRightsModal() {
        rightsModal.classList.remove("open");
    }

    // Close modal if user clicks outside content
    rightsModal.addEventListener("click", (e) => {
        if (e.target === rightsModal) closeRightsModal();
    });

    // ----------------------------------------------------
    // Legal Document Generator Controller
    // ----------------------------------------------------
    function initDocumentGenerator() {
        // Load default values into template select dropdown
        templateSelect.innerHTML = "";
        Object.keys(documentTemplates).forEach(key => {
            const opt = document.createElement("option");
            opt.value = key;
            opt.innerText = documentTemplates[key].title;
            templateSelect.appendChild(opt);
        });

        // Set listener on change
        templateSelect.addEventListener("change", (e) => {
            loadTemplateFields(e.target.value);
        });

        // Print and Reset
        printBtn.addEventListener("click", () => {
            window.print();
            showToast("Opening printer wizard...", "success");
        });

        resetFormBtn.addEventListener("click", () => {
            const activeTemplate = templateSelect.value;
            loadTemplateFields(activeTemplate);
            showToast("Form fields reset", "info");
        });
    }

    function loadTemplateFields(templateId) {
        formFieldsContainer.innerHTML = "";
        const template = documentTemplates[templateId];
        if (!template) return;
        
        template.fields.forEach(field => {
            const group = document.createElement("div");
            group.className = "form-group";
            
            const label = document.createElement("label");
            label.setAttribute("for", `input-${field.id}`);
            label.innerText = field.label;
            
            let inputElement;
            if (field.type === "textarea") {
                inputElement = document.createElement("textarea");
                inputElement.rows = 4;
            } else if (field.type === "select") {
                inputElement = document.createElement("select");
                field.options.forEach(optVal => {
                    const opt = document.createElement("option");
                    opt.value = optVal;
                    opt.innerText = optVal;
                    inputElement.appendChild(opt);
                });
            } else {
                inputElement = document.createElement("input");
                inputElement.type = field.type;
            }
            
            inputElement.id = `input-${field.id}`;
            inputElement.placeholder = field.placeholder || "";
            
            // Add live re-rendering on input change
            inputElement.addEventListener("input", renderDocumentPreview);
            inputElement.addEventListener("change", renderDocumentPreview);
            
            group.appendChild(label);
            group.appendChild(inputElement);
            formFieldsContainer.appendChild(group);
        });
        
        // Do initial rendering
        renderDocumentPreview();
    }

    function renderDocumentPreview() {
        const templateId = templateSelect.value;
        const template = documentTemplates[templateId];
        if (!template) return;
        
        // Compile form inputs
        const formData = {};
        template.fields.forEach(field => {
            const input = document.getElementById(`input-${field.id}`);
            formData[field.id] = input ? input.value : "";
        });
        
        // Add current date if not already defined
        formData.date = new Date();
        
        // Render compilation result in paper container
        previewPaper.innerHTML = template.compile(formData);
    }

    // ----------------------------------------------------
    // Legal Glossary Controller
    // ----------------------------------------------------
    function renderGlossary() {
        renderAlphabetBar();
        renderGlossaryGrid(glossaryData);
        glossarySearchInput.addEventListener("input", filterGlossary);
    }

    function renderAlphabetBar() {
        alphabetBar.innerHTML = "";
        
        const letters = ["ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        
        letters.forEach(letter => {
            const btn = document.createElement("button");
            btn.className = `letter-btn ${activeGlossaryLetter === letter.toLowerCase() ? 'active' : ''}`;
            btn.innerText = letter;
            btn.addEventListener("click", () => {
                activeGlossaryLetter = letter.toLowerCase();
                
                alphabetBar.querySelectorAll(".letter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                filterGlossary();
            });
            alphabetBar.appendChild(btn);
        });
    }

    function filterGlossary() {
        const searchText = glossarySearchInput.value.toLowerCase().trim();
        const selectedLetter = activeGlossaryLetter;
        
        const filtered = glossaryData.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(searchText) || 
                                  item.definition.toLowerCase().includes(searchText);
                                  
            const firstLetter = item.term.charAt(0).toLowerCase();
            const matchesLetter = selectedLetter === "all" || firstLetter === selectedLetter;
            
            return matchesSearch && matchesLetter;
        });
        
        renderGlossaryGrid(filtered);
    }

    function renderGlossaryGrid(items) {
        glossaryGrid.innerHTML = "";
        
        if (items.length === 0) {
            glossaryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-spell-check" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No legal terms found matching your request.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "glossary-card";
            card.innerHTML = `
                <h4 class="glossary-term">${item.term}</h4>
                <div class="glossary-latin">Latin: ${item.latin}</div>
                <p class="glossary-definition">${item.definition}</p>
                <div class="glossary-example"><strong>Example:</strong> ${item.example}</div>
            `;
            glossaryGrid.appendChild(card);
        });
    }

    // ----------------------------------------------------
    // Toast Notification System
    // ----------------------------------------------------
    function showToast(message, type = "success") {
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.className = "toast-container";
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        let icon = "fa-check-circle";
        if (type === "info") icon = "fa-info-circle";
        if (type === "danger") icon = "fa-exclamation-triangle";
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">${message}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto close after 3 seconds
        const autoCloseTimeout = setTimeout(() => {
            dismissToast(toast);
        }, 3500);
        
        // Click close trigger
        toast.querySelector(".toast-close").addEventListener("click", () => {
            clearTimeout(autoCloseTimeout);
            dismissToast(toast);
        });
    }

    function dismissToast(toast) {
        toast.style.animation = "slideInLeft 0.3s reverse forwards";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    function openDisclaimerModal() {
        rightsModalContent.innerHTML = `
            <button class="close-modal-btn" id="close-disclaimer-btn"><i class="fas fa-times"></i></button>
            <span style="font-size: 0.75rem; font-weight: 800; color: var(--secondary); text-transform: uppercase; letter-spacing: 1px;">Legal Notice</span>
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; margin-bottom: 0.55rem; color: var(--text-primary); margin-top: 0.35rem;">Disclaimer</h2>
            <div style="font-size: 0.82rem; font-family: monospace; color: var(--primary); margin-bottom: 1.5rem; font-weight: 700;">CitizenLex AI Guidance</div>
            
            <div class="modal-section-title" style="margin-top: 1rem; border-left: 3px solid var(--primary); padding-left: 0.5rem;">Educational Purposes Only</div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; text-align: justify; margin-bottom: 1.25rem; margin-top: 0.5rem;">
                Lexis AI Assistant provides automated information based on cataloged constitutional statutes, civil guidelines, and plain-language rights databases. This information is designed exclusively for educational assistance. It is **not formal legal advice** and does not hold binding weight in any court or legal system.
            </p>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; text-align: justify; margin-bottom: 1.25rem;">
                Using this chatbot **does not create an attorney-client relationship**. If you require legal representation, are facing active law enforcement actions, or need help with a formal court filing, please seek the counsel of a licensed, professional attorney in your local jurisdiction.
            </p>
        `;
        
        rightsModal.classList.add("open");
        
        // Bind close button click
        document.getElementById("close-disclaimer-btn").addEventListener("click", closeRightsModal);
    }

    if (chatInfoBtn) {
        chatInfoBtn.addEventListener("click", openDisclaimerModal);
    }

    if (chatExitBtn) {
        chatExitBtn.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
                document.querySelector(".chat-layout").classList.remove("show-conversation");
            } else {
                switchView("dashboard");
            }
        });
    }

    if (chatClearHeaderBtn) {
        chatClearHeaderBtn.addEventListener("click", () => {
            initChat();
            showToast("Conversation cleared", "info");
        });
    }

    // ----------------------------------------------------
    // Page Initializations
    // ----------------------------------------------------
    switchView("dashboard");
    updateDashboardStats();
    renderDashboardWidgets();
    initChat();
    initDocumentGenerator();
});
