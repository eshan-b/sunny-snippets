# Sunny Snippets

Sunny Snippets is a positive news web application built with Next.js and Tailwind CSS. It displays uplifting news articles and provides sentiment analysis to filter out articles with negative sentiment scores.

## Features

- Display positive news articles in a card format.
- Navbar with logo and login section.
- Hero section with a warm welcome to the app.
- Integration with the NewsAPI to fetch real-time news data.
- Sentiment analysis to filter articles based on positivity.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- NewsAPI key. Obtain it [here](https://newsapi.org/).
- Clerk Key
- Firebase key

### Installation

1. **Clone the Repository**

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your NewsAPI key:

   ```bash
   NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key
   ```

4. **Run the Application**:

   ```bash
   npm run dev
   ```

   The app will be available at http://localhost:3000.

## Technologies Used

<!-- prettier-ignore -->
| Technology | Purpose |
|------------|---------|
| <img src="./images/nextjs-logo.png" alt="Next.js Logo" height="20" width="20"/> [Next.js](https://nextjs.org/) | React framework for building web applications |
| <img src="./images/react-logo.png" alt="React Logo" height="20" width="20"/> [React](https://reactjs.org/) | JavaScript library for building user interfaces |
| <img src="./images/tailwindcss-logo.png" alt="Tailwind CSS Logo" height="20" width="20"/> [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for styling |
| <img src="./images/nextUI-logo.png" alt="NextUI Logo" height="20" width="20"/> [NextUI](https://nextui.org/) | UI library for Tailwind CSS with theming support |
| <img src="./images/newsapi-logo.png" alt="JS Logo" height="20" width="20"/> [NewsAPI](https://newsapi.org/) | API for fetching news articles |
| <img src="./images/npm-logo.png" alt="Sentiment Logo" height="20" width="20"/> [sentiment](https://www.npmjs.com/package/sentiment) | AFINN sentiment analysis library |
| <img src="./images/js-logo.png" alt="JS Logo" height="20" width="20"/> [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) | Web API for making HTTP requests |
| <img src="./images/clerk-logo.png" alt="JS Logo" height="20" width="20"/> [Clerk](https://clerk.com) | Multi-Factor Authentication service |
| <img src="./images/firebase-logo.png" alt="JS Logo" height="20" width="20"/> [Firebase](https://firebase.google.com/) | NoSQL database for a serverless backend |

## Contributing

If you have any suggestions, enhancements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
