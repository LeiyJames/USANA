// Simple in-memory rate limiting implementation
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = {
  maxAttempts: 5, // Maximum attempts allowed
  windowMs: 3600000, // Time window in milliseconds (1 hour)
};

export async function checkRateLimit(identifier: string) {
  const now = Date.now();
  const userLimit = rateLimitStore.get(identifier);

  // Clean up old entries
  Array.from(rateLimitStore.entries()).forEach(([key, value]) => {
    if (now - value.timestamp > RATE_LIMIT.windowMs) {
      rateLimitStore.delete(key);
    }
  });

  if (!userLimit) {
    // First attempt
    rateLimitStore.set(identifier, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (now - userLimit.timestamp > RATE_LIMIT.windowMs) {
    // Reset after window
    rateLimitStore.set(identifier, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (userLimit.count >= RATE_LIMIT.maxAttempts) {
    const remainingTime = Math.ceil((RATE_LIMIT.windowMs - (now - userLimit.timestamp)) / 60000);
    return {
      allowed: false,
      message: `Too many attempts. Please try again in ${remainingTime} minutes.`
    };
  }

  // Increment attempt count
  rateLimitStore.set(identifier, {
    count: userLimit.count + 1,
    timestamp: userLimit.timestamp
  });

  return { allowed: true };
} 