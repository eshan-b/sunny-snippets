import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "@/firebase.config";

// Get a reference to the Firestore database
const db = getFirestore(app);

// Reference to the 'news_articles' collection
const newsArticlesCollection = collection(db, "news_articles");

// Function to add a news article
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

// Reference to the 'users' collection
const usersCollection = collection(db, "users");

// Function to create a new user
export const createUser = async (userId: string, userData: any) => {
  const userRef = doc(usersCollection, userId);

  try {
    // Check if the user already exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If the user doesn't exist, create a new user document
      await setDoc(userRef, userData);
    } else {
      // Handle the case where the user already exists
      console.warn("User already exists with ID:", userId);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to save an article for a user
export const saveArticleForUser = async (userId: string, articleId: any) => {
  const userRef = doc(usersCollection, userId);

  try {
    // Check if the user exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If the user doesn't exist, create a new user
      await createUser(userId, { savedArticles: [articleId] });
    } else {
      // If the user exists, update the saved articles
      const savedArticles = userDoc.data().savedArticles || [];
      if (!savedArticles.includes(articleId)) {
        savedArticles.push(articleId);
        await updateDoc(userRef, { savedArticles });
      }
    }
  } catch (error) {
    console.error("Error saving article for user:", error);
    throw error;
  }
};

// Remove a saved article for a specific user
export const removeArticleForUser = async (
  userId: string | undefined,
  articleId: any
) => {
  const userRef = doc(usersCollection, userId);

  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const savedArticles = userDoc.data().savedArticles || [];
    const updatedSavedArticles = savedArticles.filter(
      (id: any) => id !== articleId
    );

    await updateDoc(userRef, { savedArticles: updatedSavedArticles });
  }
};

// Function to get all news articles
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
