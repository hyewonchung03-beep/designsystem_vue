import React from 'react';
import {SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';

type GenericGuidelineContentProps = {
  category: string;
  title: string;
  description?: string;
};

export default function GenericGuidelineContent({category, title, description}: GenericGuidelineContentProps): React.ReactElement {
  return (
    <ComponentGuideLayout
        category={category}
        title={title}
        description={description ?? `${title} guideline page.`}
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Overview">
                <div className="button-guide-artwork">
                  <span>{title}</span>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <div className="button-guide-artwork">
                <span>{title}</span>
              </div>
          </>}
        />
      </ComponentGuideLayout>
  );
}
