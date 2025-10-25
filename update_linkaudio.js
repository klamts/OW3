import ts from "typescript";
import fs from "fs";
import path from "path";

const filePath = "./data/Unit4_Our_Senses.ts";
const source = fs.readFileSync(filePath, "utf8");

// 1️⃣ Parse file thành AST
const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

// 2️⃣ Tìm biến export const
let varName = "";
let objNode = null;
ts.forEachChild(sourceFile, (node) => {
  if (
    ts.isVariableStatement(node) &&
    node.declarationList.declarations.length > 0
  ) {
    const decl = node.declarationList.declarations[0];
    if (decl.name && decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
      varName = decl.name.getText(sourceFile);
      objNode = decl.initializer;
    }
  }
});

if (!objNode) {
  console.error("❌ Không tìm thấy object export const trong file!");
  process.exit(1);
}

// 3️⃣ Chuyển AST object sang JS object
function astToObj(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        obj[prop.name.getText()] = astToObj(prop.initializer);
      }
    }
    return obj;
  } else if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(astToObj);
  } else if (ts.isStringLiteral(node)) {
    return node.text;
  } else if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
  return null;
}

let data = astToObj(objNode);

// 4️⃣ Hàm cập nhật audio link
function updateAudioLinks(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      updateAudioLinks(obj[key]);
    } else if (key === "audio" && typeof obj[key] === "string") {
      obj[key] = `https://raw.githubusercontent.com/klamts/audio/main/${path.basename(obj[key])}`;
    }
  }
}
updateAudioLinks(data);

// 5️⃣ Ghi lại file TS mới
const outputFile = "./data/Unit4_Our_Senses_updated.ts";
fs.writeFileSync(
  outputFile,
  `export const ${varName} = ${JSON.stringify(data, null, 2)};\n`
);

console.log(`✅ Đã cập nhật thành công! File mới: ${outputFile}`);
