// Store for tracking submission attempts
const submissionTracker = new Map<string, { count: number; lastSubmission: number }>();

// Rate limit configuration
const RATE_LIMIT = {
  maxAttempts: 3, // Maximum attempts allowed
  windowMs: 3600000, // Time window in milliseconds (1 hour)
  cooldownMs: 3600000 // Cooldown period in milliseconds (1 hour)
};

export const checkSubmissionLimit = (identifier: string): { allowed: boolean; message?: string } => {
  const now = Date.now();
  const userSubmissions = submissionTracker.get(identifier);

  // Clean up old entries
  Array.from(submissionTracker.entries()).forEach(([key, value]) => {
    if (now - value.lastSubmission > RATE_LIMIT.windowMs) {
      submissionTracker.delete(key);
    }
  });

  if (!userSubmissions) {
    // First submission
    submissionTracker.set(identifier, { count: 1, lastSubmission: now });
    return { allowed: true };
  }

  // Check if user is in cooldown period
  if (userSubmissions.count >= RATE_LIMIT.maxAttempts) {
    const timeSinceLastSubmission = now - userSubmissions.lastSubmission;
    if (timeSinceLastSubmission < RATE_LIMIT.cooldownMs) {
      const remainingCooldown = Math.ceil((RATE_LIMIT.cooldownMs - timeSinceLastSubmission) / 60000);
      return {
        allowed: false,
        message: `Too many orders. Please try again in ${remainingCooldown} minutes.`
      };
    } else {
      // Reset after cooldown
      submissionTracker.set(identifier, { count: 1, lastSubmission: now });
      return { allowed: true };
    }
  }

  // Increment submission count
  submissionTracker.set(identifier, {
    count: userSubmissions.count + 1,
    lastSubmission: now
  });
  return { allowed: true };
};

// Validate honeypot field
export const validateHoneypot = (honeypotValue: string | undefined): boolean => {
  return !honeypotValue; // Should be empty for legitimate users
};

// Generate a unique identifier for rate limiting
export const generateSubmissionIdentifier = (email: string, ip: string): string => {
  return `${email.toLowerCase()}-${ip}`;
}; 