import analyzeSentiment from "@/services/sentiment-analysis";

const apiKey = process.env.NEXT_PUBLIC_GUARDIAN_NEWS_API_KEY;
const apiUrl = "http://content.guardianapis.com/search";

export interface NewsArticle {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
}

interface GuardianApiResponse {
  response: {
    status: string;
    results: GuardianApiArticle[];
  };
}

interface GuardianApiArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    trailText: string; // Update to include trailText for description
    thumbnail: string;
  };
  tags: GuardianApiTag[];
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

interface GuardianApiTag {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
}

export const fetchNews = async (page: number): Promise<NewsArticle[]> => {
  const articlesPerPage = 6;
  const pageSize = 120; // Set the desired page size

  try {
    const response = await fetch(
      `${apiUrl}?page=1&api-key=${apiKey}&show-fields=thumbnail,trailText&show-tags=contributor&page-size=${pageSize}`
    );
    const data: GuardianApiResponse = await response.json();

    if (data.response.status === "ok") {
      const filteredArticles = data.response.results
        .filter((article) => article.webTitle !== "[Removed]") // filter out [Removed] title
        .map((article) => {
          const author =
            article.tags && article.tags.length > 0
              ? article.tags[0].webTitle
              : "Anonymous";

          return {
            title: article.webTitle,
            description: article.fields.trailText, // Use trailText for description
            author: author,
            publishedAt: article.webPublicationDate,
            url: article.webUrl,
            urlToImage: article.fields.thumbnail,
            sentimentScore: analyzeSentiment(article.webTitle), // add sentiment analysis score
          };
        })
        .filter((article) => article.sentimentScore > 0); // filter out only positive articles

      // Calculate start and end indices for the current page
      const startIndex = (page - 1) * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;

      // Return only the required number of articles for the current page
      return filteredArticles.slice(startIndex, endIndex);
    } else {
      throw new Error("Error fetching news");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Error fetching news");
  }
};
