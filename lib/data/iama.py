import praw
import json
import sys

debug = False

reddit = praw.Reddit(client_id=sys.argv[1],
                     client_secret=sys.argv[2],
                     user_agent=sys.argv[3],
                     username=sys.argv[4],
                     password=sys.argv[5])

subreddit = reddit.subreddit('iama')

hot = subreddit.top('month', limit=10)


def qAndA(submission):
    threadAuthor = submission.author
    threadTitle = submission.title
    threadFlair = submission.link_flair_text
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
        'flair': threadFlair,
        'qAndA': questionsAnswers[:20]
    }
    threads.append(thread)


threads = []
already_grabbed = []

for submission in hot:
    qAndA(submission)

print(json.dumps(threads))
