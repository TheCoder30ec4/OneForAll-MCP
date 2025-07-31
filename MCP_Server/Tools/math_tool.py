
from mcp.server.fastmcp import tool

@tool()
async def add(a:int, b:int)-> int:
    """Add two numbers.
    Inputs: {a: Integer, b:Integer}
    Output: {Integer}"""
    
    return a+b 

@tool()
async def Multiply(a:int, b:int)-> int:
    """Multiply two numbers.
    Inputs: {a: Integer, b:Integer}
    Output: {Integer}"""
    
    return a*b
