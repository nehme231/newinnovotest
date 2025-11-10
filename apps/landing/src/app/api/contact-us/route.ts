// app/api/submit-form/route.js

import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { v4, v4 as uuidv4 } from 'uuid';
import { validateTurnstileToken } from 'next-turnstile';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming form data
    let formData = await request.json();

    const validationResponse = await validateTurnstileToken({
      token: formData.token,
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
      idempotencyKey: v4(),
    });

    if (!validationResponse.success) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    // remove token from form data
    formData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => key !== 'token')
    );

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the Google Spreadsheet
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_LEADS_ID as string,
      serviceAccountAuth
    );

    // Load the document properties and worksheets
    await doc.loadInfo();

    // Select the first sheet
    const sheet = doc.sheetsByIndex[0];
    // Append a new row with form data

    // console.log('formData', formData, Object.values(formData));
    // console.log([
    //   ...Object.values(formData as Record<string, string>),
    //   uuidv4(),
    //   0,
    // ]);

    // await sheet.addRow(Object.values(formData));

    await sheet.addRow([
      ...Object.values(formData as Record<string, string>),
      uuidv4(),
      0,
    ]);

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: any) {
    console.error('Error adding row to Google Sheet:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
