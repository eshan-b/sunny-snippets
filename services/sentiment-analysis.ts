import Sentiment from "sentiment";

const sentiment = new Sentiment();

export default function analyzeSentiment(text: string) {
	const result = sentiment.analyze(text);
	return result.score;
}
