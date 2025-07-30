import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolsNav from '@/components/ToolsNav';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Tools = () => {
  return (
    <div>
      <ToolsNav />
      <div className="container mx-auto p-4">
        <div className="flex-col items-center justify-between mb-6 ">
          <h1 className="mt-3 mb-6 text-7xl font-bold">Tools Library</h1>
          <div className="w-1/3">
            <Input placeholder="Search for APIs and services" />
          </div>
        </div>

        <RadioGroup defaultValue="comfortable" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="default" id="r1" className="peer sr-only" />
            <Label
              htmlFor="r1"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Maps SDK for Android</CardTitle>
                  <CardDescription>Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Maps for your native Android app.</p>
                </CardContent>
              </Card>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="comfortable"
              id="r2"
              className="peer sr-only"
            />
            <Label
              htmlFor="r2"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Maps SDK for iOS</CardTitle>
                  <CardDescription>Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Maps for your native iOS app.</p>
                </CardContent>
              </Card>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="compact" id="r3" className="peer sr-only" />
            <Label
              htmlFor="r3"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Maps JavaScript API</CardTitle>
                  <CardDescription>Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Maps for your website</p>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Tools;
