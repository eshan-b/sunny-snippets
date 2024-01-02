"use client";

// News Card
import NewsCard from "@/components/news-card";
import {
  getNewsArticlesForUser,
  removeArticleForUser,
} from "@/utils/firestore";

// NextUI
import { Divider, Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

// Toast
import toast from "react-hot-toast";

// Clerk Authentication
import { useAuth } from "@clerk/nextjs";

const ArticlesPage = () => {
  const [newsArticles, setNewsArticles] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Clerk Authentication
  const { userId } = useAuth();

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const articles = await getNewsArticlesForUser(userId || "");
        setNewsArticles(articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, [userId]);

  const handleDeleteOption = async (articleId: string) => {
    try {
      await removeArticleForUser(userId || "", articleId);
      console.log(`${userId} article removed`);
      setNewsArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      toast.success("Article removed successfully");
    } catch (error) {
      console.error("Error removing article:", error);
      toast.error("Failed to remove article");
    }
  };

  return (
    <>
      <div className="ml-16">
        <div className="text-[5rem]">{newsArticles.length}</div>
        <div className="text-xl">articles saved</div>
      </div>

      <Divider className="my-5" />

      <div className="container flex justify-center mx-auto mt-8">
        {loading && (
          <div className="flex justify-center mb-4">
            <Progress
              size="md"
              isIndeterminate
              label="Loading Articles..."
              aria-label="Loading Articles..."
              className="max-w-md"
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {newsArticles.map((article, index) => (
            <NewsCard
              key={index}
              {...article}
              showDeleteButton={true}
              onDelete={() => handleDeleteOption(article.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;
