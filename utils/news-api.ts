const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_ENDPOINT = "https://newsapi.org/v2/top-headlines";

export interface NewsArticle {
	title: string;
	description: string;
	author: string;
	publishedAt: string;
	url: string;
	urlToImage: string;
}

export const getNewsArticles = async () => {
	try {
		const response = await fetch(
			`${NEWS_API_ENDPOINT}?apiKey=${NEWS_API_KEY}&country=us&category=general`
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch news articles. Status: ${response.status}`
			);
		}

		const data = await response.json();
		return data.articles || [];
	} catch (error) {
		console.error("Error fetching news articles:", error);
		return [];
	}
};
