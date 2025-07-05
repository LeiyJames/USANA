import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Redis environment variables are not set')
}

// Create Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Rate limiting functions
export async function checkRateLimit(identifier: string): Promise<{ allowed: boolean; message?: string }> {
  const now = Date.now()
  const key = `order_limit:${identifier}`
  
  // Get current attempts
  const attempts = await redis.get<{ count: number; timestamp: number }>(key)
  
  if (!attempts) {
    // First attempt
    await redis.set(key, { count: 1, timestamp: now }, { ex: 3600 }) // Expire in 1 hour
    return { allowed: true }
  }

  // Check if we're still within the time window
  if (now - attempts.timestamp < 3600000) { // 1 hour in milliseconds
    if (attempts.count >= 3) {
      const remainingTime = Math.ceil((3600000 - (now - attempts.timestamp)) / 60000)
      return {
        allowed: false,
        message: `Too many orders. Please try again in ${remainingTime} minutes.`
      }
    }
    
    // Increment attempt count
    await redis.set(key, {
      count: attempts.count + 1,
      timestamp: attempts.timestamp
    }, { ex: 3600 })
    
    return { allowed: true }
  }
  
  // Reset if time window has passed
  await redis.set(key, { count: 1, timestamp: now }, { ex: 3600 })
  return { allowed: true }
} 