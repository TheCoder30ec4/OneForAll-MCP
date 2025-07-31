# Id for projects- select tools for that particular project
# So basically a user will use different tools for different project he doesnt want the some tools in other projects right so for that 
# it will projects

# user flow will be like sigin/login create project name the project, tools, api-keys and if needed a custom tool.... the particular project
# can be given access to the team members


# give option where they want to use mcp servers for cursor or small projects and other stuff where they can directly choose tools

# versioning system for the tools. Can be changeable to different version and clear mention of the what is the difference between old and new versions.

# people can create there own tools and sell it per use as community....

from mcp.server.fastmcp import FastMCP
import os
import importlib.util

mcp = FastMCP("Math")

def load_tools_from_directory(directory):
    """
    Loads all Python modules (excluding __init__.py) from the specified directory.

    Args:
        directory (str): The name or path of the directory containing tool modules.

    Behavior:
        Iterates through all .py files in the directory, dynamically imports each as a module,
        and executes its code in the current process.
    """
    for filename in os.listdir(directory):
        if filename.endswith(".py") and filename != "__init__.py":
            module_name = f"{directory}.{filename[:-3]}"
            module_path = os.path.join(directory, filename)
            
            spec = importlib.util.spec_from_file_location(module_name, module_path)
            if spec and spec.loader:
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

if __name__ == "__main__":
    tools_directory = "Tools"
    load_tools_from_directory(tools_directory)
    mcp.run(transport="streamable-http")
