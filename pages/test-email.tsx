import { useEffect, useState } from 'react';
import { emailjsConfig } from '@/config/emailjs';
import { sendEmail } from '@/utils/emailService';

export default function TestEmail() {
  const [configStatus, setConfigStatus] = useState({
    serviceId: false,
    templateId: false,
    orderTemplateId: false,
    publicKey: false
  });
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setConfigStatus({
      serviceId: !!emailjsConfig.serviceId,
      templateId: !!emailjsConfig.templateId,
      orderTemplateId: !!emailjsConfig.orderTemplateId,
      publicKey: !!emailjsConfig.publicKey
    });
  }, []);

  const handleTestEmail = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      const result = await sendEmail({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Email',
        message: 'This is a test email to verify EmailJS configuration'
      });
      
      setTestResult(result.message);
    } catch (error) {
      setTestResult(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">EmailJS Configuration Test</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Configuration Status:</h2>
        <ul className="space-y-2">
          <li>Service ID: {configStatus.serviceId ? '✅' : '❌'}</li>
          <li>Template ID: {configStatus.templateId ? '✅' : '❌'}</li>
          <li>Order Template ID: {configStatus.orderTemplateId ? '✅' : '❌'}</li>
          <li>Public Key: {configStatus.publicKey ? '✅' : '❌'}</li>
        </ul>
      </div>

      <button
        onClick={handleTestEmail}
        disabled={isLoading || !Object.values(configStatus).every(Boolean)}
        className={`px-4 py-2 rounded ${
          isLoading || !Object.values(configStatus).every(Boolean)
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Sending...' : 'Send Test Email'}
      </button>

      {testResult && (
        <div className={`mt-4 p-4 rounded ${
          testResult.includes('success') ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {testResult}
        </div>
      )}
    </div>
  );
} 