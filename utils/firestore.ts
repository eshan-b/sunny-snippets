import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "@/firebase.config";

// Get a reference to the Firestore database
const db = getFirestore(app);

// Reference to the 'news_articles' collection
const newsArticlesCollection = collection(db, "news_articles");

// Function to add a news article to Firestore
export const addNewsArticle = async (articleData: any) => {
  try {
    const docRef = await addDoc(newsArticlesCollection, articleData);
    console.log("News article added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding news article: ", error);
    throw error;
  }
};

// Function to get all news articles from Firestore
export const getAllNewsArticles = async () => {
  try {
    const querySnapshot = await getDocs(newsArticlesCollection);
    const articles: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    return articles;
  } catch (error) {
    console.error("Error getting news articles: ", error);
    throw error;
  }
};

// More functions can be added for updating, deleting, etc.
