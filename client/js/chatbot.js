// =====================================
// KISAN MITHRA CHATBOT
// =====================================

const chatbotButton =
    document.getElementById("chatbotButton");

const chatbotBox =
    document.getElementById("chatbotBox");

const closeChatbot =
    document.getElementById("closeChatbot");

const chatbotSend =
    document.getElementById("chatbotSend");

const chatbotInput =
    document.getElementById("chatbotInput");

const chatbotMessages =
    document.getElementById("chatbotMessages");


// Open chatbot

chatbotButton.addEventListener("click", function () {

    chatbotBox.style.display = "flex";

    chatbotInput.focus();

});


// Close chatbot

closeChatbot.addEventListener("click", function () {

    chatbotBox.style.display = "none";

});


// Send message

chatbotSend.addEventListener("click", sendChatMessage);


// Press Enter

chatbotInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        sendChatMessage();

    }

});


// =====================================
// SEND MESSAGE TO BACKEND
// =====================================

async function sendChatMessage() {

    const message =
        chatbotInput.value.trim();


    if (message === "") {
        return;
    }


    // Show user message

    chatbotMessages.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;


    chatbotInput.value = "";


    // Show loading

    const loadingMessage =
        document.createElement("div");

    loadingMessage.className =
        "bot-message";

    loadingMessage.id =
        "chatbotLoading";

    loadingMessage.innerHTML =
        "<strong>Kisan Mithra 🌾</strong><p>Thinking... 🤔</p>";

    chatbotMessages.appendChild(
        loadingMessage
    );


    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;


    try {

        const response = await fetch(
            "http://localhost:5000/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data =
            await response.json();


        // Remove loading

        loadingMessage.remove();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "AI service error"
            );

        }


        // Show AI response

        chatbotMessages.innerHTML += `
            <div class="bot-message">
                <strong>Kisan Mithra 🌾</strong>
                <p>${data.reply}</p>
            </div>
        `;


        chatbotMessages.scrollTop =
            chatbotMessages.scrollHeight;


    } catch (error) {

        console.error(
            "Chatbot Error:",
            error
        );


        loadingMessage.remove();


        chatbotMessages.innerHTML += `
            <div class="bot-message">
                <strong>Kisan Mithra 🌾</strong>
                <p>
                    Sorry, I couldn't connect to
                    the AI service right now.
                    Please try again later.
                </p>
            </div>
        `;

    }

}