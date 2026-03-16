import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { allParticipants } from "../../../participants.js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const filePath = path.join(process.cwd(), "csv/participants.csv");
  const csv = fs.readFileSync(filePath, "utf-8");
  const { data } = Papa.parse(csv, { header: true });

  const collegeMap = new Map<string, string>();
  (data as any[]).forEach((p) => {
    const name = (p.name || p.Name || "").trim();
    const college = (p.college || p.College || p.organisation || p.Organization || "").trim();
    if (name) collegeMap.set(name.toLowerCase(), college);
  });

  const results = allParticipants
    .filter((name) => name.toLowerCase().includes(q))
    .slice(0, 10)
    .map((name) => ({
      Name: name,
      College: collegeMap.get(name.toLowerCase()) || "",
    }));

  return Response.json(results);
}
