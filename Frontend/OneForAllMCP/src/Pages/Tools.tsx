import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolsNav from '@/components/ToolsNav';
import { Checkbox } from '@/components/ui/checkbox';
import { GlobeIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import { getTools } from '../services/toolsService';

interface Tool {
  name: string;
  description: string;
}

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await getTools();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);

  const toggleCardSelection = (name: string) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(name)
        ? prevSelectedCards.filter((cardId) => cardId !== name)
        : [...prevSelectedCards, name]
    );
  };

  return (
    <div>
      <ToolsNav />
      <div className="container mx-auto p-4">
        <div className="flex-col items-center justify-between mb-6 ">
          <h1 className="mt-3 mb-6 text-7xl font-bold text-center">Tools Library</h1>
          <div className="w-full flex justify-center">
            <div className="w-1/2">
              <Input placeholder="Search for APIs and services" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`relative rounded-md border-2 p-4 cursor-pointer ${
                selectedCards.includes(tool.name) ? 'border-primary' : 'border-muted'
              }`}
              onClick={() => toggleCardSelection(tool.name)}
            >
              <div className="absolute top-2 right-2">
                <Checkbox checked={selectedCards.includes(tool.name)} />
              </div>
              <Card className="w-full shadow-none border-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  <RocketIcon className="w-8 h-8" />
                  <div>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
