"use client";

// NewsAPI
import { fetchNews, NewsArticle } from "@/utils/news-api";

// React Hooks
import { useState, useEffect } from "react";

// Sub-components
import NewsCard from "@/components/news-card";
import { Pagination, Progress } from "@nextui-org/react";

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(true); // State for loading indicator

  const loadArticlesForPage = async (page: number) => {
    try {
      setLoading(true);
      const articles = await fetchNews(page);
      setNewsArticles(articles);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false); // Set loading to false when done fetching data (success or error)
    }
  };

  useEffect(() => {
    loadArticlesForPage(currentPage);
  }, [currentPage]); // Load initial articles when the component mounts

  const handlePageChange = async (page: number) => {
    await loadArticlesForPage(page);
  };

  console.log(newsArticles);

  return (
    <>
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
            <NewsCard key={index} {...article} showSaveButton={true} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          showControls
          color="warning"
          total={10}
          initialPage={currentPage}
          onChange={handlePageChange}
          className="mt-5"
        />
      </div>
    </>
  );
};

export default NewsSection;
