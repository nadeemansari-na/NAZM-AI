import "dotenv/config"
export const env={
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID:process.env.GITHUB_ID,
    GITHUB_CLIENT_SECRET:process.env.GITHUB_SECRET

}