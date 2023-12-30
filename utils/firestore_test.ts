import { addNewsArticle, getAllNewsArticles } from "./firestore";

const testFirestore = async () => {
  // Test adding a news article
  const sampleArticle = {
    title: "Sample Article",
    description: "This is a sample news article.",
    author: "John Doe",
    publishedAt: new Date().toISOString(),
    url: "https://example.com",
    urlToImage: "https://example.com/image.jpg",
  };

  try {
    const articleId = await addNewsArticle(sampleArticle);
    console.log("News article added with ID:", articleId);
  } catch (error) {
    console.error("Error adding news article:", error);
  }

  // Test retrieving all news articles
  try {
    const articles = await getAllNewsArticles();
    console.log("All News Articles:", articles);
  } catch (error) {
    console.error("Error getting news articles:", error);
  }
};

// Run the test
testFirestore();
