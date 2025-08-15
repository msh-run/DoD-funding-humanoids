// File: /api/sam-search.js
export default async function handler(req, res) {
 const { keyword, postedFrom, postedTo } = req.query;
 const apiKey = process.env.SAM_API_KEY;

 const url = `https://api.sam.gov/opportunities/v2/search?api_key=${apiKey}&postedFrom=${postedFrom}&postedTo=${postedTo}&limit=10&title=${encodeURIComponent(keyword)}`;

 try {
 const response = await fetch(url);
 const data = await response.json();
 res.status(200).json(data);
 } catch (e) {
 res.status(500).json({ error: e.toString() });
 }
}
