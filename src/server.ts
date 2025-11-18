import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import fs from "node:fs/promises"


const server = new McpServer({
    name : "My MCP Server",
    version : "1.0.0",
    capabilities : {
        resouces : {},
        tools : {},
        prompts : {}
    }
});

// adding a tool
server.tool("create-user", "Create a new user in the database", {
    name : z.string(),
    email : z.string(),
    address : z.string(), 
    phone : z.string()
}, {
 title : "Create User",
 readOnlyHint : false,
 destructiveHint : false,
 idempotentHint : false,
 openWorldHint : true
}, async (params) => {
    try{
       const id = await createUser(params);
       return {
            content : [
                {type : "text", text : `User ${id} created successfully`}
            ]
        }
    }catch{
        return {
            content : [
                {type : "text", text : "Failed to create user"}
            ]
        }
    }
    return {}
}
)

async function createUser(user: {
  name: string
  email: string
  address: string
  phone: string
}) {
  const users = await import("./data/users.json", {
    with: { type: "json" },
  }).then(m => m.default)

  const id = users.length + 1

  users.push({ id, ...user })

  await fs.writeFile("./src/data/users.json", JSON.stringify(users, null, 2))

  return id
}

const main = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();

