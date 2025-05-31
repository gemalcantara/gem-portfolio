import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'No reCAPTCHA token provided' }, { status: 400 });
    }

    const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    
    // Log the response for debugging (remove in production)
    console.log('reCAPTCHA verification response:', data);
    
    // Check if verification passed and score is acceptable (0.5 is a reasonable threshold)
    if (data.success && data.score >= 0.5) {
      return NextResponse.json({ 
        success: true, 
        score: data.score,
        action: data.action 
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'reCAPTCHA verification failed',
      score: data.score,
      errorCodes: data['error-codes']
    }, { status: 400 });
    
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Verification error' 
    }, { status: 500 });
  }
}
