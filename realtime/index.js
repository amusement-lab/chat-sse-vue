import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

let clients = [];
const facts = ["Fact 1", "Fact 2"];

app.get("/", (req, res) => {
  res.json({ message: "SSE server is running" });
});

app.get("/status", (req, res) => {
  res.json({ clients: clients.length });
});

function eventsHandler(req, res, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  res.write(data);

  const clientId = uuidv4();

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}
app.get("/events", eventsHandler);

app.post("/add", (req, res) => {
  console.log(req.body);
  facts.push(req.body);

  for (let i = 0; i < clients.length; i++) {
    console.log(i);
    clients[i].res.write(`data: ${JSON.stringify(facts)}\n\n`);
  }

  res.json({ message: "Add success" });
});

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});

// const myList = [
//   { id: 1, number: 10 },
//   { id: 2, number: 20 },
//   { id: 3, number: 30 },
//   { id: 4, number: 40 },
//   { id: 5, number: 50 },
// ];
// const simpleList = myList.filter((data) => data.abcd > 20);
// console.log(simpleList);
