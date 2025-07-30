import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolsNav from '@/components/ToolsNav';
import { Checkbox } from '@/components/ui/checkbox';
import { GlobeIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons';

const toolsData = [
  {
    id: '1',
    title: 'Maps SDK for Android',
    description: 'Google',
    content: 'Maps for your native Android app.',
    icon: <PersonIcon className="w-8 h-8" />,
  },
  {
    id: '2',
    title: 'Maps SDK for iOS',
    description: 'Google',
    content: 'Maps for your native iOS app.',
    icon: <PersonIcon className="w-8 h-8" />,
  },
  {
    id: '3',
    title: 'Maps JavaScript API',
    description: 'Google',
    content: 'Maps for your website',
    icon: <GlobeIcon className="w-8 h-8" />,
  },
];

const Tools = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const toggleCardSelection = (id: string) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(id)
        ? prevSelectedCards.filter((cardId) => cardId !== id)
        : [...prevSelectedCards, id]
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
          {toolsData.map((tool) => (
            <div
              key={tool.id}
              className={`relative rounded-md border-2 p-4 cursor-pointer ${
                selectedCards.includes(tool.id) ? 'border-primary' : 'border-muted'
              }`}
              onClick={() => toggleCardSelection(tool.id)}
            >
              <div className="absolute top-2 right-2">
                <Checkbox checked={selectedCards.includes(tool.id)} />
              </div>
              <Card className="w-full shadow-none border-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  {tool.icon}
                  <div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{tool.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
