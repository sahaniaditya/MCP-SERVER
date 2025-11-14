import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';



const server = new McpServer({
    name : "My MCP Server",
    version : "1.0.0",
    // capabilities : {
    //     resouces : {},
    //     tools : {},
    //     prompts : {}
    // }
});


const main = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();

