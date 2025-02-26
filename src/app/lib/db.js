import { Redis } from '@upstash/redis';



export const db = new Redis({
  url: "https://content-starfish-42954.upstash.io",   // Use environment variables
  token: "AafKAAIjcDEzNDE4NTMyZmIxNjA0MjE1YWYzMzJhZWU2MDQ2N2UwYXAxMA",
});

async function testRedis() {
  try {
    await db.set('foo', 'bar');
    const data = await db.get('foo');
    //console.log('Data from Redis:', data);
  } catch (error) {
    console.error('Redis Error:', error);
  }
}

testRedis();
