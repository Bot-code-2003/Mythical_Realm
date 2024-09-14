# MythicRealm

Welcome to MythicRealm, a unique platform dedicated to exploring and sharing mythical stories, cosmic theories, and fantasy narratives. Our website serves as a hub for those fascinated by the mystical and the unknown, offering a space for both readers and writers to delve into a wide range of genres, including fantasy, cosmic mysteries, dark tales, and more.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Contribution Guidelines](#contribution-guidelines)
6. [Future Plans](#future-plans)
7. [Code Structure](#code-structure)
8. [License](#license)

---

## Project Overview

MythicRealm is designed to be a community-driven platform where users can submit their stories, explore a variety of mythical and cosmic content, and engage with like-minded individuals. The platform offers genre-specific pages, trending stories, and the latest blogs, all organized to provide a seamless and immersive experience.

## Features

- **Genre-Specific Pages**: Explore stories and articles organized by genres such as Fantasy, Cosmic Mysteries and Dark Tales.
- **Engaging Stories**: Discover some of the best original and engaging stories from the community.
- **Publishing Guidelines**: Follow clear guidelines to get your work published on MythicRealm.

## Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS for styling, MUI Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.

## Installation

To run MythicRealm locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Bot-code-2003/Mythical_Realm.git
   ```
2. Navigate to the client folder and install the dependencies (npm i)
3. Navigate to the server folder and install the dependencies (npm i)
4. Start the development server -> npm run dev
5. Start the local server -> nodemon index.js or node index.js

## Contribution Guidelines

We welcome contributions from the community! Whether you're interested in adding new features, fixing bugs, or improving the documentation, your help is appreciated. Please fork the repository, create a new branch, and submit a pull request with your changes.

## Future Plans

- **Subscription Functionality**: Introduce paid subscriptions for premium content.
- **Enhanced User Profiles**: Allow users to customize their profiles with avatars, bios, and a list of their submissions.
- **Mobile App**: Develop a mobile version of MythicRealm for on-the-go access.
- **Story Generator**: Develop a story generator that can inspire users and enable them to co-author with help of ai.

## Code Structure

- **Frontend**: Contains the React components used for the user interface.

  - **Components**: Individual reusable components such as Navbar, Footer, etc (ImageInput, RichEditor, SideDrawer components are not used in this project).
  - **Pages**: auth -> Login page, Admin page -> Admin dashboard(can add topPicks manually from here.), etc.
  - **Actions**: These are used to send api request to server and set the state in reducers folder.
  - **State Management**: Managed using Redux. Key states include `articles`, `stories`, `story`, and `topPicks`.

- **Backend**: Contains the server-side logic.

  - **Routes**: Express routes for handling API requests.
  - **Controllers**: These contain the logic part of routes.
  - **Models**: Mongoose models for interacting with MongoDB.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
