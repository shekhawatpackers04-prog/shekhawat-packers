const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "content", "blog");
const outputDir = path.join(__dirname, "posts");
const outputFile = path.join(outputDir, "index.json");

if (!fs.existsSync(blogDir)) {
  console.log("Blog directory not found:", blogDir);
  process.exit(0);
}

fs.mkdirSync(outputDir, { recursive: true });

function parseFrontMatter(content) {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);

  if (!match) {
    return {};
  }

  const frontMatter = {};
  
  match[1].split("\n").forEach(line => {
    const separator = line.indexOf(":");

    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    frontMatter[key] = value;
  });

  return frontMatter;
}

const files = fs
  .readdirSync(blogDir)
  .filter(file => file.endsWith(".md"));

const posts = files.map(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, "utf8");

  const frontMatter = parseFrontMatter(content);

  const slug = file.replace(/\.md$/, "");

  return {
    slug,
    title: frontMatter.title || slug,
    date: frontMatter.date || "",
    author: frontMatter.author || "Shekhawat Packers",
    category: frontMatter.category || "Blog",
    image: frontMatter.image || "",
    excerpt: frontMatter.excerpt || "",
    tags: frontMatter.tags || "",
    published: frontMatter.published !== "false"
  };
});

posts.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

fs.writeFileSync(
  outputFile,
  JSON.stringify({ posts }, null, 2)
);

console.log(`Generated ${outputFile}`);
console.log(`Found ${posts.length} blog post(s).`);