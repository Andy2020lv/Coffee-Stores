import { table, getMinifiedRecords } from "../../lib/airtable";

const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
    try {
      //find a record

      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = getMinifiedRecords(findCoffeeStoreRecords);

        res.json(records);
      } else {
        //create a record
        if (name) {
          const createRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);

          const records = getMinifiedRecords(createRecords);
          res.json({ records: records });
        } else {
          res.status(400);
          res.json({ message: "Id or name was not provided" });
        }
      }
    } catch (err) {
      console.error("Error creating or finding store", err);
      res.status(500);
      res.json({ message: "Error creating or finding store", err });
    }
  }
};

export default createCoffeeStore;
