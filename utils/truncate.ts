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

export default truncateDescription;
