DROP TABLE IF EXISTS threads;

CREATE TABLE threads (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  flair TEXT,
  upvotes INT,
  downvotes INT,
  image TEXT
);

DROP TABLE IF EXISTS responses;

CREATE TABLE responses (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  q_and_a JSONB,
  thread_id BIGINT NOT NULL REFERENCES threads(id)
);
