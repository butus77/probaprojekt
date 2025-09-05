import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let reqBody;
  try {
    reqBody = await request.json();

  // Server-side validation
  const { name, email, message } = reqBody;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || !/^[\S]+@[\S]+\.[\S]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body. Failed to parse JSON.' }, { status: 400 });
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  if (!formspreeEndpoint) {
    console.error('FORMSPREE_ENDPOINT environment variable is not set.');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    const responseJson = await response.json();

    if (response.ok) {
      return NextResponse.json(responseJson, { status: 200 });
    } else {
      return NextResponse.json(responseJson, { status: response.status || 400 });
    }
  } catch (error) {
    console.error('Error submitting to Formspree:', error);
    return NextResponse.json({ error: 'Failed to submit form.' }, { status: 500 });
  }
}
