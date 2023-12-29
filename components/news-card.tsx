"use client";

// Modal Component
import ShareModal from "./share-modal";

// Icons
import ShareIcon from "@/assets/icons/share-icon";
import StarIcon from "@/assets/icons/star-icon";

// NextUI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleShareOption = (option: string) => {
    switch (option) {
      case "copyLink":
        // Implement the logic for copying the article link to the clipboard
        console.log("Copying link to clipboard");
        break;
      case "email":
        const emailSubject = encodeURIComponent(title);
        const emailBody = encodeURIComponent(`${title}\n${url}`);
        const emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = emailLink;
        break;
      case "facebook":
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        window.open(facebookShareUrl, "_blank");
        break;
      case "twitter":
        const tweetText = encodeURIComponent(`${title} ${url}`);
        const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(twitterIntentUrl, "_blank");
        break;
      default:
        break;
    }

    // Close once action is complete
    onClose();
  };

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <img
            src={urlToImage}
            alt={title}
            className="mb-4 rounded-lg w-full h-32 object-cover"
          />
        </CardHeader>
        <Divider />
        <CardBody>
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
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="w-full flex items-center">
            <Link isExternal showAnchorIcon href={url}>
              Read more
            </Link>
            <div className="flex items-end gap-2 ml-auto">
              {/* Like Button */}
              <Button isIconOnly color="warning" aria-label="Like">
                <StarIcon />
              </Button>

              {/* Share Button */}
              <Button
                isIconOnly
                color="default"
                aria-label="Share"
                onClick={onOpen}
              >
                <ShareIcon />
              </Button>

              {/* Share Modal */}
              <ShareModal
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                onShareOption={handleShareOption}
                articleUrl={url}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default NewsCard;
