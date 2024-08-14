# Chess Website - CS50w Final Project

Project completion: September 2023  

## Summary

This project is a full-stack chess website created as the final project for CS50w. The goal of this project was to showcase my capabilities after a year of programming, solidify knowledge from CS50w and CS50ai, and expand into a full-stack application. The project's focus was on building a chess website with various features, including a chessboard, forums, news, leaderboards, and AI chess gameplay. The goal was not to simply showcase I learned, but to further expand those skills.  
See demonstration here -> https://youtu.be/SLcckZxvSYw

## Distinctiveness and Complexity

The project satisfies the distinctiveness and complexity requirements by encompassing the following components:

1. **Website Design**: The project begins with a basic layout and sidebar. The design evolved to become mobile-friendly and responsive, demonstrating a comprehensive understanding of web design principles and Bootstrap.

2. **Chessboard**: The implementation of the chessboard was achieved through the use of chess.js and chessboard.js. These libraries provide interactive chessboard functionality, including game logic, legal moves, and player vs. random AI gameplay.

3. **User Authentication**: Users can register and log in/out, showcasing a robust backend implementation of user authentication using Django.

4. **Forums**: The project includes a forums section where users can interact with one another, post threads, and discuss various topics. The backend is built using Django models for effective database management.

5. **News**: A web scraper is utilized to fetch news articles from chess.com, demonstrating the ability to gather and format external data. This component was improved by implementing web scraping for news articles.

6. **Leaderboards**: The project initially aimed to incorporate the python chessdotcom API to display player rankings, showing my ability to integrate external APIs. However, this was eventually implemented in JavaScript due to API-related issues.

7. **Version Control and Virtual Environment**: Best practices in version control using Git and virtual environment management are emphasized to maintain project integrity and manage dependencies effectively.

8. **AI Implementation**: I plans to introduce AI chess gameplay, including their own chess engine and chatbots. This represents a complex and challenging addition to the project.

## Key Files

- **layout.html**: The base template that all pages inherit, providing a consistent layout for the entire website. Lays the foundation for style/format as well as building a mobile responsive sidebar that links to all other URL's.

- **chess.js** and **chessboard.js** and **chess_logic.js**: These files contain the JavaScript code for the chessboard, including game logic, legal moves, and player vs. random AI functionality.

- **index.js**: Main javascript file to handle non-chessboard logic like dynamic HTML and API's for the leaderboards.

- **scrape.py**: Web scraper for the news section.

- **views.py**: This file defines view functions for the chess website, handling user authentication, rendering templates, and providing functionality for key features like playing chess, viewing news, and participating in forums.

- **README.md**: This file provides an overview of the project, its components, and how to run the application.

## How to Run the Application

To run the application, follow these steps:

1. Ensure you have Python 3.11 installed on your system.

2. Create a virtual environment for the project to manage dependencies.

3. Clone the project repository to your local machine.

4. Install the necessary packages using `pip install -r requirements.txt`.

5. Run the Django development server using `python manage.py runserver`.

6. Access the website in your web browser at `http://localhost:8000`.





