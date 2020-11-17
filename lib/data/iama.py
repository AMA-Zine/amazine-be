import praw
import json

debug = False

reddit = praw.Reddit(client_id='7WikPJZQ6etbpw',
                     client_secret='NZMLV1aIDDuSY3HvG4dwnUVzJK9GaA',
                     user_agent='Testing_API',
                     username='Dev-Sandbox',
                     password='Developer4466')

subreddit = reddit.subreddit('iama')

hot = subreddit.top('month', limit=10)


def qAndA(submission):
    threadAuthor = submission.author
    threadTitle = submission.title
    questionsAnswers = []

    for comment in submission.comments:
        if comment.id not in already_grabbed:
            try:
                for reply in comment.replies:
                    if reply.author == threadAuthor:
                        x = {
                            'question': comment.body,
                            'answer': reply.body
                        }

                        questionsAnswers.append(x)
                        already_grabbed.append(comment.id)
            except:
                if debug:
                    print('ERROR')
    thread = {
        'title': threadTitle,
        'qAndA': questionsAnswers[:20]
    }
    threads.append(thread)


threads = []
already_grabbed = []

for submission in hot:
    qAndA(submission)

print(json.dumps(threads))
