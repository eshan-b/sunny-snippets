"use client";

// NewsAPI
import { fetchNews, NewsArticle } from "@/utils/news-api";

// React Hooks
import { useState, useEffect } from "react";

// Sub-components
import NewsCard from "@/components/news-card";

import { Pagination } from "@nextui-org/react";

// const newsArticles = [
//   {
//     title: "Auto Workers Had a Great Year. But Can It Continue?",
//     description:
//       "After decades of decline, the UAW scored big victories in 2023. Here's what to watch for in 2024",
//     author: "Kristin Dziczek",
//     publishedAt: "2023-12-15T19:26:35Z",
//     url: "https://www.wsj.com/business/autos/united-auto-workers-2023-e12c1400",
//     urlToImage: "https://images.wsj.net/im-900482/social",
//   },
//   {
//     title:
//       "Commodities Carriers Star Bulk and Eagle Bulk Shipping Agree to $2.1 Billion Merger",
//     description:
//       "The marriage of the New York-listed ocean carriers aims to boost investor interest",
//     author: "Costas Paris",
//     publishedAt: "2023-12-12T01:46:00Z",
//     url: '"https://www.wsj.com/business/energy-oil/commodities-carriers-star-bulk-and-eagle-bulk-shipping-agree-to-2-1-billion-merger-3a140a07',
//     urlToImage: "https://images.wsj.net/im-899070/social",
//   },
//   // Add more articles as needed
// ];

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const loadArticlesForPage = async (page: number) => {
    try {
      const articles = await fetchNews(page);
      setNewsArticles(articles);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading articles:", error);
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
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsArticles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          showControls
          color="warning"
          total={3}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NewsSection;
