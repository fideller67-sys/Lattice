import React from 'react';
import DynamicChannel from '../../components/DynamicChannel';

export default function ReleaseTrain() {
  return <DynamicChannel channelName="ReleaseTrain" subtitle="v1.14.0 Pending Deploy" systemLogMode={true} />;
}
