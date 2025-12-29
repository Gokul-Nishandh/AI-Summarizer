document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize");
  const copyBtn = document.getElementById("copy-btn");
  const resultDiv = document.getElementById("result");
  const summaryTypeSelect = document.getElementById("summary-type");

  if (!summarizeBtn || !copyBtn || !resultDiv || !summaryTypeSelect) {
    console.error("Popup elements not found");
    return;
  }

  summarizeBtn.addEventListener("click", async () => {
    resultDiv.innerHTML =
      '<div class="loading"><div class="loader"></div></div>';

    const summaryType = summaryTypeSelect.value;

    chrome.storage.sync.get(["geminiApiKey"], async (result) => {
      if (!result.geminiApiKey) {
        resultDiv.innerText =
          "API key not found. Please set your API key in the extension options.";
        return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab?.id) {
          resultDiv.innerText = "No active tab found.";
          return;
        }

        chrome.tabs.sendMessage(
          tab.id,
          { type: "GET_ARTICLE_TEXT" },
          async (res) => {
            if (!res || !res.text) {
              resultDiv.innerText =
                "Could not extract article text from this page.";
              return;
            }

            try {
              const summary = await getGeminiSummary(
                res.text,
                summaryType,
                result.geminiApiKey
              );
              resultDiv.innerText = summary;
            } catch (error) {
              resultDiv.innerText =
                error.message || "Failed to generate summary.";
            }
          }
        );
      });
    });
  });

  copyBtn.addEventListener("click", () => {
    const text = resultDiv.innerText;
    if (!text.trim()) return;

    navigator.clipboard.writeText(text).then(() => {
      const original = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = original), 2000);
    });
  });
});

async function getGeminiSummary(text, summaryType, apiKey) {
  const maxLength = 20000;
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  let prompt;
  switch (summaryType) {
    case "brief":
      prompt = `Provide a brief summary in 2-3 sentences:\n\n${truncatedText}`;
      break;
    case "detailed":
      prompt = `Provide a detailed summary:\n\n${truncatedText}`;
      break;
    case "bullets":
      prompt = `Summarize in 5-7 bullet points using "- " only:\n\n${truncatedText}`;
      break;
    default:
      prompt = `Summarize:\n\n${truncatedText}`;
  }

 const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  }
);



  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Gemini API failed");
  }

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No summary available."
  );
}
