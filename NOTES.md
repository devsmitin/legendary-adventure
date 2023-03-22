# Flow

1. The user lands on app.
2. Enters their username.
3. Anonymous signin registers
4. App checks if user exists in firebase list

if yes then

1. User gets logged in automatically
2. App updates last access date for user

if no then

1. Show error message to user
2. If user click on new

## data structure

```json
{
  "users": {
    "u1": {
      "registered on": 123,
      "last seen": 123,
      "settings": {},
      "tasks": ["t1", "t2"]
    }
  },

  "tasks": {
    "u1": {
      "t1": {
        "title": "abc",
        "content": "qwerty",
        "created": 123,
        "updated": 123
      },
      "t2": {
        "title": "abc",
        "content": "qwerty",
        "created": 123,
        "updated": 123
      }
    }
  }
}
```
