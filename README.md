# AMAZine


AMAZine is a webzine featuring interviews scraped from Reddit's "Ask Me Anything" subreddit.


### AMAZine was designed by:
1. Sarah Rector
2. Josh Olloqui
3. Patrick Wilson
4. Michelle Stermitz


### Database ERD
1. Table 1 is threads. It is responsible for holding the id (primary key), title (text), author (text), link flair (text), upvotes (number), downvotes (number), and image (text). This will be used to hold all the information needed to populate the front page.

2. Table 2 is responses. It is responsible for holding the information for each individual item the user clicks on the front page. It will include the id (primary key), questions and answers (json b), thread id (to reference treads table)
