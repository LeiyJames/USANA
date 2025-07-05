import { NextApiRequest, NextApiResponse } from 'next';
import { generateSubmissionIdentifier } from '@/utils/orderSecurity';
import { checkRateLimit } from '@/utils/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Get client IP
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? 
      (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0]) : 
      req.socket.remoteAddress || 'unknown';

    const identifier = generateSubmissionIdentifier(email, ip);
    const checkResult = await checkRateLimit(identifier);

    if (!checkResult.allowed) {
      return res.status(429).json({ error: checkResult.message });
    }

    res.status(200).json({ allowed: true });
  } catch (error) {
    console.error('Rate limit check error:', error);
    res.status(500).json({ error: 'Failed to check rate limit' });
  }
} 