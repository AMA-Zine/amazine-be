import praw
import json

# 12 threads

reddit = praw.Reddit(client_id='7WikPJZQ6etbpw',
                     client_secret='NZMLV1aIDDuSY3HvG4dwnUVzJK9GaA',
                     user_agent='Testing_API',
                     username='Dev-Sandbox',
                     password='Developer4466')

subreddit = reddit.subreddit('iama')

hot = subreddit.top('week', limit=2)


def qAndA(submission):
    threadAuthor = submission.author
    threadTitle = submission.title
    questionsAnswers = []
    thread = {
        'title': threadTitle,
        'qAndA': questionsAnswers
    }

    for comment in submission.comments:
        if comment.id not in already_grabbed:
            try:
                for reply in comment.replies:
                    if reply.author == threadAuthor:
                        x = {
                            'question': comment.body,
                            'answer': reply.body
                        }
                        y = json.dumps(x)
                        questionsAnswers.append(y)
                        already_grabbed.append(comment.id)
            except AttributeError as e:
                print('Error: Out of Replies. Exception: ', e)
    threads.append(thread)


threads = []
already_grabbed = []

for submission in hot:
    qAndA(submission)

print(json.dumps(threads))
