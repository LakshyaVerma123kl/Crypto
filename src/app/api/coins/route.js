// app/api/coins/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency") || "usd";

  console.log(`Coins API called with currency: ${currency}`);

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    console.log(`Fetching from CoinGecko: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; CryptoApp/1.0)",
      },
    });

    console.log(`CoinGecko response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinGecko API error: ${response.status} - ${errorText}`);

      // Handle specific error cases
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      throw new Error(`CoinGecko API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.length} coins`);

    // Validate the response structure
    if (!Array.isArray(data)) {
      console.error("Invalid response structure from CoinGecko:", data);
      return NextResponse.json(
        { error: "Invalid data structure received from CoinGecko" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Detailed error fetching coin data:", {
      message: error.message,
      stack: error.stack,
      currency,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch coin data",
        details: error.message,
        currency: currency,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
