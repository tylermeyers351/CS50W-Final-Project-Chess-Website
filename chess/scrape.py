import requests
from bs4 import BeautifulSoup


def scrape_chess_news(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    articles = []

    # Grab all elements with 'article' and 'post-preview-component' class from webpage
    article_elements = soup.find_all('article', class_='post-preview-component')

    for article in article_elements[:5]:  # Limit to the first 10 articles
        title = article.find('h2').text.strip()
        preview = article.find('p', class_="post-preview-excerpt").text.strip()

        image_url = article.find('img', class_="post-preview-thumbnail")['src']
        
        author = article.find('a', class_='post-preview-meta-username').text.strip()
        time = article.find('span', class_='post-preview-meta-content').text.strip()
        link = article.find('a', class_="post-preview-image")['href']

        article_data = {
            'title': title,
            'preview': preview,
            'image_url': image_url,
            'author': author,
            'time': time,
            'link': link
        }

        articles.append(article_data)

    return articles

# Call function. (Articles is passed to views.py).
url = 'https://www.chess.com/articles'
articles = scrape_chess_news(url)

# For testing
# for idx, article in enumerate(chess_news, 1):
#     print(f"Article {idx}:")
#     print(f"Title: {article['title']}")
#     print(f"Preview: {article['preview']}")
#     print(f"Image URL: {article['image_url']}")
#     print(f"Author: {article['author']}")
#     print(f"Time: {article['time']}")
#     print(f"Link: {article['link']}")
#     print()