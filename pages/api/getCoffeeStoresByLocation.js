// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchCoffeeStores } from "../../lib/coffee-stores";
export default async function getCoffeeStoreByLocation(req, res) {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    res.json({ message: "Something went wrong!", err });
  }
}
