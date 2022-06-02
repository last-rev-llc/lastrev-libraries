import React from 'react';
const ModuleIntegration = (props: any) => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
};
export default ModuleIntegration;
