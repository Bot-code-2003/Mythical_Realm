# MythicRealm

Welcome to MythicRealm, a unique platform dedicated to exploring and sharing mythical stories, cosmic theories, and fantasy narratives. Our website serves as a hub for those fascinated by the mystical and the unknown, offering a space for both readers and writers to delve into a wide range of genres, including fantasy, cosmic mysteries, dark tales, and more.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contribution Guidelines](#contribution-guidelines)
7. [Future Plans](#future-plans)
8. [Code Structure](#code-structure)
9. [License](#license)

---

## Project Overview

MythicRealm is designed to be a community-driven platform where users can submit their stories, explore a variety of mythical and cosmic content, and engage with like-minded individuals. The platform offers genre-specific pages, trending stories, and the latest blogs, all organized to provide a seamless and immersive experience.

## Features

- **Genre-Specific Pages**: Explore stories and articles organized by genres such as Fantasy, Cosmic Mysteries, Dark Tales, and more.
- **Trending & Latest Content**: Discover what's popular and fresh in the world of myths and fantasies.
- **User Submissions**: Submit your own stories and have them reviewed and featured on the platform.
- **Engagement**: Like and comment on stories, and participate in discussions with other users.
- **Publishing Guidelines**: Follow clear guidelines to get your work published on MythicRealm.

## Technologies Used

- **Frontend**: React.js, Vite, TipTap for rich text editing, Tailwind CSS for styling, MUI Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Other Tools**: Jodit Editor for rich text editing, mammoth.js for DOC to HTML conversion.

## Installation

To run MythicRealm locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MythicRealm.git
2. Navigate to the client folder and install the dependencies (npm i)
3. Navigate to the server folder and install the dependencies (npm i)
4. Start the development server -> npm run dev
5. Start the local server -> nodemon index.js

## Usage

Once the development server is running, you can explore the platform, submit stories, and interact with the community. The website's design is aimed at creating an engaging and mystical experience, so feel free to dive into the content!

## Contribution Guidelines

We welcome contributions from the community! Whether you're interested in adding new features, fixing bugs, or improving the documentation, your help is appreciated. Please fork the repository, create a new branch, and submit a pull request with your changes.


## Future Plans

- **Subscription Functionality**: Introduce paid subscriptions for premium content.
- **Enhanced User Profiles**: Allow users to customize their profiles with avatars, bios, and a list of their submissions.
- **Advanced Search**: Implement advanced search filters to help users find specific types of content.
- **Mobile App**: Develop a mobile version of MythicRealm for on-the-go access.

## Code Structure

- **Frontend**: Contains the React components used for the user interface.
  - **Components**: Individual reusable components such as Navbar, HeroSection, RichEditor, etc.
  - **Pages**: Main pages.
  - **Actions**: These are used to send api request to server and set the state in reducers folder.
  - **State Management**: Managed using Redux. Key states include `article`, `singleArticle`, `stories`, and `singleStory`.

- **Backend**: Contains the server-side logic.
  - **Routes**: Express routes for handling API requests.
  - **Controllers**: These contain the logic part of routes.
  - **Models**: Mongoose models for interacting with MongoDB.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

