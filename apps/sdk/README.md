# Postiz NodeJS SDK

This is the NodeJS SDK for [Postiz](https://postiz.com).

You can start by installing the package:

```bash
npm install @postiz/node
```

## Usage
```typescript
import Postiz from '@postiz/node';
const postiz = new Postiz('your api key', 'your self-hosted instance (optional)');
```

### Example: Creating a post with image URLs
```typescript
const postData = {
  type: 'now',
  shortLink: false,
  date: '2024-12-14T10:00:00Z',
  tags: [{ value: 'example', label: 'Example' }],
  posts: [{
    integration: { id: 'your-integration-id' },
    value: [{
      content: 'Check out this amazing image!',
      imageUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.png'
      ]
    }]
  }]
};

const result = await postiz.postWithUrls(postData);
```

The available methods are:
- `post(posts: CreatePostDto)` - Schedule a post to Postiz
- `postWithUrls(posts: CreatePostUrlDto)` - Schedule a post with image URLs (automatically uploads images)
- `postList(filters: GetPostsDto)` - Get a list of posts
- `upload(file: Buffer, extension: string)` - Upload a file to Postiz
- `integrations()` - Get a list of connected channels
- `deletePost(id: string)` - Delete a post by ID

Alternatively you can use the SDK with curl, check the [Postiz API documentation](https://docs.postiz.com/public-api) for more information.