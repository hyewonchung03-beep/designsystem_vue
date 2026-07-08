import React from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {storybookStories} from '@site/src/components/storybookStoryManifest';

export function StorybookExampleList({
  storyTitles,
  storybookPathMode = 'docs',
}: {
  storyTitles: string[];
  storybookPathMode?: 'docs' | 'story';
}): React.ReactElement {
  const stories = storybookStories.filter((story) => storyTitles.includes(story.title));

  return (
    <>
      {stories.map((story) => (
        <ExampleCard key={story.id} title={story.name} storyId={story.id} storybookPathMode={storybookPathMode} />
      ))}
    </>
  );
}
