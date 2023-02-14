import fs from "fs"
import prettier from "prettier"

const modelRegex = /model ([A-Za-z]+)/g
const schemaFile = new URL("../prisma/schema.prisma", import.meta.url)

let models = ""

// Read the schema file and extract the model names
fs.readFile(schemaFile, "utf8", (err, data) => {
  if (err) {
    throw err
  }

  let match
  while ((match = modelRegex.exec(data))) {
    models += `${match[1]}, `
  }

  if (!models) {
    throw new Error(`Could not find any models in ${schemaFile}.`)
  }

  // Write the import and type to a new file
  const typesDir = new URL("../src/types", import.meta.url)
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir)
  }

  const outputFile = new URL("../src/types/db.ts", import.meta.url)
  const output = `// DO NOT EDIT THIS FILE
import type { ${models.slice(0, -2)} } from "@prisma/client/edge"

export type Database = {
  ${models
    .slice(0, -2)
    .split(", ")
    .map((model) => `${model}: ${model}`)
    .join("\n  ")}
}`

  const formattedOutput = prettier.format(output, {
    parser: "typescript",
    semi: false,
  })

  fs.writeFile(outputFile, formattedOutput, (writeErr) => {
    if (writeErr) {
      throw writeErr
    }
    console.log(`Models from ${schemaFile} were added to ${outputFile}.`)
  })
})