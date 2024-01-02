"use client";

// Image (NextJS)
import Image from "next/image";

// Modal Components
import ShareModal from "./share-modal";

// Icons
import ShareIcon from "@/assets/icons/share-icon";
import StarIcon from "@/assets/icons/star-icon";
import DeleteIcon from "@/assets/icons/delete-icon";

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

// Toast
import toast from "react-hot-toast";

// Firestore
import { addNewsArticle, saveArticleForUser } from "@/utils/firestore";

// Clerk Authentication
import { useAuth } from "@clerk/nextjs";

// Truncate Function
import truncateDescription from "@/utils/truncate";

// Card Interface
import { NewsCardProps } from "@/types/news-card-props";

// Extend the card interface to support conditionally rendering buttons
interface NewsCardPropsWithButtons extends NewsCardProps {
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

const NewsCard = ({
  title,
  description,
  author,
  publishedAt,
  url,
  urlToImage,
  showSaveButton = false,
  showDeleteButton = false,
  onDelete,
}: NewsCardPropsWithButtons) => {
  // Share modal hooks
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onClose: onShareModalClose,
    onOpenChange: onShareModalOpenChange,
  } = useDisclosure();

  // Share option function
  const handleShareOption = (option: string) => {
    switch (option) {
      case "email":
        const emailSubject = encodeURIComponent(title || "");
        const emailBody = encodeURIComponent(`${title}\n${url}`);
        const emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = emailLink;
        break;
      case "facebook":
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url || ""
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
    onShareModalClose();
  };

  // Clerk Authentication
  const { userId } = useAuth();

  // Save button function
  const handleSaveOption = async () => {
    if (userId) {
      try {
        const articleId = await addNewsArticle({
          title,
          description,
          author,
          publishedAt,
          url,
          urlToImage,
        });

        // Next, save the article for the user
        await saveArticleForUser(userId, articleId);

        // Display success message
        toast.success("Article added to your saved list!");
      } catch (error) {
        console.error("Error adding news article:", error);
        // Display an error message
        toast.error("Failed to save the article. Please try again later.");
      }
    } else {
      // Suggest user to sign in
      toast.error("Please sign in to save the article.");
      console.log("User not authenticated. Redirecting to login...");
      return;
    }
  };

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            src={urlToImage || "https://loremflickr.com/640/320"}
            alt={title || "title"}
            width={640}
            height={320}
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
            {new Date(publishedAt || "").toLocaleDateString()}
          </p>

          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: truncateDescription(description, 2) || "",
            }}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="w-full flex items-center">
            <Link isExternal showAnchorIcon href={url}>
              Read more
            </Link>
            <div className="flex items-end gap-2 ml-auto">
              {/* Save Button */}
              {showSaveButton && (
                <Button
                  isIconOnly
                  color="default"
                  aria-label="Save"
                  onClick={handleSaveOption}
                >
                  <StarIcon />
                </Button>
              )}

              {/* Delete Button */}
              {showDeleteButton && (
                <Button
                  isIconOnly
                  color="default"
                  aria-label="Delete"
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </Button>
              )}

              {/* Share Button */}
              <Button
                isIconOnly
                color="default"
                aria-label="Share"
                onClick={onShareModalOpen}
              >
                <ShareIcon />
              </Button>

              {/* Share Modal */}
              <ShareModal
                isOpen={isShareModalOpen}
                onClose={onShareModalClose}
                onOpenChange={onShareModalOpenChange}
                onShareOption={handleShareOption}
                articleUrl={url || ""}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default NewsCard;
