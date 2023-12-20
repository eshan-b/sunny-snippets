import analyzeSentiment from "@/services/sentiment-analysis";

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const apiUrl = "https://newsapi.org/v2/top-headlines";
const country = "us";

export interface NewsArticle {
	title: string;
	description: string;
	author: string;
	publishedAt: string;
	url: string;
	urlToImage: string;
}

export const fetchNews = async (): Promise<NewsArticle[]> => {
	try {
		const response = await fetch(
			`${apiUrl}?country=${country}&apiKey=${apiKey}`
		);
		const data = await response.json();

		if (data.status === "ok") {
			const filteredArticles = data.articles
				.filter((article: any) => article.title !== "[Removed]") // filter out [Removed] title
				.map((article: any) => ({
					title: article.title,
					description: article.description,
					author: article.author || "Anonymous", // replace null authors with "Anonymous"
					publishedAt: article.publishedAt,
					url: article.url,
					urlToImage: article.urlToImage,
					sentimentScore: analyzeSentiment(article.title), // add sentiment analysis score
				}))
				.filter((article: any) => article.sentimentScore > 0); // filter out only positive articles

			return filteredArticles;
		} else {
			throw new Error("Error fetching news");
		}
	} catch (error) {
		console.error("Error fetching news:", error);
		throw new Error("Error fetching news");
	}
};
