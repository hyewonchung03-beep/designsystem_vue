import React from 'react';
import Layout from '@theme/Layout';
import ComponentsPreview from '@site/src/components/ComponentsPreview';

export default function ComponentsMockPage(): React.ReactElement {
  return (
    <Layout title="Components Preview">
      <ComponentsPreview />
    </Layout>
  );
}
