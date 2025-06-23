// app/api/chart/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get('coinId');
  const currency = searchParams.get('currency') || 'usd';
  const days = searchParams.get('days') || '7';
  
  // Log the request for debugging
  console.log(`Chart API called with: coinId=${coinId}, currency=${currency}, days=${days}`);
  
  if (!coinId) {
    console.error('Missing coinId parameter');
    return NextResponse.json(
      { error: 'coinId parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    console.log(`Fetching from CoinGecko: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; CryptoApp/1.0)',
      },
      // Remove the Next.js specific cache option that might be causing issues
    });

    console.log(`CoinGecko response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinGecko API error: ${response.status} - ${errorText}`);
      
      // Handle specific error cases
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: `Coin "${coinId}" not found` },
          { status: 404 }
        );
      }
      
      throw new Error(`CoinGecko API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched chart data for ${coinId}`);
    
    // Validate the response structure
    if (!data.prices || !Array.isArray(data.prices)) {
      console.error('Invalid response structure from CoinGecko:', data);
      return NextResponse.json(
        { error: 'Invalid data structure received from CoinGecko' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Detailed error fetching chart data:', {
      message: error.message,
      stack: error.stack,
      coinId,
      currency,
      days
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch chart data', 
        details: error.message,
        coinId: coinId 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}