import Image from "next/image";

interface NewsCardProps {
	title: string;
	description: string;
	author: string;
	publishedAt: string;
	url: string;
	urlToImage: string;
}

const truncateDescription = (
	text: string | null | undefined,
	sentenceCount: number
) => {
	if (!text || typeof text !== "string") {
		return ""; // or a default value if appropriate
	}

	const sentences = text.split(". ");
	return sentences.slice(0, sentenceCount).join(". ") + "...";
};

const NewsCard = ({
	title,
	description,
	author,
	publishedAt,
	url,
	urlToImage,
}: NewsCardProps) => {
	return (
		<div className="border p-4 m-4 rounded-lg shadow-md">
			{/* change to Image class */}
			<img
				src={urlToImage}
				alt={title}
				className="mb-4 rounded-lg w-full h-32 object-cover"
			/>

			<h2 className="text-xl font-bold mb-2">{title}</h2>

			<p className="text-gray-700 mb-2">
				<span className="font-semibold">Author:</span> {author}
			</p>

			<p className="text-gray-700 mb-2">
				<span className="font-semibold">Published:</span>{" "}
				{new Date(publishedAt).toLocaleDateString()}
			</p>

			<p className="text-gray-700 mb-4">
				{truncateDescription(description, 2)}
			</p>

			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-500 hover:underline"
			>
				Read more
			</a>
		</div>
	);
};

export default NewsCard;
