import { parseGoogleDocHtml } from "./gdoc-parser";

const SAMPLE_HTML = `
<html><body>
<p><span>CAM 12-20 READING</span></p>
<p><span>[C12T1] - Cork</span></p>
<table>
  <tr><td>Word</td><td>IPA</td><td>Word Form</td><td>English Meaning</td><td>Nghĩa tiếng Việt</td></tr>
  <tr><td>cork</td><td>/kɔːk/</td><td>n</td><td>the thick outer bark of cork oak</td><td>vỏ cây sồi bần</td></tr>
  <tr><td>tough / She is a tough girl</td><td>/tʌf/</td><td>adj</td><td>strong and durable</td><td>bền, cứng</td></tr>
</table>
</body></html>
`;

const result = parseGoogleDocHtml(SAMPLE_HTML, "https://example.com/doc");

if (result.categories.length !== 1) throw new Error("Expected 1 category");
if (result.categories[0].words.length !== 2) throw new Error("Expected 2 words");
if (result.categories[0].words[1].example !== "She is a tough girl") {
  throw new Error("Expected example parsing");
}

console.log("gdoc-parser tests passed");
