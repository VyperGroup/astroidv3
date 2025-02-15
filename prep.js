import fs from "fs";
import path from "node:path";

fs.readdir("static/worksheets/api", (err, dirFiles) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  dirFiles.forEach((dirFile) => {
    if (dirFile.endsWith(".json") && !dirFile.endsWith(".min.json")) {
      const filePath = path.join(path.resolve(), "static/worksheets/api", dirFile);
      const minFilePath = filePath.replace(".json", ".min.json");
      fs.unlink(minFilePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error("Error deleting file:", err);
        }
      });
      const jsonData = fs.readFileSync(filePath, "utf8");
      fs.writeFileSync(minFilePath, JSON.stringify(JSON.parse(jsonData)));
    }
  });
});