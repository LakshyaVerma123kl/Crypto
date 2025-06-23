// app/api/test/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get("coinId") || "bitcoin";

  try {
    // Test basic CoinGecko API connectivity
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; CryptoApp/1.0)",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json({
      status: "success",
      coingecko_status: response.status,
      test_data: data,
      timestamp: new Date().toISOString(),
      coinId: coinId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
        coinId: coinId,
      },
      { status: 500 }
    );
  }
}
